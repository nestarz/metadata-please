<template>
  <form class="popup" @submit.prevent="submit(mode, git, download)">
    <header>
      {{ title }}
      <button type="button" @click="clear">Clear cache</button>
    </header>
    <label>Project</label>
    <select v-model="config.project" required>
      <option v-for="project in projects" :key="project">{{ project }}</option>
    </select>
    <label>Category</label>
    <select v-model="config.category" required>
      <option v-for="category in categories" :key="category">{{ category }}</option>
    </select>
    <label>URL</label>
    <input type="text" v-model="config.url" placeholder="https://eliasrhouzlane.com/" required />
    <label>Title</label>
    <input type="text" v-model="config.title" placeholder="eliaspourquoi" required />
    <label>Author</label>
    <input type="text" v-model="config.author" placeholder="Elias Rhouzlane" />
    <label>Alias</label>
    <input type="text" v-model="config.alias" placeholder="Billy the kid" />
    <label>City</label>
    <suggest
      :list="cities"
      v-model="config.location.city"
      :filter-by-query="true"
      placeholder="Eindhoven"
    ></suggest>
    <label>Country</label>
    <suggest
      :list="countries"
      v-model="config.location.country"
      :filter-by-query="true"
      placeholder="NL"
    ></suggest>
    <label>Organization</label>
    <input type="text" v-model="config.organization" placeholder="Design Academy Eindhoven" />
    <label>Description</label>
    <textarea required v-model="config.description" placeholder="It was a dark and stormy night..."></textarea>
    <label for="tags">
      Tags
      <div v-for="tag in config.tags" :key="tag">{{ tag }}</div>
    </label>
    <select multiple id="tags" size="9" required v-model="config.tags">
      <option v-for="tag in tags" :key="tag">{{ tag }}</option>
    </select>
    <label for="interest">Interest</label>
    <input type="range" id="interest" min="0" max="10" v-model="config.interest" required />
    <button type="submit" @click="mode = 'save'">Save</button>
    <button type="submit" @click="mode = 'copy'">Copy</button>
    <a
      ref="git"
      :href="`https://github.com/nestarz/soi/new/master/content/${config.category}`"
      target="_blank"
    />
    <a
      ref="download"
      :href="`data:text/x-yaml;charset=utf-8,${encodeURIComponent(yaml)}`"
      :download="`${config.slug}.yml`"
    />
  </form>
</template>

<script>
const slugify = text =>
  text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text

const removeEmpty = obj =>
  Object.entries(obj).reduce(
    (a, [k, v]) => (v || v === 0 ? { ...a, [k]: v } : a),
    {}
  );

const browser = window.browser || window.chrome;

module.exports = {
  setup() {
    const projects = ref([]);
    const categories = ref([]);
    const tags = ref([]);
    const cities = ref([]);
    const countries = ref([]);
    fetch("/assets/json/options.json")
      .then(response => response.json())
      .then(json => {
        projects.value = json.projects;
        categories.value = json.categories;
        tags.value = json.tags;
      });
    fetch("/assets/json/cities10000.json")
      .then(response => response.json())
      .then(json => {
        cities.value = json.map(city => city.name);
        countries.value = [...new Set(json.map(city => city.country))];
      });

    const config = reactive({
      date: new Date().toISOString(),
      project: "",
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
    browser.tabs
      .executeScript({
        file: "/src/inject/page-metadata-parser.bundle.js"
      })
      .then(async () => {
        const [metadata] = await browser.tabs.executeScript({
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
      });
    watch(() => (localStorage[config.url] = JSON.stringify(config)));
    const yaml = ref("");
    return {
      title: "Metadata, Please",
      projects,
      categories,
      tags,
      cities,
      countries,
      config,
      yaml,
      mode: ref(null),
      git: ref(null),
      download: ref(null),
      submit: (mode, git, download) => {
        const save = { ...config };
        save.location = removeEmpty(save.location);
        if (Object.keys(save.location).length === 0) save.location = null;
        yaml.value = YAML.stringify(removeEmpty(save));
        if (mode === "copy") {
          alert(`Copy this into your clip-board!\n\n${yaml.value}`);
          git.click();
        } else if (mode === "save") {
          download.click();
        }
      },
      clear: () => {
        localStorage.clear();
        window.location.reload(true);
      }
    };
  }
};
</script>

<style>
* {
  border: none;
}

ul,
li {
  margin: 0;
  padding: 0;
  list-style: none;
}

ul {
  margin-top: 5px;
}

.popup,
select {
  color: #737373;
}

.popup {
  width: 250px;
  display: grid;
  grid-template-columns: 0.4fr 1fr;
  grid-gap: 5px;
}

header {
  grid-column: span 2;
  display: flex;
  justify-content: space-between;
}

textarea {
  padding: 0;
  border: 0;
  resize: none;
  height: 50px;
  font-family: system-ui, sans-serif;
  font-size: 100%;
  color: inherit;
}

input {
  width: 100%;
}

a {
  display: none;
}
</style>