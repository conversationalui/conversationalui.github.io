---
layout: botui
title: Botui
permalink: /botui/
---

<div class="botui-app-container" id="hello-world">
    <bot-ui></bot-ui>
  </div>
  <script src="https://cdn.jsdelivr.net/vue/2.0.5/vue.min.js"></script>
  <script src="{{ "/assets/js/botui.js" | relative_url }}"></script>
  <script>
    var botui = new BotUI('hello-world');

    botui.message.add({
      loading: true
    }).then(function (index) {
      setTimeout(function () {
        botui.message.update(index, {
          content: 'Hello World from bot!',
          loading: false
        }).then(function () {
          botui.message.add({
            delay: 2000,
            loading: true,
            content: 'Delayed Hello World'
          });
        });
      }, 5000);
    });

    botui.message.add({
      human: true,
      content: 'Hello World from human!'
    }).then(function () {
      botui.action.text({
        action: {
          button: {
            icon: 'check',
            label: 'Submit'
          }
        }
      });
    });
  </script>

