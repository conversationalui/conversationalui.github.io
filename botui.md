---
layout: botui
title: Botui
permalink: /botui/
---


<div class="botui-app-container" id="home-demo">
    <bot-ui></bot-ui>
  </div>

  <script src="https://cdn.jsdelivr.net/vue/2.0.5/vue.min.js"></script>
  <script src="{{ "/assets/js/botui.js" | relative_url }}"></script>
  
  <script>
    if (window.location.hostname.indexOf("botui.org") === 0) { // don't track local dev visits
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

      ga('create', 'UA-102158265-2', 'auto');
      ga('send', 'pageview');
    } else {
      window.ga = false;
    }
    </script>

  
  <script src="/assets/js/home-bot.js"></script>
  