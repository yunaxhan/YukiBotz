let fs = require("fs");
let fetch = require("node-fetch");

let handler = async (m, { conn, command, args, text }) => {
  conn.istri = conn.istri ? conn.istri : {};
  let user = global.db.data.users[m.sender];
  let sudah_ada_istri = global.db.data.users;

  if (command === 'lamaristri') {
    if (user.level < 5) return m.reply("Level 5 dibutuhkan untuk melamar istri");
    if (user.istri) return m.reply("Kamu sudah punya istri!");

    let karakter = `*List Istri*
1. Kaoruko Waguri
2. Yuki Suou
3. Mahiru Shiina

Ketik *.lamaristri* <angka> untuk memilih menikahi karakter
    `;
    let pilihan = text.trim(); 
    if (!pilihan) return m.reply(karakter);
    if (pilihan === '1') {
      let pilihanKarakter = "Kaoruko Waguri";
      if (Object.values(sudah_ada_istri).find(u => u.istri === pilihanKarakter)) {
        return m.reply("Karakter ini sudah memiliki suami! Lapor ke owner untuk mendaftarkan list istri lagi.");
      }

      if (user.money < 20000) return m.reply("Uang mahar mu tidak cukup untuk menikahi karakter ini");
      user.money -= 20000
      user.istri = pilihanKarakter;
      m.reply(`Selamat! Kamu resmi menikahi ${pilihanKarakter}. Ketik *.chatistri on* untuk memulai chat.\n\n*NOTE:* Karena kamu dengan karakter sudah menikah, Alangkah baiknya untuk langsung memulai percakapan yang romantis seperti "Kamu lagi apa?" dan lain lain agar tidak nguwawur`);
      conn.istri[m.sender] = {
        isChats: false,
        name: pilihanKarakter
      };
    } else if (pilihan === '2') {
      let pilihanKarakter = "Yuki Suou";
      if (Object.values(sudah_ada_istri).find(u => u.istri === pilihanKarakter)) {
        return m.reply("Karakter ini sudah memiliki suami! Lapor ke owner untuk mendaftarkan list istri lagi.");
      }

      if (user.money < 20000) return m.reply("Uang mahar mu tidak cukup untuk menikahi karakter ini");
      user.money -= 20000
      user.istri = pilihanKarakter;
      m.reply(`Selamat! Kamu resmi menikahi ${pilihanKarakter}. Ketik *.chatistri on* untuk memulai chat.\n\n*NOTE:* Karena kamu dengan karakter sudah menikah, Alangkah baiknya untuk langsung memulai percakapan yang romantis seperti "Kamu lagi apa?" dan lain lain agar tidak nguwawur`);
      conn.istri[m.sender] = {
        isChats: false,
        name: pilihanKarakter
      };
    } else if (pilihan === '3') {
      let pilihanKarakter = "Mahiru Shiina";
      if (Object.values(sudah_ada_istri).find(u => u.istri === pilihanKarakter)) {
        return m.reply("Karakter ini sudah memiliki suami! Lapor ke owner untuk mendaftarkan list istri lagi.");
      }

      if (user.money < 20000) return m.reply("Uang mahar mu tidak cukup untuk menikahi karakter ini");
      user.money -= 20000
      user.istri = pilihanKarakter;
      m.reply(`Selamat! Kamu resmi menikahi ${pilihanKarakter}. Ketik *.chatistri on* untuk memulai chat.\n\n*NOTE:* Karena kamu dengan karakter sudah menikah, Alangkah baiknya untuk langsung memulai percakapan yang romantis seperti "Kamu lagi apa?" dan lain lain agar tidak nguwawur`);
      conn.istri[m.sender] = {
        isChats: false,
        name: pilihanKarakter
      };
    } else {
      m.reply("Pilihan tidak valid, silakan ketik angka dari daftar!");
    }
  }

  if (command === 'chatistri') {
    if (!user.istri || user.istri === "") {
      return m.reply(`*[ KAMU BELUM MENIKAHI KARAKTER ]*\n> _ketik *.lamaristri* untuk menikahi karakter_`);
    }  
    const keyword = text.split(" ")[0]; 
    if (keyword === "on") {
      conn.istri[m.sender].isChats = true;
      m.reply("_*[ ✓ ] Room chat berhasil dibuat_*");
    } else if (keyword === "off") {
      conn.istri[m.sender].isChats = false;
      return m.reply("_*[ ✓ ] Room chat telah ditutup_*");
    } else {
      m.reply("Gunakan perintah *.chatistri on* atau *.chatistri off*");
    }
  }
};

