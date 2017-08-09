
var homeBot = BotUI('home-demo');

homeBot.message.add({
  content: 'Hey 👋 Did you lost?'
}).then(function () {
  return homeBot.message.add({
    delay: 2500,
    content: 'This page does not exist!'
  });
}).then(function () {
  return homeBot.message.add({
    delay: 1500,
    content: 'Try come back to 🏠 [home](/)'
  });
});