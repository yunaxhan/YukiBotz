const similarity = require('similarity');
const threshold = 0.72;


let handler = m => m
handler.before = async function (m) {  
     let id = m.chat;
    if (!m.quoted) {
        return true;
    }
    if (!m.quoted.fromMe) {
        return true;
    }
    if (!m.quoted.text) {
        return true;
    }
    if (m.sender === conn.user.jid) {
     return false
    }

    this.tebakgame = this.tebakgame ? this.tebakgame : {};
    if (!(id in this.tebakgame)) {
        return
    }

    if (m.quoted.id == this.tebakgame[id][0].id) {
        let json = JSON.parse(JSON.stringify(this.tebakgame[id][1]));
        if (m.text.toLowerCase() == json.jawaban.toLowerCase().trim()) {
            console.log('Answer is correct');
            global.db.data.users[m.sender].exp += this.tebakgame[id][2];
            await this.reply(m.chat, `*Benar!*\n+${this.tebakgame[id][2]} XP`, m);
            clearTimeout(this.tebakgame[id][3]);
            delete this.tebakgame[id];
        } else if (similarity(m.text.toLowerCase(), json.jawaban.toLowerCase().trim()) >= threshold) {
            console.log('Answer is close');
            m.reply(`*Dikit Lagi!*`);
        } else {
            console.log('Answer is incorrect');
            m.reply(`*Salah!*`);
        }
    } else {
        console.log('Quoted message ID does not match the question');
    }
    return true;
};

module.exports = handler;