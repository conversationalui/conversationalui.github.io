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

1. Learn about BotUI framework
2. Create your bot script
3. Put it in the /assets/bots folder
4. Specify in jekyll page/posts header section you bot file path
5. Add the HTML section into your page/post


### License

[MIT License](https://github.com/conversationalui/conversationalui.github.io/blob/master/LICENSE) - Copyrights (c) 2017 - Antonio Trento

