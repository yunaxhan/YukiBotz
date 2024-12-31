let fetch = require("node-fetch");

let handler = async (m, { conn, text, args, usedPrefix, command }) => {
  if (!text) {
    conn.sendPresenceUpdate("composing", m.chat);
    return conn.reply(m.chat, `• *Example :* ${usedPrefix}tiktok https://vm.tiktok.com/xxxxx`, m);
  }

  if (!text.match(/tiktok/gi)) {
    return conn.reply(m.chat, 'Make sure the link is from TikTok', m);
  }

  conn.sendMessage(m.chat, {
    react: {
      text: '🕒',
      key: m.key,
    }
  });

  try {
    let response = await fetch(`https://api.tiklydown.eu.org/api/download?url=${text}`);
    let data = await response.json();
    if (command === 'watermark') {
      if (data.video && data.video.watermark) {
        return await conn.sendMessage(m.chat, { 
          video: { url: data.video.watermark }, 
          caption: `${data.title ?? "No Title Available"}\n\n*With Watermark*`, 
          footer: data.created_at
        }, { quoted: m });
      } else {
        return m.reply('Sorry, watermarked version not available.');
      }
    }
    if (data.images && data.images.length > 0) {
      for (let img of data.images) {
        await conn.sendMessage(m.chat, { image: { url: img.url }, caption: '' }, { quoted: m });
      }
    } else if (data.video && data.video.noWatermark) {
      const buttons = [
        { buttonId: `.watermark ${text}`, buttonText: { displayText: 'To Watermark' }, type: 1 }
      ];
      
      await conn.sendMessage(m.chat, { 
        video: { url: data.video.noWatermark }, 
        caption: `${data.title ?? "No Title Available"}`, 
        footer: data.created_at,
        buttons: buttons,
        viewOnce: true,
        headerType: 6 
      }, { quoted: m });
    }
    
    if (data.music && data.music.play_url) {
      await conn.sendMessage(m.chat, { 
        audio: { url: data.music.play_url }, 
        mimetype: 'audio/mpeg' 
      }, { quoted: m });
    } else {
      m.reply('Sorry, no audio available.');
    }
    
  } catch (e) {
    console.error(e);
    m.reply('Sorry, an error occurred.');
  }
};

handler.help = ['tiktok', 'watermark'].map(v => v + ' *<url>*');
handler.tags = ['downloader'];
handler.command = /^(tiktok|tt|tiktokdl|tiktoknowm|watermark)$/i;
handler.limit = true;
handler.group = false;
handler.register = true;

module.exports = handler;