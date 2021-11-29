<template>
  <div class="container">
    <the-header></the-header>
    <div class="wrapper">
      <the-filter></the-filter>
      <the-content></the-content>
    </div>
  </div>
</template>

<script>

import TheHeader from './TheHeader.vue'
import TheFilter from './TheFilter.vue'
import TheContent from './TheContent.vue'

export default {
  name: "AppMain",
  components: {TheHeader, TheFilter, TheContent},
  data() {},
};
</script>

<style lang="scss">
.wrapper {
  display: flex;
}
* {
  margin: 0;
  padding: 0;
}
body {
  background: #f1fcff;
}
.container {
  padding: 0 130px 0 130px;
}
</style>
