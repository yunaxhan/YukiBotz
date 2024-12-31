// Hoshiyuki-Api

const fs = require("fs");
const fetch = require("node-fetch");

let handler = async (m, { args, conn }) => {
  let text = args.join(" ") || "Halo"; // Kalo gada input maka otomatis input nya Hallo
  let url = `https://api.ryochinel.my.id/api/brat?text=${encodeURIComponent(text)}`;

  try {
    let response = await fetch(url);
    if (!response.ok) throw new Error("Gagal mengambil data dari API");

    let buffer = await response.buffer(); // Get buffer
    let tempFile = `${new Date() * 1}.png`;
    fs.writeFileSync(tempFile, buffer);

    await conn.sendImageAsSticker(m.chat, tempFile, m, {
      packname: global.packname,
      author: global.author,
    });
    await fs.unlinkSync(tempFile);
  } catch (e) {
    console.error(e);
    m.reply("*[ ! ] Gagal membuat stiker dari API.*");
  }
};

handler.help = ["brat <text>"];
handler.tags = ["sticker"];
handler.command = ["brat"];
handler.register = true;

module.exports = handler;
