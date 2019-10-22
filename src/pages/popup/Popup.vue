<template>
  <div class="container">
    <div class="header">
      <div class="title">
        <span>Metadata, Please</span>
      </div>
      <div class="options">
        <div role="button" title="Menu" class="open-options jfk-button-flat" tabindex="0">
          <div class="img-settings button-right"></div>
        </div>
        <div class="menu-options" tabindex="0">
          <ul>
            <li class="open-settings" @click="openSettings">Open settings</li>
            <li class="refresh" @click="refresh">Clear Cache</li>
          </ul>
        </div>
      </div>
    </div>
    <form class="detail-container" @submit.prevent="save">
      <div class="input">
        <label for="categories">Category</label>
        <select id="categories" required v-model="config.category">
          <option value disabled selected>Select a category</option>
          <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
        </select>
      </div>
      <div class="input">
        <label for="url">URL</label>
        <input
          id="url"
          name="url"
          type="text"
          required
          v-model="config.url"
          placeholder="http://localhost:5000/#/documentation?"
        />
      </div>
      <div class="input">
        <label for="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          required
          placeholder="Infrastructure"
          v-model="config.title"
        />
      </div>
      <div class="input">
        <label for="author">Author</label>
        <input
          id="author"
          name="author"
          type="text"
          required
          placeholder="Elias Rhouzlane"
          v-model="config.author"
        />
      </div>
      <div class="input">
        <label for="alias">Alias</label>
        <input
          id="alias"
          name="alias"
          type="text"
          placeholder="Billy the Kid"
          v-model="config.alias"
        />
      </div>
      <fieldset>
        <legend>Location</legend>
        <div class="content">
          <earth @coord="setCoord"></earth>
          <div class="location">
            <div class="input">
              <label for="city">City</label>
              <input
                id="city"
                name="city"
                type="text"
                placeholder="Eindhoven"
                v-model="config.location.city"
              />
            </div>
            <div class="input">
              <label for="name">Country</label>
              <input
                id="country"
                name="country"
                type="text"
                pattern="[a-zA-Z]{2}"
                placeholder="NL (ISO 3166-1 alpha-2)"
                v-model="config.location.country"
              />
            </div>
            <div class="input">
              <label for="name">Longitude</label>
              <input
                id="coord"
                name="coord"
                type="text"
                placeholder="5.709"
                v-model="config.location.longitude"
              />
            </div>
            <div class="input">
              <label for="name">Latitude</label>
              <input
                id="coord"
                name="coord"
                type="text"
                placeholder="51.395"
                v-model="config.location.latitude"
              />
            </div>
          </div>
        </div>
      </fieldset>
      <div class="input">
        <label for="name">Organization</label>
        <input
          id="organization"
          name="organization"
          type="text"
          placeholder="Design Academy Eindhoven"
          v-model="config.organization"
        />
      </div>
      <div>
        <label for="story">Describe</label>
        <textarea
          id="story"
          name="story"
          v-model="config.description"
          required
          placeholder="It was a dark and stormy night..."
        ></textarea>
      </div>
      <div class="tags">
        <label for="tags">Tags {{config.tags}}</label>
        <select multiple id="tags" size="9" required v-model="config.tags">
          <option v-for="tag in tags" :key="tag" :value="tag">{{ tag }}</option>
        </select>
      </div>
      <div class="input">
        <label for="interest">Interest</label>
        <input type="range" id="interest" min="0" max="10" v-model="config.interest" required />
      </div>
      <div class="submit">
        <button type="submit" @click="mode = 'save'">Save</button>
        <button type="submit" @click="mode = 'copy'">Copy</button>
      </div>
      <a class="save" ref="saveElt" :href="yamlBase64" :download="yamlNameFile" v-if="yamlBase64"></a>
      <textarea class="save" ref="copyElt" v-if="yaml" v-model="yaml"></textarea>
      <div v-else>Error</div>
    </form>
  </div>
</template>

<script>
function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
}

const browser = window.browser || window.chrome;

