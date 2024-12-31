let nodemailer = require('nodemailer');
let fs = require('fs');

var code;

let handler = async (m, { conn, args, usedPrefix, command }) => {
    conn.regmail = conn.regmail ? conn.regmail : {};
    if (conn.regmail[m.chat]?.[m.sender]) {
        return m.reply('You are requesting verification! please check your email box!');
    }
    let users = global.db.data.users[m.sender];
    let name = await conn.getName(m.sender);
    if (users.registered === true) {
        return conn.reply(m.chat, Func.texted('bold', `✅ Your number is already verified.`), m);
    }
    if (!args || !args[0]) {
        return conn.reply(m.chat, `• *Example :* .${command} ${global.email}`, m);
    }
    await conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key }});

    if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ig.test(args[0])) {
        return conn.reply(m.chat, Func.texted('bold', '🚩 Invalid email.'), m);
    }

    code = `${getRandomInt(100, 900)}-${getRandomInt(100, 900)}`;
    let yuki = conn.user.jid.split("@")[0];
    users.codeExpire = new Date * 1;
    users.code = code;
    users.email = args[0];

    let transport = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'komaribotz@gmail.com',
            pass: 'iemdszkyswzfnwom'
        }
    });

    let mailOptions = {
        from: {
            name: 'Komari Service',
            address: 'komaribotz@gmail.com'
        },
        to: args[0],
        subject: 'Email Verification',
        html: `
            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: linear-gradient(135deg, #0f0f0f, #1c1c1c); padding: 40px; text-align: center; border-radius: 15px; color: #ffffff; box-shadow: 0px 0px 30px 10px rgba(0, 191, 255, 0.8);">
                <div style="background-color: #181818; padding: 35px; border-radius: 15px;">
                    <h2 style="color: #00bfff; font-size: 28px;">Hi <b>${name} 😘</b>,</h2>
                    <p style="color: #cccccc; font-size: 18px;">
                        Confirm your email to start using <b>Yukki-chan</b>. Please enter the verification code below in the bot. The code will expire in 3 minutes.
                    </p>
                    <h1 style="color: #00bfff; font-size: 48px; margin: 30px 0; text-shadow: 0 0 20px #00bfff, 0 0 10px #00bfff;">${code}</h1>
                    <p style="font-size: 14px; color: #999999;">
                        Click the button below to automatically send the code:
                    </p>
                    <a href="https://wa.me/${yuki}?text=${code}" style="display: inline-block; margin-top: 25px; padding: 15px 35px; background-color: #00bfff; color: #ffffff; text-decoration: none; border-radius: 8px; font-size: 18px; box-shadow: 0px 0px 20px 5px rgba(0, 191, 255, 0.8); transition: all 0.3s ease-in-out;">
                        Verify via WhatsApp
                    </a>
                    <hr style="border-top: 1px dashed #333333; margin: 35px 0;">
                    <p style="font-size: 12px; color: #666666;">
                        Powered by: <b>DitzOfc</b><br> 
                        <i>All rights reserved © Yuki-chan</i>
                    </p>
                    <div style="margin-top: 10px;">
                        <a href="https://github.com/DitzOfc-Expertise" style="margin: 0 5px;">
                            <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="GitHub" style="width: 20px; height: 20px; opacity: 0.7;">
                        </a>
                        <a href="https://www.tiktok.com/@ditz.ofc" style="margin: 0 5px;">
                            <img src="https://cdn-icons-png.flaticon.com/512/3046/3046121.png" alt="TikTok" style="width: 20px; height: 20px; opacity: 0.7;">
                        </a>
                        <a href="https://www.youtube.com/@DitzOfc" style="margin: 0 5px;">
                            <img src="https://cdn-icons-png.flaticon.com/512/174/174883.png" alt="YouTube" style="width: 20px; height: 20px; opacity: 0.7;">
                        </a>
                        <a href="https://www.instagram.com/wayssokasik" style="margin: 0 5px;">
                            <img src="https://cdn-icons-png.flaticon.com/512/174/174855.png" alt="Instagram" style="width: 20px; height: 20px; opacity: 0.7;">
                        </a>
                        <a href="https://t.me/Ditzstore236" style="margin: 0 5px;">
                            <img src="https://cdn-icons-png.flaticon.com/512/2111/2111646.png" alt="Telegram" style="width: 20px; height: 20px; opacity: 0.7;">
                        </a>
                    </div>
                </div>
            </div>`
    };

    transport.sendMail(mailOptions, function(err, data) {
        if (err) {
            return m.reply(Func.texted('bold', `❌ SMTP Error !!`));
        } else {
            conn.reply(m.chat, Func.texted('bold', `✅ Check your mailbox for the verification code.`), m);
        }
    });

    conn.regmail[m.chat] = {
        ...conn.regmail[m.chat],
        [m.sender]: {
            step: 1,
            message: m,
            sender: m.sender,
            otp: code,
            users,
            timeout: setTimeout(() => {
                delete conn.regmail[m.chat][m.sender];
            }, 60 * 1000)
        }
    }
}

