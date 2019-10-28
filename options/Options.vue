<template>
  <form @submit.prevent="submit">
    <div class="content">
      <label>Commit Folder URL</label>
      <input type="text" v-model="options.commitUrl" class="one" />
      <template v-for="[key, value] in lists">
        <label :key="key">{{key}}</label>
        <li v-for="(item, item_index) in value" :key="item">
          <span>{{item}}</span>
          <a href="#" @click="remove(key, item_index)">x</a>
        </li>
        <div class="add" :key="key">
          <input type="text" :id="`input-${key}`" />
          <button @click="add(key)">Add</button>
        </div>
      </template>
    </div>
    <button type="submit">Save</button>
    <button type="button" @click="reset">Reset</button>
    <a
      :href="`data:application/json;charset=utf-8,${encodeURIComponent(JSON.stringify(options))}`"
      :download="`options.json`"
    >Download</a>
  </form>
</template>

<script>
module.exports = {
  setup() {
    const options = ref({});
    fetch("/assets/json/options.json")
      .then(response => response.json())
      .then(async data => {
        options.value = data;
        const { options: cache } = await browser.storage.sync.get("options");
        console.log(cache);
        options.value = cache || options.value;
      });
    const input = ref([]);
    return {
      input,
      options,
      lists: computed(() =>
        Object.entries(options.value).filter(([key, value]) =>
          Array.isArray(value)
        )
      ),
      reset: () => {
        fetch("/assets/json/options.json")
          .then(response => response.json())
          .then(data => (options.value = data));
      },
      submit: () => {
        browser.storage.sync.set({
          options: options.value
        });
      },
      remove: (key, index) => {
        options.value[key] = options.value[key].filter((v, i) => i !== index);
      },
      add: key => {
        const item = document.querySelector(`#input-${key}`);
        options.value[key].push(item.value);
      }
    };
  }
};
</script>

<style>
form .content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1em;
  overflow: scroll;
  max-height: 400px;
}

button[type="submit"],
label {
  grid-column: span 2;
  font-weight: bold;
  margin-top: 1em;
  text-transform: capitalize;
}

li {
  list-style: none;
  color: #737373;
  display: flex;
  justify-content: space-between;
}

li a {
  visibility: hidden;
}

li:hover a {
  visibility: visible;
}

.add {
  grid-column: span 2;
  grid-gap: 5px;
  display: grid;
  grid-template-columns: 1fr 0.2fr;
}

.one {
  grid-column: span 2;
}
</style>