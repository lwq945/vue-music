<template>
  <div id="app">
    <home-header></home-header>
    <home-tab></home-tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <player></player>
  </div>
</template>

<script>
import HomeHeader from 'components/home-header/home-header.vue'
import HomeTab from 'components/home-tab/home-tab.vue'
import Player from 'components/player/player.vue'
export default {
  name: 'App',
  components: {
    HomeHeader,
    HomeTab,
    Player
  }
}
</script>

<style lang="stylus" scoped>
</style>