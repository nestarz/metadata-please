<template>
  <div class="container">
    <div class="field">
      <label>This version does not includes any options. Contact me @eliaspourquoi on instagram if you have ideas.</label>
    </div>
  </div>
</template>

<script>
module.exports = {};
</script>

<style scoped>
.container {
  padding: 0;
  font-family: system-ui, sans-serif;
  font-size: 75%;
}
.field {
  display: block;
  margin: 20px 0;
}
.field:after {
  content: "";
  display: table;
  clear: both;
}
label span {
  cursor: pointer;
  margin-left: 5px;
}
.text {
  margin-left: 8px;
  margin-right: 4px;
  width: 50%;
  border-radius: 3px;
  border: 1px solid #bbb;
  padding: 5px;
}
.half {
  width: 50%;
  position: relative;
  display: block;
  min-height: 30px;
  float: left;
}
.response {
  display: none;
  margin-top: 6px;
}
.success,
.error {
  display: block;
}
.success {
  color: green;
}
.error {
  color: red;
}
.save-options {
  float: right;
  padding: 4px 14px;
}
.save-options:hover {
  cursor: pointer;
}
</style>