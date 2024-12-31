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

    this.tebakbendera = this.tebakbendera ? this.tebakbendera : {};
    if (!(id in this.tebakbendera)) {
        return
    }

    if (m.quoted.id == this.tebakbendera[id][0].id) {
        let json = JSON.parse(JSON.stringify(this.tebakbendera[id][1]));
        if (m.text.toLowerCase() == json.name.toLowerCase().trim()) {
            global.db.data.users[m.sender].exp += this.tebakbendera[id][2];
            await this.reply(m.chat, `*Benar!*\n+${this.tebakbendera[id][2]} XP`, m);
            clearTimeout(this.tebakbendera[id][3]);
            delete this.tebakbendera[id];
        } else if (similarity(m.text.toLowerCase(), json.name.toLowerCase().trim()) >= threshold) {
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