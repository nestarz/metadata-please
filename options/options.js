import "/web_modules/chrome-extension-async.js";

import Vue from "/web_modules/vue/dist/vue.esm.browser.min.js";
import VueCompositionApi from "/web_modules/@vue/composition-api.js";
import httpVueLoader from "/web_modules/http-vue-loader/src/httpVueLoader.js";

Vue.use(VueCompositionApi);

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
  components: { options: httpVueLoader("/options/Options.vue") },
  template: "<options></options>"
}).$mount("#app");
