let axios = require('axios');
let sharp = require('sharp');
let fs = require('fs').promises;

let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) throw `✳️ Gunakan perintah:\n *${usedPrefix + command}* https://lahelu.com/post/PaC1BFoVh`;

    try {
        // Kirim reaksi menunggu
        conn.sendMessage(m.chat, {
            react: {
                text: '🕒',
                key: m.key,
            }
        });

        let res = await laheluDownload(args[0]);
        if (!res.status) throw `⚠️ ${res.msg}`;

        const { media, post_id, hashtags, isSensitive, title, description, username } = res.result;

        // Periksa apakah media berisi beberapa file
        let mediaList = Array.isArray(media) ? media : [media];

        for (let item of mediaList) {
            let isWebp = item.endsWith('.webp');
            let isMp4 = item.endsWith('.mp4');
            let filePath = item;

            // Konversi webp ke png jika perlu
            if (isWebp) {
                const webpBuffer = (await axios.get(item, { responseType: 'arraybuffer' })).data;
                const pngPath = `./temp_${post_id}_${Math.random().toString(36).substring(7)}.png`;

                await sharp(webpBuffer)
                    .toFormat('png')
                    .toFile(pngPath);

                filePath = pngPath;
            }

            // Kirim file
            if (isWebp || isMp4) {
                await conn.sendFile(
                    m.chat,
                    filePath,
                    isWebp ? 'converted.png' : 'media.mp4',
                    `📌 *Judul*: ${title || 'Tanpa Judul'}\n🆔 *Post ID*: ${post_id}\n📋 *Deskripsi*: ${description || 'Tidak ada deskripsi'}\n🔗 *Hashtags*: ${hashtags.length ? hashtags.join(', ') : 'Tidak ada hashtags'}\n⚠️ *Sensitif*: ${isSensitive ? 'Yes' : 'No'}\n👤 *Username*: ${username || 'Tidak Diketahui'}`,
                    m
                );
            }

            // Hapus file sementara jika ada
            if (isWebp) await fs.unlink(filePath);
        }

        // Kirim reaksi selesai
        conn.sendMessage(m.chat, {
            react: {
                text: '✅',
                key: m.key,
            }
        });
    } catch (err) {
        // Kirim reaksi error
        conn.sendMessage(m.chat, {
            react: {
                text: '❌',
                key: m.key,
            }
        });
        throw err.message || 'Terjadi kesalahan.';
    }
};

handler.help = ['lahelu <link lahelu>'];
handler.tags = ['downloader'];
handler.command = ['lahelu'];
handler.limit = true;
handler.register = true;

module.exports = handler;

async function laheluDownload(url) {
    try {
        const response = await axios.get('https://api.ryochinel.my.id/api/lahelu', {
            params: { url }
        });

        if (!response.data.status) throw new Error(response.data.message || 'API Error');
        return {
            status: true,
            result: {
                media: Array.isArray(response.data.result.media) ? response.data.result.media : [response.data.result.media],
                post_id: response.data.result.post_id,
                hashtags: response.data.result.hashtags || [],
                isSensitive: response.data.result.sensitive || false,
                title: response.data.result.title || 'Tanpa Judul',
                description: response.data.result.description || 'Tidak ada deskripsi',
                username: response.data.result.post_info?.userInfo?.username || 'Tidak Diketahui'
            }
        };
    } catch (error) {
        return {
            status: false,
            msg: error.response?.data?.message || error.message || 'Tidak dapat mengunduh media dari Lahelu API.'
        };
    }
}
