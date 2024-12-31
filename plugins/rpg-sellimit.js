let handler = async (m, { conn, args }) => {
    if (!args[0] || isNaN(args[0])) {
        return conn.reply(m.chat, '• *Example :* .selllimit 10', m);
    }

    conn.sendMessage(m.chat, {
        react: {
            text: '🕒',
            key: m.key,
        }
    });

    let count = parseInt(args[0]);
    let price = count * 100;
    let users = global.db.data.users;
    let user = users[m.sender];

    if (count > user.limit) {
        return conn.reply(m.chat, `🚩 Maaf, limit kamu tidak cukup untuk menjual ${count} limit.`, m);
    }

    user.limit -= count;
    user.money += price;
    conn.reply(m.chat, `🚩 Berhasil menjual ${count} limit dan mendapatkan ${price} balance.`, m);
}

handler.help = ['selllimit *<amount>*'];
handler.tags = ['rpg'];
handler.command = /^selllimit$/i;
handler.register = true;
handler.limit = false;

module.exports = handler;