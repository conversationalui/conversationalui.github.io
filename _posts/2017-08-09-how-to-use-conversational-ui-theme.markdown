---
layout: post
title:  "How to use Conversational ui theme"
date:   2017-08-09 09:33:45 +0200
categories: jekyll bot chatbot conversational
---

![Hello there](/assets/img/how-to-use-bender.gif)

## Conversational UI

[![Join the chat at https://gitter.im/BotUIChat/botui](https://badges.gitter.im/BotUIChat/botui.svg)](https://gitter.im/BotUIChat/botui?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge) [![npm](https://img.shields.io/npm/v/botui.svg?style=flat-square)](https://www.npmjs.com/package/botui) [![npm](https://img.shields.io/npm/dm/botui.svg?style=flat-square)](https://www.npmjs.com/package/botui)

> A Jekyll theme to create conversational UIs.


[Main Site](https://botui.org) - [Read Docs](https://docs.botui.org) - [Examples](https://github.com/moinism/botui-examples)

### Quick look

![Conversional UI theme](/assets/img/conversionalui.gif)

### HTML section

```html
<div class="botui-app-container" id="botui-app">
  <bot-ui></bot-ui>
</div>
```

### JavaScript


```javascript
var botui = new BotUI('botui-app'); // give it the id of container

botui.message.bot({ // show first message
  delay: 200,
  content: 'hello'
}).then(function () {
  return botui.message.bot({ // second one
    delay: 1000, // wait 1 sec.
    content: 'how are you?'
  });
}).then(function () {
  return botui.action.button({ // let user do something
    delay: 1000,
    action: [
      {
        text: 'Good',
        value: 'good'
      },
      {
        text: 'Really Good',
        value: 'really_good'
      }
    ]
  });
}).then(function (res) {
  return botui.message.bot({
    delay: 1000,
    content: 'You are feeling ' + res.text + '!'
  });
});
```

## How to use

Quick guide to start your bot.

### 1. Learn about BotUI framework

Take a tour of the official [BotUI](https://botui.org/) framework website and get familiar with the functionality and implementation possibilities by studying the [documentation](https://docs.botui.org/).

### 2. Create your bot script

After getting familiar with BotUI you will be able to create your own bot! Commit yourself and do something that makes your ideal readers feel involved!

### 3. Put it in the /assets/bots folder

Assuming you know [jekyll's](https://jekyllrb.com/) work and you've already created your build, put your bot in the /assets/bots/what_you_like folder; Conversational UI theme defaults to that folder from your bot ideas.

### 4. Specify in jekyll page/posts header section you bot file path

Add to the initial configuration of your page or post the 'bot' entry by specifying the path and the filename. 

For example:

```ruby
---
layout: post
title:  "How to use Conversational ui theme"
date:   2017-08-09 09:33:45 +0200
categories: jekyll bot chatbot conversational
bot: home/home-bot.js
--- 
```

```ruby
bot: home/home-bot.js
```
where the home folder is placed in /assets/bots/home/home-bot.js.

If you use a hierarchy to keep your bots sorted, you will not be tempted to find them in the future if I want to modify them. For example, for each new page or post where I insert a bot, I create a folder with the name of the post page I'm going to create.

### 5. Add the HTML section into your page/post

Now you can add the html part of your bot to the page so:

```html
<div class="botui-app-container" id="home-demo">
    <bot-ui></bot-ui>
</div>
```

Where the id = "home-demo" field is the same identifier as the bot inserted in the javascript file.

### 6. Enjoy your bot

![Locomotive bender](/assets/img/bender-locomotive.gif)

### License

[MIT License](https://github.com/conversationalui/conversationalui.github.io/blob/master/LICENSE) - Copyrights (c) 2017 - Antonio Trento

