
var homeBot = BotUI('home-demo');

homeBot.message.add({
  content: 'Hello there!'
}).then(function () {
  return homeBot.message.add({
    delay: 1500,
    content: 'Wanna see a demo of what BotUI can do?'
  });
}).then(function () {
  return homeBot.action.button({
    delay: 1000,
    action: [{
      text: 'Sure!',
      value: 'sure'
    }, {
      text: 'Just skip to end 😒',
      value: 'skip'
    }]
  });
}).then(function (res) {
  ga_record('btn_click', res.value);
  if(res.value == 'sure') {
    tutorial();
  }
  if(res.value == 'skip') {
    end();
  }
});

var tutorial = function () {
  homeBot.message.add({
    delay: 1000,
    content: "Awesome! You can show buttons like the one you pressed."
  }).then(function () {
    return homeBot.message.add({
      delay: 1000,
      content: 'You can ask for text input like ..'
    });
  }).then(function () {
    return homeBot.message.add({
      delay: 1200,
      content: 'Whats your name?'
    });
  }).then(function () {
    return homeBot.action.text({
      delay: 800,
      action: {
        value: 'John Doe',
        placeholder: 'Your name'
      }
    });
  }).then(function (res) {
    return homeBot.message.bot({
      delay: 500,
      content: res.value + ' is a nice name!'
    });
  }).then(function (res) {
    return homeBot.message.bot({
      delay: 1400,
      content: 'You can also embed something from 3rd party'
    });
  }).then(function (res) {
    return homeBot.message.add({
      delay: 1200,
      type: 'embed',
      content: 'https://giphy.com/embed/v1PSPwbLIrata'
    });
  }).then(function (res) {
    return homeBot.message.bot({
      delay: 2500,
      content: 'There is a lot more you can do with BotUI'
    });
  }).then(function (res) {
    return homeBot.message.bot({
      delay: 1000,
      content: 'Now go on, explore the docs and build yourself a bot.'
    });
  }).then(end);
};

var end = function () {
  ga_record('message', 'end');
  homeBot.message.add({
    delay: 1000,
    content: '!(book) [Read the docs](https:///docs.botui.org), see [examples](https:///examples.botui.org) or explore the code on !(github) [GitHub](https://github.com/moinism/botui)'
  });
};

var ga_record = function(type, action) {
  if(ga) {
    ga('send', {
      hitType: 'event',
      eventCategory: type,
      eventAction: action
    });
  }
}