module.exports = {
  components: {
    earth: httpVueLoader("/src/components/earth.vue")
  },
  setup() {
    const openSettings = () => browser.runtime.openOptionsPage();

    const tags = ref([]);
    const categories = ref([]);
    const cities = ref([]);
    let findNearest;
    const fetchAssets = async () => {
      const getJSON = response => response.json();
      categories.value = await fetch("/assets/json/categories.json").then(
        getJSON
      );
      tags.value = (await fetch("/assets/json/tags.json").then(getJSON)).sort();
      cities.value = await fetch("/assets/json/cities10000.json").then(getJSON);
      findNearest = (await import("/web_modules/geolib.js")).default
        .findNearest;
    };

    const config = reactive({
      date: new Date().toISOString(),
      category: "",
      slug: "",
      url: "",
      title: "",
      description: "",
      author: "",
      alias: "",
      organization: "",
      location: {
        city: "",
        country: "",
        longitude: "",
        latitude: ""
      },
      interest: null,
      tags: []
    });
    const getMetadata = async () => {
      await browser.tabs.executeScript({
        file: "/src/inject/page-metadata-parser.bundle.js"
      });
      const [metadata] = await browser.tabs.executeScript(null, {
        code: "metadataparser.getMetadata(window.document, window.location)"
      });

      config.url = metadata.url;
      config.title = metadata.title;
      config.description = metadata.description;
      config.slug = slugify(metadata.title);

      const url = metadata.url;
      if (typeof localStorage[url] === "string") {
        Object.entries(JSON.parse(localStorage[url])).map(([key, value]) => {
          if (typeof config[key] !== undefined) config[key] = value;
        });
      }
    };

    onMounted(() => {
      fetchAssets();
      getMetadata();
    });

    // Misc
    const yamlNameFile = computed(() => `${config.slug}.yml`);
    const yaml = computed(() => {
      localStorage[config.url] = JSON.stringify(config);
      return YAML.stringify(
        Object.entries(config).reduce(
          (a, [k, v]) => (v || v === 0 ? { ...a, [k]: v } : a),
          {}
        )
      );
    });
    const yamlBase64 = computed(
      () => `data:text/x-yaml;charset=utf-8,${encodeURIComponent(yaml.value)}`
    );

    const mode = ref(null);
    const saveElt = ref(null);
    const copyElt = ref(null);
    const save = e => {
      if (mode.value === "copy") {
        copyElt.value.focus();
        copyElt.value.select();
        document.execCommand("copy");
        alert(
          "Config has successfully been copied into your clip-board!\n\n" +
            yaml.value
        );
      } else {
        saveElt.value.click();
      }
    };
    const setCoord = (coord, end) => {
      if (!end) return;
      const [longitude, latitude] = coord.map(x => Math.round(x * 1000) / 1000);
      config.location.longitude = longitude;
      config.location.latitude = latitude;
      if (!cities.value.length || !findNearest) return;
      const nearest = findNearest({ latitude, longitude }, cities.value);
      config.location.city = nearest.name;
      config.location.country = nearest.country;
    };

    return {
      tags,
      categories,
      config,
      yamlBase64,
      yamlNameFile,
      openSettings,
      fetch,
      YAML,
      yaml,
      saveElt,
      copyElt,
      save,
      setCoord,
      mode,
      refresh: () => {
        console.log("clearing cache...");
        localStorage.clear();
        window.location.reload(true);
      }
    };
  }
};
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  min-height: 200px;
  overflow: hidden;
  padding: 0;
  width: 300px;
}
.header {
  padding: 10px;
  height: 22px;
}
.title {
  color: #000;
  float: left;
  opacity: 0.55;
}
.title span {
  padding: 4px 0;
  display: block;
}
.button-right {
  float: right;
}
.open-options.jfk-button-flat {
  border-radius: 0;
  border: 1px solid transparent;
  cursor: pointer;
  font-weight: normal;
  height: 21px;
  line-height: 21px;
  min-width: 0;
  padding: 0;
  outline: none;
}
.img-settings {
  background: transparent url("/assets/images/settings.svg") no-repeat center;
  height: 20px;
  opacity: 0.35;
  overflow: hidden;
  padding-right: 2px;
  width: 22px;
}
.menu-options {
  background-color: #fff;
  border: 1px solid #b8b8b8;
  box-shadow: 0 0 5px #888;
  display: none;
  right: 10px;
  padding: 5px;
  position: absolute;
  top: 40px;
  width: 170px;
  z-index: 100;
}
.options:focus-within .menu-options {
  display: block;
}
.menu-options ul {
  margin: 5px;
  list-style: none;
  padding: 0;
}
.menu-options ul li {
  cursor: pointer;
  font-size: 13px;
  padding: 5px 0 5px 5px;
}
.detail-container {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
}
.detail-container .popup-content {
  height: 300px;
  padding: 25px;
}
.detail-container textarea {
  width: 100%;
  margin: 0;
  margin-top: 5px;
  padding: 0;
  border: 0;
  resize: none;
  height: 40px;
}
.detail-container {
  padding: 0 10px;
}
.detail-container > * {
  margin-bottom: 5px;
}
.detail-container label {
  display: block;
  color: #737373;
}
.detail-container .input {
  display: grid;
  grid-template-columns: min-content 1fr;
  grid-gap: 5px;
}
.detail-container .input > * {
  display: flex;
  justify-content: center;
  align-items: center;
}
.detail-container input {
  width: 100%;
  box-sizing: content-box;
  border: none;
}
.detail-container .input datalist {
  display: none;
}
fieldset {
  border: 1px solid #737373;
}
fieldset .content {
  height: 110px;
}
fieldset .content > div {
  z-index: 999;
  position: absolute;
  left: 3em;
}
fieldset .content > div input {
  width: 75px;
  background: rgb(281, 281, 281, 0.2);
}
fieldset svg {
  position: absolute;
  right: 0;
  z-index: 1;
}
legend {
  color: #737373;
}

.save {
  display: none;
}

.tags select {
  width: 100%;
  margin-top: 5px;
}

.submit {
  display: grid;
  grid-template-columns: 0.5fr 0.5fr;
  grid-gap: 5px;
}
</style>