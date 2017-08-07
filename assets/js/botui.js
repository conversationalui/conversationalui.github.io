(function (root, factory) {
  "use strict";
  if (typeof define === 'function' && define.amd) {
    define([], function () {
      return (root.BotUI = factory(root));
    });
  } else {
    root.BotUI = factory(root);
  }
}(typeof window !== 'undefined' ? window : this, function (root, undefined) {
  "use strict";

  var BotUI = (function (id, opts) {

    opts = opts || {};

    if(!id) {
      throw Error('BotUI: Container id is required as first argument.');
    }

    if(!document.getElementById(id)) {
      throw Error('BotUI: Element with id #' + id + ' does not exist.');
    }

    if(!root.Vue && !opts.vue) {
      throw Error('BotUI: Vue is required but not found.');
    }

    var _botApp, // current vue instance.
    _options = {
      debug: false,
      fontawesome: true
    },
    _container, // the outermost Element. Needed to scroll to bottom, for now.
    _interface = {}, // methods returned by a BotUI() instance.
    _actionResolve,
    _markDownRegex = {
      icon: /!\(([^\)]+)\)/igm, // !(icon)
      image: /!\[(.*?)\]\((.*?)\)/igm, // ![aleternate text](src)
      link: /\[([^\[]+)\]\(([^\)]+)\)(\^?)/igm // [text](link) ^ can be added at end to set the target as 'blank'
    },
    _fontAwesome = 'https://use.fontawesome.com/ea731dcb6f.js',
    _esPromisePollyfill = 'https://cdn.jsdelivr.net/es6-promise/4.1.0/es6-promise.min.js'; // mostly for IE

    root.Vue = root.Vue || opts.vue;

    // merge opts passed to constructor with _options
    for (var prop in _options) {
      if (opts.hasOwnProperty(prop)) {
        _options[prop] = opts[prop];
      }
    }

    if(!root.Promise && !Promise && !options.promise) {
      loadScript(_esPromisePollyfill);
    }

    function _linkReplacer(match, $1, $2, $3) {
      var _target = $3 ? 'blank' : ''; // check if '^' sign is present with link syntax
      return "<a class='botui-message-content-link' target='" + _target + "' href='" + $2 +"'>" + $1 + "</a>";
    }

    function _parseMarkDown(text) {
      return text
                 .replace(_markDownRegex.image, "<img class='botui-message-content-image' src='$2' alt='$1' />")
                 .replace(_markDownRegex.icon, "<i class='botui-icon botui-message-content-icon fa fa-$1'></i>")
                 .replace(_markDownRegex.link, _linkReplacer);
    }

    function loadScript(src, cb) {
      var script = document.createElement('script');
          script.type = 'text/javascript';
          script.src = src;

          if(cb) {
            script.onload = cb;
          }

      document.body.appendChild(script);
    }

    function _handleAction(text) {
      if(_instance.action.addMessage) {
        _interface.message.human({
          delay: 100,
          content: text
        });
      }
      _instance.action.show = !_instance.action.autoHide;
    }

    var _botuiComponent = {
      template: 'BOTUI_TEMPLATE', // replaced by HTML template during build. see Gulpfile.js
      data: function () {
        return {
          action: {
            text: {
              size: 30,
              placeholder: 'Write here ..'
            },
            button: {},
            show: false,
            type: 'text',
            autoHide: true,
            addMessage: true
          },
          messages: []
        };
      },
      computed: {
        isMobile: function () {
          return root.innerWidth && root.innerWidth <= 768;
        }
      },
    	methods: {
    		handle_action_button: function (button) {
          _handleAction(button.text);
          var defaultActionObj = {
            type: 'button',
            text: button.text,
            value: button.value
          };

          for (var eachProperty in button) {
            if (button.hasOwnProperty(eachProperty)) {
              if (eachProperty !== 'type' && eachProperty !== 'text' && eachProperty !== 'value') {
                defaultActionObj[eachProperty] = button[eachProperty];
              }
            }
          }

          _actionResolve(defaultActionObj);
    		},
    		handle_action_text: function () {
    			if(!this.action.text.value) return;
          _handleAction(this.action.text.value);
    			_actionResolve({
            type: 'text',
            value: this.action.text.value
          });
    			this.action.text.value = '';
    		}
    	}
    };

    root.Vue.directive('botui-markdown', function (el, binding) {
      if(binding.value == 'false') return; // v-botui-markdown="false"
      el.innerHTML = _parseMarkDown(el.textContent);
    });

    root.Vue.directive('botui-scroll', {
      inserted: function (el) {
        _container.scrollTop = _container.scrollHeight;
      }
    });

    root.Vue.directive('focus', {
      inserted: function (el) {
        el.focus();
      }
    });

    root.Vue.directive('botui-container', {
      inserted: function (el) {
        _container = el;
      }
    });

    _botApp = new root.Vue({
      components: {
        'bot-ui': _botuiComponent
      }
    }).$mount('#' + id);

    var _instance = _botApp.$children[0]; // to access the component's data

    function _addMessage(_msg) {

      if(!_msg.loading && !_msg.content) {
        throw Error('BotUI: "content" is required in a non-loading message object.');
      }

      _msg.type = _msg.type || 'text';
      _msg.visible = (_msg.delay || _msg.loading) ? false : true;
      var _index = _instance.messages.push(_msg) - 1;

      return new Promise(function (resolve, reject) {
        setTimeout(function () {
          if(_msg.delay) {
            _msg.visible = true;

            if(_msg.loading) {
              _msg.loading = false;
            }
          }
          resolve(_index);
        }, _msg.delay || 0);
      });
    }

    function _checkOpts(_opts) {
      if(typeof _opts === 'string') {
        _opts = {
          content: _opts
        };
      }
      return _opts || {};
    }

    _interface.message =  {
      add: function (addOpts) {
        return _addMessage( _checkOpts(addOpts) );
      },
      bot: function (addOpts) {
        addOpts = _checkOpts(addOpts);
        return _addMessage(addOpts);
      },
      human: function (addOpts) {
        addOpts = _checkOpts(addOpts);
        addOpts.human = true;
        return _addMessage(addOpts);
      },
      get: function (index) {
        return Promise.resolve(_instance.messages[index]);
      },
      remove: function (index) {
        _instance.messages.splice(index, 1);
        return Promise.resolve();
      },
      update: function (index, msg) { // only content can be updated, not the message type.
        var _msg = _instance.messages[index];
        _msg.content = msg.content;
        _msg.visible = !msg.loading;
        _msg.loading = !!msg.loading;
        return Promise.resolve(msg.content);
      },
      removeAll: function () {
        _instance.messages.splice(0, _instance.messages.length);
        return Promise.resolve();
      }
    };

    function mergeAtoB(objA, objB) {
      for (var prop in objA) {
        if (!objB.hasOwnProperty(prop)) {
          objB[prop] = objA[prop];
        }
      }
    }

    function _checkAction(_opts) {
      if(!_opts.action) {
        throw Error('BotUI: "action" property is required.');
      }
    }

    function _showActions(_opts) {

      _checkAction(_opts);

      mergeAtoB({
        type: 'text',
        cssClass: '',
        autoHide: true,
        addMessage: true
      }, _opts);

      _instance.action.type = _opts.type;
      _instance.action.cssClass = _opts.cssClass;
      _instance.action.autoHide = _opts.autoHide;
      _instance.action.addMessage = _opts.addMessage;

      return new Promise(function(resolve, reject) {
        _actionResolve = resolve; // resolved when action is performed, i.e: button clicked, text submitted, etc.
        setTimeout(function () {
          _instance.action.show = true;
        }, _opts.delay || 0);
      });
    };

    _interface.action = {
      show: _showActions,
      hide: function () {
        _instance.action.show = false;
        return Promise.resolve();
      },
      text: function (_opts) {
        _checkAction(_opts);
        _instance.action.text = _opts.action;
        return _showActions(_opts);
      },
      button: function (_opts) {
        _checkAction(_opts);
        _opts.type = 'button';
        _instance.action.button.buttons = _opts.action;
        return _showActions(_opts);
      }
    };

    if(_options.fontawesome) {
      loadScript(_fontAwesome);
    }

    if(_options.debug) {
      _interface._botApp = _botApp; // current Vue instance
    }

    return _interface;
  });

  return BotUI;

}));
