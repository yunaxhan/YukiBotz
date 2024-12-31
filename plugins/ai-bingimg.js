const fetch = require('node-fetch');

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `• *Example :* ${usedPrefix}${command} anime`;
  conn.sendMessage(m.chat, { text: 'wait a moment, this process may take 1-5 minutes' }, { quoted: m });

  console.log('Prompt text:', text);

  const url = `https://api.itsrose.rest/image/bing_create_image`;
  try {
    let response = await fetch(url, {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'Authorization': 'Rk-748ede917c29884c9134e9eb378174b3',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        prompt: text
      })
    });

    if (!response.ok) {
      let errorText = await response.text();
      return conn.reply(m.chat, `Error: ${response.status} ${errorText}`, m);
    }

    let data = await response.json();
    console.log('API Response:', data);

    if (data.status && data.result && data.result.images && data.result.images.length > 0) {
      for (let imageUrl of data.result.images) {
        await conn.sendFile(m.chat, imageUrl, 'image.jpg', `Here is the image for: ${text}`, m);
      }
    } else {
      throw new Error('No images found');
    }
  } catch (error) {
    console.error(error);
    await conn.reply(m.chat, 'Sorry, there was an error processing your request.', m);
  }
};

handler.tags = ['ai'];
handler.help = ['bingimg *<text>*'];
handler.command = /^bingimg$/i;
handler.limit = true;

module.exports = handler;