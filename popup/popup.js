import "/web_modules/chrome-extension-async.js";
import "/web_modules/yamljs/dist/yaml.min.js";

import Vue from "/web_modules/vue/dist/vue.esm.browser.min.js";
import VueCompositionApi from "/web_modules/@vue/composition-api.js";
import httpVueLoader from "/web_modules/http-vue-loader/src/httpVueLoader.js";
import VueSimpleSuggest from "/web_modules/vue-simple-suggest.js";

Vue.use(VueCompositionApi);
Vue.component("suggest", VueSimpleSuggest);

import {
  reactive,
  computed,
  watch,
  onMounted,
  ref
} from "/web_modules/@vue/composition-api.js";

const composition = { ref, reactive, computed, watch, onMounted };
Object.entries(composition).forEach(([name, api]) => {
  window[name] = api;
});

window.browser = window.browser || window.chrome;

new Vue({
  components: { popup: httpVueLoader("/popup/Popup.vue") },
  template: "<popup></popup>"
}).$mount("#app");