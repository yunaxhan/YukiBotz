let handler = async (m, { conn, isOwner, usedPrefix, command, text }) => {
  m.reply("Worek king!")
}

handler.help = ['test']
handler.tags = ['info']
handler.command = /^test$/i

module.exports = handler