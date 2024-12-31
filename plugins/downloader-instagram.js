
let axios = require('axios');

let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) throw `✳️ Gunakan perintah:\n *${usedPrefix + command}* https://www.instagram.com/reel/DBOv5iPyCZC/`;

    try {
        conn.sendMessage(m.chat, {
            react: {
                text: '🕒',
                key: m.key,
            }
        });

        let res = await instagramDownload(args[0]);
        if (!res.status) throw `⚠️ ${res.msg}`;

        await conn.sendFile(m.chat, res.result, 'instagram.mp4', `Done Kak ✓`, m);

        conn.sendMessage(m.chat, {
            react: {
                text: '✅',
                key: m.key,
            }
        });
    } catch (err) {
        conn.sendMessage(m.chat, {
            react: {
                text: '❌',
                key: m.key,
            }
        });
        throw err.message || 'Terjadi kesalahan.';
    }
};

handler.help = ['igdl <link instagram>'];
handler.tags = ['downloader'];
handler.command = ['igdl', 'ig', 'instagram'];
handler.limit = true;
handler.register = true;

module.exports = handler;

async function instagramDownload(url) {
    try {
        const response = await axios.get('https://api.ryochinel.my.id/api/igdl', {
            params: { url }
        });

        if (!response.data.status) throw new Error(response.data.message || 'API Error');
        return {
            status: true,
            result: response.data.result
        };
    } catch (error) {
        return {
            status: false,
            msg: error.response?.data?.message || error.message || 'Tidak dapat mengunduh video Instagram.'
        };
    }
}
