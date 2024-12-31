let { MessageType } = require('@whiskeysockets/baileys')
let PhoneNumber = require('awesome-phonenumber')
let handler = async (m, { conn, usedPrefix, text, args, command }) => {
     let gambar_yuki = [
      "https://telegra.ph/file/c4261b550fa341a0bd138.jpg",
      "https://telegra.ph/file/19d8dd9fafa58b7c9bd68.jpg",
      "https://telegra.ph/file/d29e1b6f06d13a1ac8ce3.jpg",
      "https://telegra.ph/file/0eae512de17b5267d3fef.jpg",
      "https://telegra.ph/file/b3d718b4de88c3f656fb2.jpg",
      "https://telegra.ph/file/692972cbcc3397568c0a0.jpg",
      "https://telegra.ph/file/866a072e730557dbf1dfd.jpg",
      "https://telegra.ph/file/e491cf824778b161b7f2a.jpg",
      "https://telegra.ph/file/1ef7020304786645ad34d.jpg"
    ];    
     let vcard = `BEGIN:VCARD\nVERSION:3.0\nN:WhatsApp; Ownerkuh!!\nORG:DitzOfc\nTITLE:soft\nitem1.TEL;waid=${nomorown}:${nomorown}\nitem1.X-ABLabel:Ponsel\nitem2.URL:http://github.com/DitzDev\nitem2.X-ABLabel:💬 More\nitem3.EMAIL;type=INTERNET:AditGantengJir@gmail.com\nitem3.X-ABLabel:Email\nitem4.ADR:;;PERSIMPANGAN JONGGOL;;;;\nitem4.X-ABADR:💬 More\nitem4.X-ABLabel:Lokasi\nEND:VCARD`;
      const sentMsg = await conn.sendMessage(
    m.chat,
    {
      contacts: {
        displayName: wm,
        contacts: [{ vcard }],
      },
      contextInfo: {
        externalAdReply: {
          title: "DitzOfc",
          body: "Version: 3.0.4-beta",
          thumbnailUrl: pickRandom(gambar_yuki),
          mediaType: 1,
          showAdAttribution: false,
          renderLargerThumbnail: true,
        },
      },
    },
    { quoted: m },
  );
  conn.reply(m.chat, 'Hai kak, Ini owner ku, Kalo ada perlu bilang aja sama dia😊', sentMsg)
}
handler.help = ['owner']
handler.tags = ['info']

handler.command = /^(owner)$/i

module.exports = handler

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