handler.before = async (m, { conn }) => {
    conn.regmail = conn.regmail ? conn.regmail : {};
    if (m.isBaileys) return;
    if (!conn.regmail[m.chat]?.[m.sender]) return;
    if (!m.text) return;

    let user = global.db.data.users[m.sender];
    if (user?.registered) {
        delete conn.regmail[m.chat]?.[m.sender];
        return;
    }
    let { timeout, otp, step, message } = conn.regmail[m.chat]?.[m.sender];
    console.log(`Step: ${step}, Message: ${m.text}`);
    if (step === 1) {
        if (m.text !== otp) {
            clearTimeout(timeout);
            delete conn.regmail[m.chat]?.[m.sender];
            return await m.reply(`🚩 Your verification code is wrong.`);
        }
        clearTimeout(timeout);
        let messageName = await conn.sendMessage(m.chat, { text: "Masukan Nama Anda:" }, { quoted: m });
        let nameTimeout = setTimeout(async () => {
            await conn.sendMessage(m.chat, { delete: messageName.key });
            delete conn.regmail[m.chat]?.[m.sender];
        }, 180000);
        conn.regmail[m.chat][m.sender] = { step: 2, timeout: nameTimeout, messageName };
    } else if (step === 2) {
        clearTimeout(conn.regmail[m.chat][m.sender].timeout);
        let name = m.text.trim();
        user.name = name;
        let messageAge = await conn.sendMessage(m.chat, { text: "Masukan Umur Anda:" }, { quoted: m });
        let ageTimeout = setTimeout(async () => {
            await conn.sendMessage(m.chat, { delete: messageAge.key });
            delete conn.regmail[m.chat]?.[m.sender];
        }, 180000);
        conn.regmail[m.chat][m.sender] = { step: 3, timeout: ageTimeout, messageAge };
    } else if (step === 3) {
        clearTimeout(conn.regmail[m.chat][m.sender].timeout);
        let ageText = m.text.trim();
        let age = parseInt(ageText);

        if (isNaN(age) || age <= 0) {
            console.log('Invalid age detected:', age);  
            return await conn.sendMessage(m.chat, { text: "🚩 Umur tidak valid. Harap masukkan umur yang valid." }, { quoted: m });
        }

        user.age = age;
        user.regTime = +new Date();
        user.registered = true;
        user.money += 5000000;
        user.limit += 14000;
        
        await conn.reply(m.chat, '✅ Succes! (+14.000 Limits) + (+Rp.5.000.000)', m);
        delete conn.regmail[m.chat]?.[m.sender];
    }
};
    
handler.help = ['reg *<email>*'];
handler.tags = ['start'];

handler.command = /^(reg|regmail)$/i;
handler.private = false;

module.exports = handler;

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function toRupiah(angka) {
    var saldo = '';
    var angkarev = angka.toString().split('').reverse().join('');
    for (var i = 0; i < angkarev.length; i++)
        if (i % 3 == 0) saldo += angkarev.substr(i, 3) + '.';
    return '' + saldo.split('', saldo.length - 1).reverse().join('');
}

function formatRupiah(number) {
    const formatter = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    });

    return formatter.format(number);
}