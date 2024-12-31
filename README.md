*don't forget to give this repository stars!*

<a name="readme-top"></a>

<br />
<div align="center">
  <a href="https://github.com/DitzDev/YukiBotz">
    <img src="https://files.catbox.moe/57yjn5.jpeg" alt="YukiBotz" width="220" height="220">
  <h3 align="center">Yuki Botz</h3>
  <p align="center">
    Created By DitzDev
 <p/>
</div>

<img src="https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://github.com/ellerbrock/open-source-badges"/>
<a href="https://github.com/DitzDev/YukiBotz"><img src="https://img.shields.io/github/watchers/DitzDev/YukiBotz.svg"</a>
<a href="https://github.com/DitzDev/YukiBotz"><img src="https://img.shields.io/github/stars/DitzDev/YukiBotz.svg"</a>
<a href="https://github.com/DitzDev/YukiBotz"><img src="https://img.shields.io/github/forks/DitzDev/YukiBotz.svg"</a>
<a href="https://github.com/DitzDev/YukiBotz"><img src="https://img.shields.io/github/repo-size/DitzDev/YukiBotz.svg"></a>
<a href="https://github.com/DitzDev/YukiBotz/issues"><img src="https://img.shields.io/github/issues/DitzDev/YukiBotz"></a>
<img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png"/>

> [!WARNING]
> 
> DO NOT SELL OR BUY THIS SCRIPT ANYMORE, IT IS FREE!


JOIN WITH MY CHANNEL FOR MORE INFORMATION UPDATE

[![WhatsApp](https://img.shields.io/badge/WhatsApp-25D366?logo=whatsapp&logoColor=fff&style=flat)](https://whatsapp.com/channel/0029VaxCdVuFsn0eDKeiIm2c)

### About
This bot was created by DitzDev, a beginner programmer. This bot was created with the aim of making everyday activities easier, I am very grateful And can't forget the support you have given me all this time
 
## Types and Programming Languages 

This script is of the Plugins CJS type, and the programming language used is:

* [![Javascript][Javascript.js]][Javascript-url]

<summary>Instalation</summary>

`you can choose Indonesian or English`
<details close="close">
<summary><i><b>Indonesian</b></i></summary>

***
### 1. Install Aplikasi [Termux](https://f-droid.org/repo/com.termux_118.apk)
> Setelah Install Aplikasi Termux, Silahkan Salin Teks Dibawah, Setelah Disalin Tempel Di Aplikasi Termux.
```
pkg update -y;pkg upgrade -y;pkg install nodejs -y;pkg install git -y;git clone https://github.com/DitzDev/YukiBotz.git && cd YukiBotz;rm -rf session.json;node index
```
### 2. Pairing Code & Scan
> Kamu juga bisa memilih opsi, antara pairing code atau scan
```sh
node index.js --pairing-code
```
> Ini adalah opsi perintah untuk scan
```sh
node index.js
```
***
</details><details close="close"><summary><i><b>English</b></i></summary>

***
### 1. Install The [Termux](https://f-droid.org/repo/com.termux_118.apk) App
> After Installing The Termux Application, Please Copy The Text Below, After Copying Paste In The Termux Application.
```
pkg update -y;pkg upgrade -y;pkg install nodejs -y;pkg install git -y;git clone https://github.com/DitzDev/YukiBotz.git && cd YukiBotz;rm -rf session.json;node index
```
### 2. Pairing Code & Scan
> You can choose the option between pairing code or scan
```sh
node index.js --pairing-code
```
> This is a command so that the script can connect to the scan option
```sh
node index.js
```
***
</details></details>

## Features
- [x] Send Button Message
- [x] Jadi Bot Features
- [x] Interactive Message
- [x] Register Email (see main-regmail.js for example)

## Upcoming / Fix Features
- [ ] Downloader
- [ ] AI Chat

> [!NOTE]
> 
> If You Found Bug/Error, Open Issues or contact me personal

### Tutorial on How to Use the Send Button Function
<details close="close">
<summary><i><b>Send Button Message</b></i></summary>

***
```js
/**
  * ©DitzDev
  **/
let buttons = [{ text: '', id: '' }]

conn.sendButtonMsg(jid, 'text', 'footer', buttons, quoted)
// Or
conn.sendButtonMsg(jid, 'text', 'footer', [{ text: '', id: '' }], quoted)
```
***
</details></details>
<details close="close"><summary><i><b>Send Button Message With Image</b></i></summary>

***
```js
/**
  * ©DitzDev
  * The imageUrl part must be a string of url
  **/
let buttons = [{ text: '', id: '' }]
conn.sendButtonImg(jid, 'text', 'footer', buttons, imageUrl, quoted)
// or
conn.sendButtonImg(jid, 'text', 'footer', [{ text: '', id: '' }], imageUrl, quoted)
```
***
</details></details>
<details close="close">
<summary><i><b>Send List Message</b></i></summary>

  ***
```js
/**
  * ©DitzDev
  **/
let sections = [{
  title: 'title',
  rows: [{
  header: 'header',
  title: 'title',
  description: 'description',
  id: 'id' 
}] 
}]

conn.sendListMsg(jid, 'text', 'footer', 'titleButton', sections, quoted)
```
***
</details></details>
<details close="close">
<summary><i><b>Send List Message With Image</b></i></summary>

***
```js
/**
  * ©DitzDev
  * The imageUrl part must be a string of url
  **/
let sections = [{
  title: 'title',
  rows: [{
  header: 'header',
  title: 'title',
  description: 'description',
  id: 'id' 
}] 
}]

conn.sendListImg(jid, 'text', 'footer', 'titleButton', sections, imageUrl, quoted)
```
***
</details></details>
<details close="close">
<summary><i><b>Send Button Card</b></i></summary>

***
```js
/**
  * ©DitzDev
  * The imageUrl part must be a string of url
  * [cards] Must follow the example below
  * type = ['buttons', 'url']
  **/
  let cards = [
    {
      header: 'header',
      body: 'body',
      footer: 'footer',
      imageUrl: 'string',
      buttons: [
        {
          type: 'url',
          text: "text of buttons url",
          url: "https://example.com"
        },
        {
          type: 'buttons',
          text: "text of buttons",
          id: "quick_reply_id_1"
        }
      ]
    }
  ];

  await conn.sendButtonCard(jid, 'text', 'footer', cards, quoted);
```
***
</details></details>

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact Me
If you find a bug/error in the script, you can contact me directly via:

[On WhatsApp](https://wa.me/6285717062467)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

[Javascript.js]: https://shields.io/badge/JavaScript-F7DF1E?logo=JavaScript&logoColor=000&style=flat-square
[Javascript-url]: https://nodejs.org
