const captcha = require('@neoxr/captcha');
const crypto = require("crypto");
const PhoneNumber = require('awesome-phonenumber')
const fetch = require("node-fetch");
let v1 = { key: { participant: '0@s.whatsapp.net', remoteJid: "0@s.whatsapp.net" }, message: { conversation: "REGISTER (1/3)"} }
let v2 = { key: { participant: '0@s.whatsapp.net', remoteJid: "0@s.whatsapp.net" }, message: { conversation: "REGISTER (2/3)"} }
let v3 = { key: { participant: '0@s.whatsapp.net', remoteJid: "0@s.whatsapp.net" }, message: { conversation: "REGISTER (3/3)"} }


const handler = async (m, { conn, text, usedPrefix, command }) => {
    conn.registrasi = conn.registrasi ? conn.registrasi : {};
    if (conn.registrasi[m.chat]?.[m.sender]) return m.reply('You are requesting verification!');    
    let user = global.db.data.users[m.sender];
    let kontol = await conn.getName(m.sender)
    if (user.registered === true) return conn.reply(m.chat, '```✅ Nomor Kamu Udah Terverifikasi```', m)    
    let sn = crypto.createHash("md5").update(m.sender).digest("hex");
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : m.fromMe ? conn.user.jid : m.sender;    
    let newCaptcha = captcha()
    let image = Buffer.from(newCaptcha.image.split(',')[1], 'base64')
    let confirm = "Reply pesan ini dengan mengetik kode CAPTCHA yang ada pada gambar!";
    let { key } = await conn.sendFile(m.chat, image, '', confirm.trim(), v1);
    conn.sendButton(m.chat, 'Salin Kode Di Bawah Ini!', 'REGISTER (1/3)', [{ type: 'copy', text: 'Copy Code OTP', id: `${newCaptcha.value}`, copy_code: `${newCaptcha.value}` }], v1)

    conn.registrasi[m.chat] = {
        ...conn.registrasi[m.chat],
        [m.sender]: {
            step: 1,
            message: m,
            sender: m.sender,
            otp: newCaptcha.value,
            user,
            key,
            timeout: setTimeout(() => {
                conn.sendMessage(m.chat, { delete: key });
                delete conn.registrasi[m.chat][m.sender];
            }, 60 * 1000)
        }
    };
}

handler.before = async (m, { conn }) => {
    conn.registrasi = conn.registrasi ? conn.registrasi : {};
    if (m.isBaileys) return;
    if (!conn.registrasi[m.chat]?.[m.sender]) return;
    if (!m.text) return;

    let { timeout, otp, step, message, key } = conn.registrasi[m.chat]?.[m.sender];

    console.log(`Step: ${step}, Message: ${m.text}`);

    if (step === 1) {
        if (m.text !== otp) {
            clearTimeout(timeout);
            await conn.sendMessage(m.chat, { delete: key });
            delete conn.registrasi[m.chat]?.[m.sender];
            return await m.reply(`🚩 Your verification code is wrong.`);
        }
        clearTimeout(timeout);
        let messageName = await conn.sendMessage(m.chat, { text: "Masukan Nama Anda:" }, { quoted: v2 });
        let nameTimeout = setTimeout(async () => {
            await conn.sendMessage(m.chat, { delete: messageName.key });
            delete conn.registrasi[m.chat]?.[m.sender];
        }, 180000);
        conn.registrasi[m.chat][m.sender] = { step: 2, timeout: nameTimeout, messageName };
    } else if (step === 2) {
        clearTimeout(conn.registrasi[m.chat][m.sender].timeout);
        let name = m.text.trim();
        let user = global.db.data.users[m.sender];
        user.name = name;
        let messageAge = await conn.sendMessage(m.chat, { text: "Masukan Umur Anda:" }, { quoted: v3 });
        let ageTimeout = setTimeout(async () => {
            await conn.sendMessage(m.chat, { delete: messageAge.key });
            delete conn.registrasi[m.chat]?.[m.sender];
        }, 180000);
        conn.registrasi[m.chat][m.sender] = { step: 3, timeout: ageTimeout, messageAge };
    } else if (step === 3) {
        clearTimeout(conn.registrasi[m.chat][m.sender].timeout);
        let age = parseInt(m.text);
        if (isNaN(age)) {
            return await conn.sendMessage(m.chat, { text: "🚩 Umur tidak valid. Harap masukkan umur yang valid.", quoted: m });
        }
        let user = global.db.data.users[m.sender];
        user.age = age;
        user.regTime = +new Date();
        user.registered = true;
        user.money += 1000000;
        user.limit += 10000;
        // Send registration success message
        let kontol = '0@s.whatsapp.net';
        let today = new Date();
        let tanggal = today.toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' });
        let ppUrl = await conn.profilePictureUrl(m.sender, 'image').catch((_) => "https://telegra.ph/file/1dff1788814dd281170f8.jpg");
        
        let tteks = '```Success Verified```\n\n';
        tteks += '```Name:``` ' + `${user.name}\n`;
        tteks += '```Age:``` ' + `${user.age}\n`;
        tteks += '```Number:``` ' + `${PhoneNumber('+' + m.sender.split('@')[0]).getNumber('international')}\n`;
        tteks += '```Date:``` ' + `${tanggal}\n\n`;
        tteks += '```RPG StarterPack```\n\n';
        tteks += '```Limit:``` ' + `${user.limit}\n`;
        tteks += '```Uang:``` ' + `${Func.h2k(user.money)} ( Rp ${toRupiah(user.money)} )\n`;
        tteks += '```Cek status Anda dengan mengetikan perintah *.me*```\n';
        tteks += `Supported By @${kontol.replace(/@.+/g, '')}`;
        await conn.sendMessage(m.chat, {
            text: tteks,
            contextInfo: {
                mentionedJid: [kontol],
                externalAdReply: {
                    showAdAttribution: true,
                    title: 'Yuki-chan',
                    body: 'Version: 3.0.4 (Beta)',
                    thumbnailUrl: ppUrl,
                    mediaType: 1,
                    renderLargerThumbnail: true
                }
            }
        }, { quoted: m });
        delete conn.registrasi[m.chat]?.[m.sender];
    }
};

handler.help = ["register","daftar"]
handler.tags = ["start"];
handler.command = /^(register|daftar)$/i;

module.exports = handler;

function toRupiah(angka) {
    var saldo = '';
    var angkarev = angka.toString().split('').reverse().join('');
    for (var i = 0; i < angkarev.length; i++)
        if (i % 3 == 0) saldo += angkarev.substr(i, 3) + '.';
    return '' + saldo.split('', saldo.length - 1).reverse().join('');
}

function formatRupiah(number) {
    const formatter = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    });

    return formatter.format(number);
}