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

    this.tebakkimia = this.tebakkimia ? this.tebakkimia : {};
    if (!(id in this.tebakkimia)) {
        return
    }

    if (m.quoted.id == this.tebakkimia[id][0].id) {
        let json = JSON.parse(JSON.stringify(this.tebakkimia[id][1]));
        if (m.text.toLowerCase() == json.unsur.toLowerCase().trim()) {
            console.log('Answer is correct');
            global.db.data.users[m.sender].exp += this.tebakkimia[id][2];
            await this.reply(m.chat, `*Benar!*\n+${this.tebakkimia[id][2]} XP`, m);
            clearTimeout(this.tebakkimia[id][3]);
            delete this.tebakkimia[id];
        } else if (similarity(m.text.toLowerCase(), json.unsur.toLowerCase().trim()) >= threshold) {
            m.reply(`*Dikit Lagi!*`);
        } else {
            m.reply(`*Salah!*`);
        }
    } else {
        console.log('Quoted message ID does not match the question');
    }
    return true;
};

module.exports = handler;