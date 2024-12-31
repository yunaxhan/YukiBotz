let axios = require("axios");

let handler = async (m, { command, text, args }) => {
  if (!text) return m.reply('Halo Ada yang bisa ku bantu? Untuk melanjutkan, ketik .ai dengan sertakan pertanyaan mu😊');
  
  conn.sendMessage(m.chat, {
    react: {
      text: '🕒',
      key: m.key,
    }
  });

  try {
    const date = new Date(
      new Date().toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
      })
    );
    const hours = date.getHours();
    const fdoc = {
    key: {
        participant: '0@s.whatsapp.net',
        ...(m.chat ? {
            remoteJid: `status@broadcast`
        } : {})
    },
    message: {
        documentMessage: {
            title: `Yuki-chan >•<`,
            thumbnailUrl: "https://telegra.ph/file/b3d718b4de88c3f656fb2.jpg",
        }
    }
}
    const minutes = date.getMinutes();
    const timeNow = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
    const name = await conn.getName(m.sender);
    const gambar_yuki = [
      "https://telegra.ph/file/c4261b550fa341a0bd138.jpg",
      "https://telegra.ph/file/19d8dd9fafa58b7c9bd68.jpg",
      "https://telegra.ph/file/d29e1b6f06d13a1ac8ce3.jpg",
      "https://telegra.ph/file/0eae512de17b5267d3fef.jpg",
      "https://telegra.ph/file/b3d718b4de88c3f656fb2.jpg",
      "https://telegra.ph/file/692972cbcc3397568c0a0.jpg",
      "https://telegra.ph/file/866a072e730557dbf1dfd.jpg",
      "https://telegra.ph/file/e491cf824778b161b7f2a.jpg"
    ];    
    let content = `Nama mu adalah Yukki, Kamu berbicara dalam bahasa indonesia yang gaul, Kamu berbicara dengan bahasa gue dan lo dan juga emoticon, jika ada yang bertanya tentang waktu kamu jawab yang berkaitan dengan ${timeNow} dan ${getTodayDate()}`;    
    let res = await axios.post('https://api.itsrose.rest/chatGPT/turbo', {
      model: "gpt-4o",
      max_tokens: 200,
      messages: [
        {
          role: "assistant",
          content: content
        },
        {
          role: "user",
          content: text
        }
      ],
      filter_messages: true
    }, {
      headers: {
        'accept': 'application/json',
        'Authorization': 'Rk-748ede917c29884c9134e9eb378174b3',
        'Content-Type': 'application/json'
      }
    });

    let data = res.data;
    
    await conn.sendMessage(m.chat, {
      text: data.result.messages.content,
      contextInfo: {
        externalAdReply: {
          mediaUrl: '', 
          mediaType: 1, 
          description: '',
          title: '〤 A I - Y U K I ',
          body: `Jam ${timeNow}`,
          thumbnailUrl: pickRandom(gambar_yuki), 
        }
      }
    }, { quoted: fdoc });

  } catch (e) {
    console.log(e);
    m.reply(`An unexpected error occurred, report it immediately to the creator if this problem persists.\n\n${e}`);
  }
};

handler.tags = ["ai"];
handler.help = ["ai", "whatgpt"];
handler.command = /^(ai|whatgpt)$/i;

module.exports = handler;

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getTodayDate() {
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1; // Perhatikan bahwa bulan dimulai dari 0, maka ditambahkan 1.
  const year = today.getFullYear();
  const dayOfWeek = today.toLocaleDateString("id-ID", { weekday: "long" }); // Mengambil nama hari dalam bahasa Indonesia.

  return `Hari ini adalah ${dayOfWeek}, ${day}/${month}/${year}.`;
}