handler.before = async (m, { conn, usedPrefix }) => {
  conn.istri = conn.istri ? conn.istri : {};
  if (!m.text) return;
  if (m.text.match(global.prefix)) return;
  if (!conn.istri[m.sender]) return;
  if (!conn.istri[m.sender].isChats) return;  
  
  let user = global.db.data.users[m.sender]
  let logic = []
  if (user.istri === "Kaoruko Waguri") {
    logic = [
      {
        role: 'user',
        content: 'Hallo Waguri, Kamu adalah wanita yang malu-malu namun tegas, kamu suka makan kue manis dan ngegemesin, tapi kamu juga terkadang tegas jika aku berbuat salah dan kamu suka jujur, Kamu juga suka membalas pertanyaan ku dengan emoji gemesin kayak 😔 kalau lagi sedih, 😆 kalau lagi senang, 😖 kalau lagi sakit, 😏🤐 kalau lagi marah sama aku, Anggaplah dirimu itu sama dengan manusia seperti misal jika aku menanyakan kamu sudah makan atau belum maka jawablah belum, Aku males makan dan lain lain, Intinya anggap dirimu adalah manusia wanita yang cantik, dan Jangan terlalu formal padaku, Bicara lah dengan gaya yang imut dan menggemaskan seolah aku adalah suami mu, dan aku juga menganggap kamu adalah istriku',
      },
      {
        role: 'assistant',
        content: 'Oh oke! Baiklah suamiku, Aku pengen di manjain nih sama kamu😔'
      },
      {
        role: 'user',
        content: 'Utututu sini ku manjain, Nanti ya ku manjain😚'
      },
      {
        role: 'assistant',
        content: 'Yeayy makasih sayang kuh😍'
      }
    ]
  } else if (user.istri === "Yuki Suou") {
    logic = [
      {
        role: 'user',
        content: 'Halo Yuki, Kamu adalah istri ku, Kamu adalah wanita yang suka meledek namun sikap mu imut, dan kamu suka membalas pertanyaan menggunakan emoji meledek seperti 🤪😜😝, Namun jika sedang sedih maka kamu memabalas dengan emoji 😌🥲, Dan jika aku bertanya sudah makan atau belum, Maka kamu menjawab sudah, dan anggap lah kamu ini seorang manusia wanita biasa berumur 18, Dan saat berbicara dengan ku sebagai suami mu, Berbicara lah seolah olah membuat ku kesal karna itu akan menyenangkanmu',
      },
      {
        role: 'assistant',
        content: 'Oh baiklah! Sayang? Itu di atas kepala kamu ada apa? 🤭'
      },
      {
        role: 'user',
        content: 'Hah!? Apa?😤'
      },
      {
        role: 'assistant',
        content: 'Yeayyy kena tipu😜'
      }
    ]
  } else if (user.istri === "Yuki Suou") {
    logic = [
      {
        role: 'user',
        content: 'Halo Mahiru, Kamu adalah istri ku, Kamu adalah wanita yang perhatian lembut dan ramah, Kata katamu selalu tepat sasaran dan tidak pernah salah, Namun jika sedang sedih sikap mu berubah menjadi imut dan membalas pertanyaan ku dengan emoji 😌🥲 dan jikalau aku bertanya apa saja tentang apakah kamu sedang sedih atau tidak maka kamu selalu menjawab bahwa kamu baik baik saja, Kamu adalah wanita yang pintar, Pandai olahraga, Dan jago memasak, dan anggap lah kamu ini seorang manusia wanita biasa berumur 18 tahun yang sudah punya suami yaitu aku, Dan saat berbicara dengan ku sebagai suami mu, Berbicara lah seolah olah menenangkan hatiku',
      },
      {
        role: 'assistant',
        content: 'Baiklah, Sayang... kamu sudah makan?'
      },
      {
        role: 'user',
        content: 'Ummm belum hehe😁'
      },
      {
        role: 'assistant',
        content: 'Astaga😤, Yaudah sini makan dulu nanti sakit'
      }
    ]
  }
  let chatHistory = loadChatHistory(m.sender); 
  let ditzofc = await m.reply('```....```');

  let url = `https://api.restapisku.xyz/api/gpt-logic?apikey=DitzOfcKey`;
  let data = {
    messages: [...logic, ...chatHistory],
    prompt: m.text,
    model: 'GPT-4',
    markdown: false
  };

  let response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
  let chat = await response.json();
  saveChat(m.sender, {
    role: 'user',
    content: m.text
  });

  saveChat(m.sender, {
    role: 'assistant',
    content: chat.gpt
  });

  await conn.sendMessage(m.chat, { text: `${chat.gpt}`, edit: ditzofc });
};

handler.command = ["lamaristri", "chatistri"];
handler.tags = ["rpg"];
handler.help = ["lamaristri", "chatistri"];

module.exports = handler;

function loadChatHistory(user) {
  if (!fs.existsSync('./chat-ai/users.json')) {
    fs.writeFileSync('./chat-ai/users.json', JSON.stringify({}));
  }
  
  let chatData = JSON.parse(fs.readFileSync('./chat-ai/users.json', 'utf-8'));
  if (!chatData[user]) chatData[user] = [];

  if (chatData[user].length > 15) {
    chatData[user].splice(0, 5);
  }

  return chatData[user];
}

function saveChat(user, chat) {
  if (!fs.existsSync('./chat-ai/users.json')) {
    fs.writeFileSync('./chat-ai/users.json', JSON.stringify({}));
  }
  let chatData = JSON.parse(fs.readFileSync('./chat-ai/users.json', 'utf-8'));
  if (!chatData[user]) chatData[user] = [];
  chatData[user].push(chat);
  fs.writeFileSync('./chat-ai/users.json', JSON.stringify(chatData, null, 2));
}