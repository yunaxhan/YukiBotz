let fetch = require("node-fetch");
let uploader = require("../lib/uploader");

let handler = async(m, { conn, command, args }) => {
  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || q.mediaType || "";
  if (!mime) return conn.reply(m.chat, `Send/Reply Images with the caption *.hd2*`, m)
  if (!/image\/(jpe?g|png)/.test(mime)) return conn.reply(m.chat, `Mime ${mime} tidak support`, m)
  m.reply("Please Wait...")
  try {
  let media = await q.download();
  let url = await uploader.uploadPomf2(media)
  let res = await fetch(`https://itzpire.com/tools/enhance?url=${url.files[0].url}&type=modelx4`)
  let json = await res.json();
  await conn.sendMessage(m.chat, { image: { url: json.result.img }, caption: 'Done!' }, { quoted: m })
  } catch (err) {
  console.log(err)
  m.reply("Error!")
}
}

handler.command = ["hd2", "remini2", "hdr2"]
handler.help = ["hd2"]
handler.tags = ["tools"]

module.exports = handler