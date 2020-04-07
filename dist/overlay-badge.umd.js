(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.OverlayBadge = {}));
}(this, (function (exports) { 'use strict';

  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //

  var script = {
    name: "overlay-badge",
    props: {
      type: String,
      count: {
        type: [Number, String],
        default: 0
      },
      position: {
        type: String,
        default: "top-right"
        // 'top-right', 'bottom-right', 'top-left', 'bottom-left'
      },
      onClick: {
        type: Function,
        default: undefined
      }
    },
    computed: {
      styles: function styles() {
        var style = "";
        switch (this.type) {
          case "primary":
            style = "background-color: #007bff; color: white;";
            break;
          case "secondary":
            style = "background-color: #6c757d; color: white;";
            break;
          case "success":
            style = "background-color: #28a745; color: white;";
            break;
          case "info":
            style = "background-color: #17a2b8; color: white;";
            break;
          case "warning":
            style = "background-color: #ffc107; color: black;";
            break;
          case "danger":
            style = "background-color: #dc3545; color: white;";
            break;
          default:
            style = "background-color: #007bff; color: white;";
        }
        if (this.onClick) { style += " cursor: pointer;"; }
        else { style += " cursor: default;"; }
        return style;
      }
    }
  };

  function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
      if (typeof shadowMode !== 'boolean') {
          createInjectorSSR = createInjector;
          createInjector = shadowMode;
          shadowMode = false;
      }
      // Vue.extend constructor export interop.
      var options = typeof script === 'function' ? script.options : script;
      // render functions
      if (template && template.render) {
          options.render = template.render;
          options.staticRenderFns = template.staticRenderFns;
          options._compiled = true;
          // functional template
          if (isFunctionalTemplate) {
              options.functional = true;
          }
      }
      // scopedId
      if (scopeId) {
          options._scopeId = scopeId;
      }
      var hook;
      if (moduleIdentifier) {
          // server build
          hook = function (context) {
              // 2.3 injection
              context =
                  context || // cached call
                      (this.$vnode && this.$vnode.ssrContext) || // stateful
                      (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
              // 2.2 with runInNewContext: true
              if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                  context = __VUE_SSR_CONTEXT__;
              }
              // inject component styles
              if (style) {
                  style.call(this, createInjectorSSR(context));
              }
              // register component module identifier for async chunk inference
              if (context && context._registeredComponents) {
                  context._registeredComponents.add(moduleIdentifier);
              }
          };
          // used by ssr in case component is cached and beforeCreate
          // never gets called
          options._ssrRegister = hook;
      }
      else if (style) {
          hook = shadowMode
              ? function (context) {
                  style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
              }
              : function (context) {
                  style.call(this, createInjector(context));
              };
      }
      if (hook) {
          if (options.functional) {
              // register for functional component in vue file
              var originalRender = options.render;
              options.render = function renderWithStyleInjection(h, context) {
                  hook.call(context);
                  return originalRender(h, context);
              };
          }
          else {
              // inject component registration as beforeCreate hook
              var existing = options.beforeCreate;
              options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
          }
      }
      return script;
  }

  var isOldIE = typeof navigator !== 'undefined' &&
      /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
  function createInjector(context) {
      return function (id, style) { return addStyle(id, style); };
  }
  var HEAD;
  var styles = {};
  function addStyle(id, css) {
      var group = isOldIE ? css.media || 'default' : id;
      var style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
      if (!style.ids.has(id)) {
          style.ids.add(id);
          var code = css.source;
          if (css.map) {
              // https://developer.chrome.com/devtools/docs/javascript-debugging
              // this makes source maps inside style tags work properly in Chrome
              code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
              // http://stackoverflow.com/a/26603875
              code +=
                  '\n/*# sourceMappingURL=data:application/json;base64,' +
                      btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                      ' */';
          }
          if (!style.element) {
              style.element = document.createElement('style');
              style.element.type = 'text/css';
              if (css.media)
                  { style.element.setAttribute('media', css.media); }
              if (HEAD === undefined) {
                  HEAD = document.head || document.getElementsByTagName('head')[0];
              }
              HEAD.appendChild(style.element);
          }
          if ('styleSheet' in style.element) {
              style.styles.push(code);
              style.element.styleSheet.cssText = style.styles
                  .filter(Boolean)
                  .join('\n');
          }
          else {
              var index = style.ids.size - 1;
              var textNode = document.createTextNode(code);
              var nodes = style.element.childNodes;
              if (nodes[index])
                  { style.element.removeChild(nodes[index]); }
              if (nodes.length)
                  { style.element.insertBefore(textNode, nodes[index]); }
              else
                  { style.element.appendChild(textNode); }
          }
      }
  }

  /* script */
  var __vue_script__ = script;

  /* template */
  var __vue_render__ = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "div",
      { staticClass: "OverlayBadge" },
      [
        _c(
          "div",
          {
            staticClass: "float",
            class: _vm.position,
            style: _vm.styles,
            on: {
              click: function($event) {
                _vm.onClick ? _vm.onClick() : function() {};
              }
            }
          },
          [
            _vm._t("float", [
              _vm._v(_vm._s(Number(_vm.count) < 1000 ? _vm.count : "1k+"))
            ])
          ],
          2
        ),
        _vm._v(" "),
        _vm._t("default", [_c("div")])
      ],
      2
    )
  };
  var __vue_staticRenderFns__ = [];
  __vue_render__._withStripped = true;

    /* style */
    var __vue_inject_styles__ = function (inject) {
      if (!inject) { return }
      inject("data-v-08c27615_0", { source: "\n.OverlayBadge[data-v-08c27615] {\n  position: relative;\n  width: fit-content;\n  height: fit-content;\n  display: inline-block;\n}\n.float[data-v-08c27615] {\n  min-width: 1.5em;\n  text-align: center;\n  position: absolute;\n  z-index: 1000;\n  font-size: 0.7em;\n  font-weight: 700;\n  border-radius: 50%;\n}\n.top-right[data-v-08c27615] {\n  top: 0;\n  right: 0;\n  margin-top: -8px;\n  margin-right: -8px;\n}\n.bottom-right[data-v-08c27615] {\n  bottom: 0;\n  right: 0;\n  margin-bottom: -8px;\n  margin-right: -8px;\n}\n.top-left[data-v-08c27615] {\n  top: 0;\n  left: 0;\n  margin-top: -8px;\n  margin-right: -8px;\n}\n.bottom-left[data-v-08c27615] {\n  bottom: 0;\n  left: 0;\n  margin-top: -8px;\n  margin-right: -8px;\n}\n", map: {"version":3,"sources":["/home/node09/proj/cosmic/src/overlay-badge.vue"],"names":[],"mappings":";AAgEA;EACA,kBAAA;EACA,kBAAA;EACA,mBAAA;EACA,qBAAA;AACA;AACA;EACA,gBAAA;EACA,kBAAA;EACA,kBAAA;EACA,aAAA;EACA,gBAAA;EACA,gBAAA;EACA,kBAAA;AACA;AACA;EACA,MAAA;EACA,QAAA;EACA,gBAAA;EACA,kBAAA;AACA;AACA;EACA,SAAA;EACA,QAAA;EACA,mBAAA;EACA,kBAAA;AACA;AACA;EACA,MAAA;EACA,OAAA;EACA,gBAAA;EACA,kBAAA;AACA;AACA;EACA,SAAA;EACA,OAAA;EACA,gBAAA;EACA,kBAAA;AACA","file":"overlay-badge.vue","sourcesContent":["<template>\n  <div class=\"OverlayBadge\">\n    <div class=\"float\" :class=\"position\" :style=\"styles\" @click=\"onClick ? onClick() : () => {}\">\n      <slot name=\"float\">{{ (Number(count) < 1000) ? count : '1k+' }}</slot>\n    </div>\n    <slot>\n      <div></div>\n    </slot>\n  </div>\n</template>\n\n<script>\nexport default {\n  name: \"overlay-badge\",\n  props: {\n    type: String,\n    count: {\n      type: [Number, String],\n      default: 0\n    },\n    position: {\n      type: String,\n      default: \"top-right\"\n      // 'top-right', 'bottom-right', 'top-left', 'bottom-left'\n    },\n    onClick: {\n      type: Function,\n      default: undefined\n    }\n  },\n  computed: {\n    styles() {\n      let style = \"\";\n      switch (this.type) {\n        case \"primary\":\n          style = \"background-color: #007bff; color: white;\";\n          break;\n        case \"secondary\":\n          style = \"background-color: #6c757d; color: white;\";\n          break;\n        case \"success\":\n          style = \"background-color: #28a745; color: white;\";\n          break;\n        case \"info\":\n          style = \"background-color: #17a2b8; color: white;\";\n          break;\n        case \"warning\":\n          style = \"background-color: #ffc107; color: black;\";\n          break;\n        case \"danger\":\n          style = \"background-color: #dc3545; color: white;\";\n          break;\n        default:\n          style = \"background-color: #007bff; color: white;\";\n      }\n      if (this.onClick) style += ` cursor: pointer;`;\n      else style += ` cursor: default;`;\n      return style;\n    }\n  }\n};\n</script>\n\n<style scoped>\n.OverlayBadge {\n  position: relative;\n  width: fit-content;\n  height: fit-content;\n  display: inline-block;\n}\n.float {\n  min-width: 1.5em;\n  text-align: center;\n  position: absolute;\n  z-index: 1000;\n  font-size: 0.7em;\n  font-weight: 700;\n  border-radius: 50%;\n}\n.top-right {\n  top: 0;\n  right: 0;\n  margin-top: -8px;\n  margin-right: -8px;\n}\n.bottom-right {\n  bottom: 0;\n  right: 0;\n  margin-bottom: -8px;\n  margin-right: -8px;\n}\n.top-left {\n  top: 0;\n  left: 0;\n  margin-top: -8px;\n  margin-right: -8px;\n}\n.bottom-left {\n  bottom: 0;\n  left: 0;\n  margin-top: -8px;\n  margin-right: -8px;\n}\n</style>\n"]}, media: undefined });

    };
    /* scoped */
    var __vue_scope_id__ = "data-v-08c27615";
    /* module identifier */
    var __vue_module_identifier__ = undefined;
    /* functional template */
    var __vue_is_functional_template__ = false;
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    var __vue_component__ = normalizeComponent(
      { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
      __vue_inject_styles__,
      __vue_script__,
      __vue_scope_id__,
      __vue_is_functional_template__,
      __vue_module_identifier__,
      false,
      createInjector,
      undefined,
      undefined
    );

  // Import vue component

  // Declare install function executed by Vue.use()
  function install(Vue) {
  	if (install.installed) { return; }
  	install.installed = true;
  	Vue.component('OverlayBadge', __vue_component__);
  }

  // Create module definition for Vue.use()
  var plugin = {
  	install: install,
  };

  // Auto-install when vue is found (eg. in browser via <script> tag)
  var GlobalVue = null;
  if (typeof window !== 'undefined') {
  	GlobalVue = window.Vue;
  } else if (typeof global !== 'undefined') {
  	GlobalVue = global.Vue;
  }
  if (GlobalVue) {
  	GlobalVue.use(plugin);
  }

  exports.default = __vue_component__;
  exports.install = install;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
