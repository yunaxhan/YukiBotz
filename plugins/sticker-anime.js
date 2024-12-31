let fetch = require('node-fetch');

let handler = async (m, { conn, text, usedPrefix, command }) => {
  conn.sendMessage(m.chat, {
    react: {
      text: '🕒',
      key: m.key,
    }
  });
  let response = await fetch('https://itzpire.com/random/sticker-anime');
  let buffer = await response.buffer();
  await conn.sendFile(m.chat, buffer, 'anime.webp', '', m);
};

handler.help = ['stickanime', 'animestick'];
handler.tags = ['sticker', 'anime'];
handler.command = /^(stickanime|animestick)$/i;
handler.premium = true;

module.exports = handler;