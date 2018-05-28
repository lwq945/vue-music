<template>
  <div id="app">
    <home-header></home-header>
    <home-tab></home-tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import HomeHeader from 'components/home-header/home-header.vue'
import HomeTab from 'components/home-tab/home-tab.vue'
export default {
  name: 'App',
  components: {
    HomeHeader,
    HomeTab
  }
}
</script>

<style lang="stylus" scoped>

</style>