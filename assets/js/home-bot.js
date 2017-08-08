
var homeBot = BotUI('home-demo');

homeBot.message.add({
  content: 'Hello, welcome! 👋 Here is Antonio.'
}).then(function () {
  return homeBot.message.add({
    delay: 1500,
    content: 'Have you ever heard about conversational layouts?'
  });
}).then(function () {
  return homeBot.message.add({
    delay: 1500,
    content: 'Is a new way to share your offers 🕶'
  });
}).then(function () {
  return homeBot.message.add({
    delay: 1500,
    content: 'More engaging and interactive.'
  });
}).then(function () {
  return homeBot.message.add({
    delay: 1500,
    content: 'Want to know more about the history of conversational 🤖 bots? Or do you want to find out now how to create your own conversational landing page?'
  });
}).then(function () {
  return homeBot.action.button({
    delay: 2500,
    action: [{
      text: 'History!',
      value: 'history'
    }, {
      text: 'Landing pages',
      value: 'landing'
    }]
  });
}).then(function (res) {
  //ga_record('btn_click', res.value); google analitics lock execution
  if(res.value == 'history') {
    story();
  }
  if(res.value == 'landing') {
    land();
  }
});

var story = function () {
  homeBot.message.add({
    delay: 2000,
    content: "Awesome! Let me explain how a conversational user experience can help your projects:"
  }).then(function () {
    return homeBot.message.add({
      delay: 1000,
      content: '1) may be a strategy for involving your users, thanks to the method of using the content you intend to divulge.'
    });
  }).then(function () {
    return homeBot.message.add({
      delay: 3000,
      content: '2) You can use it to collect lead and user information more fluidly, increasing engagement opportunities.'
    });
  }).then(function () {
    return homeBot.message.add({
      delay: 3000,
      content: '3) Bring your conversation to a more confidential level.'
    });
  }).then(function () {
    return homeBot.message.add({
      delay: 1200,
      content: 'Can I know your name?'
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
      content: res.value + ' nice to meet you!'
    });
  }).then(function (res) {
    return homeBot.message.bot({
      delay: 500,
      content: 'Such a layout allows you to share only information that may interest readers and skip unnecessary ones to those who are not interested, by means of targeted questions designed to create a suitable path for the player.'
    });
  }).then(function (res) {
    return homeBot.message.bot({
      delay: 1400,
      content: 'Or you can share third-party elements to clear your content and your conversations'
    });
  }).then(function (res) {
    return homeBot.message.add({
      delay: 1200,
      type: 'embed',
      content: 'https://giphy.com/embed/3ohze0jPWQJJ2EEo7K'
    });
  }).then(function (res) {
    return homeBot.message.bot({
      delay: 2500,
      content: 'There is a lot more you can do with Bots check this !(book) [article](https://venturebeat.com/2017/07/20/the-future-of-enterprise-chatbots/)'
    });
  }).then(land);
};

var land = function () {
  //ga_record('message', 'end'); google analitics lock execution
  homeBot.message.add({
    delay: 1000,
    content: 'Usually this kind of user experience is implemented in chatbots 🤖 for communication applications such as messenger, slack or snippet for web sites. But it can also be used differently:'
  }).then(function () {
    return homeBot.message.bot({
      delay: 2000,
      content: 'now you can also use conversational layouts in your landing page to promote your web bids!'
    });
  }).then(function () {
    return homeBot.message.add({
      delay: 1200,
      type: 'embed',
      content: 'https://giphy.com/embed/srbiWWa0VW2YM'
    });
  }).then(function () {
    return homeBot.message.bot({
      delay: 1000,
      content: 'By deburring !(book) [BotUI](https://github.com/moinism/botui), a new javascript framework, I have developed for you this example that is based on !(book) [Jekyll](https://jekyllrb.com/) hosted on !(github) [GitHub pages](https://pages.github.com/)'
    });
  }).then(function () {
    return homeBot.message.bot({
      delay: 3000,
      content: 'Fork it out !(github) [here](https://github.com/conversationalui/conversationalui.github.io) and start build your conversional landing page!'
    });
  }).then(function () {
    return homeBot.message.bot({
      delay: 2000,
      content: 'I hope you can come back to creating great communications!'
    });
  }).then(function () {
    return homeBot.message.bot({
      delay: 1000,
      content: 'If you need further information or have any doubts, drop me in line on !(mail) [lantoniotrento@gmail.com](mailto:lantoniotrento@gmail.com), I am always happy to meet new people and create something extraordinary together!'
    });
  }).then(function () {
    return homeBot.message.bot({
      delay: 2000,
      content: 'If you want to give me a hand to let you know this project in the world feel free to share !(twitter) [this tweet](https://github.com/conversationalui/conversationalui.github.io) on my twitter account, I would be very grateful to you!'
    });
  }).then(function () {
    return homeBot.message.bot({
      delay: 3000,
      content: '👋'
    });
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
