const { MessageType } = require('@whiskeysockets/baileys')
const { createHash } = require('crypto')
let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i
let handler = async function (m, { conn, text, usedPrefix }) {
   let __waktutionskh = (new Date - global.db.data.users[m.sender].snlast)
   let _waktutionskh = (+ 1000 - __waktutionskh)
   let waktutionskh = clockString(_waktutionskh)
   if (new Date - global.db.data.users[m.sender].snlast > + 1000) {
   	global.db.data.users[m.sender].snlast = new Date * 1
       global.db.data.users[m.sender].limit -= 5
  let sn = createHash('md5').update(m.sender).digest('hex')
const { generateWAMessageFromContent, proto, prepareWAMessageMedia } = require("@whiskeysockets/baileys") 
let msg = generateWAMessageFromContent(m.sender, {
  viewOnceMessage: {
    message: {
        "messageContextInfo": {
          "deviceListMetadata": {},
          "deviceListMetadataVersion": 2
        },
        interactiveMessage: proto.Message.InteractiveMessage.create({
          body: proto.Message.InteractiveMessage.Body.create({
            text: "Hai Kak! Ini Kode Serial Number Kamu, Jangan Di Berikan Oleh Siapapun Ya! Demi Keamanan Data Kamu Di Dalam Database Bot :>"
          }),
          footer: proto.Message.InteractiveMessage.Footer.create({
            text: 'Your data is safe ✓'
          }),
          header: proto.Message.InteractiveMessage.Header.create({
            hasMediaAttachment: false
          }),
          nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
            buttons: [
              {
              "name": "cta_copy",
              "buttonParamsJson": `{"display_text":"Salin Disini","id":"123456789","copy_code":"${sn}"}`
              }
           ],
          })
        })
    }
  }
}, {})

await conn.relayMessage(msg.key.remoteJid, msg.message, {
  messageId: msg.key.id
})
    } else conn.reply(m.chat, `Kamu sudah unreg..\nMohon tunggu ${waktutionskh} untuk bisa kembali unreg`, m)
}

handler.help = ['ceksn']
handler.tags = ['main']
handler.command = /^(ceksn|cekid)$/i
handler.register = true
handler.limit = true
module.exports = handler

function clockString(ms) {
  let h = Math.floor(ms / 3600000)
  let m = Math.floor(ms / 60000) % 60
  let s = Math.floor(ms / 1000) % 60
  console.log({ms,h,m,s})
  return [h, m, s].map(v => v.toString().padStart(2, 0) ).join(':')
}