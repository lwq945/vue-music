<template>
  <div id="app">
    <m-header></m-header>
    <m-tab></m-tab>
    <router-view></router-view>
  </div>
</template>

<script>
import MHeader from 'components/m-header/m-header.vue'
import MTab from 'components/tab/tab.vue'
export default {
  name: 'App',
  components: {
    MHeader,
    MTab
  }
}
</script>

<style lang="stylus" scoped>

</style>