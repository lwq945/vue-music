<template>
  <base-scroll class="listview" :data="data">
    <ul>
      <li class="list-group" v-for="group in data" :key="group.title" :ref="group.title">
        <h2 class="list-group-title">{{ group.title }}</h2>
        <ul>
          <li class="list-group-item"
            v-for="item in group.items"
            :key="item.id"
            @click="selectItem(item)"
          >
            <img class="avatar" v-lazy="item.avatar">
            <span class="name">{{ item.name }}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div v-show="!data.length" class="loading-container">
      <base-loading></base-loading>
    </div>
  </base-scroll>
</template>

<script>
import BaseScroll from 'base/scroll/scroll'
import BaseLoading from 'base/loading/loading'
export default {
  props: {
    data: {
      type: Array
    }
  },
  data() {
    return {
      currentIndex: 0
    }
  },
  methods: {
    selectItem(item) {
      this.$emit('selectSinger', item)
    }
  },
  components: {
    BaseScroll,
    BaseLoading
  }
}
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"

  .listview
    position: relative
    width: 100%
    height: 100%
    overflow: hidden
    background: $color-background
    .list-group
      padding-bottom: 30px
      .list-group-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
      .list-group-item
        display: flex
        align-items: center
        padding: 20px 0 0 30px
        .avatar
          width: 50px
          height: 50px
          border-radius: 50%
        .name
          margin-left: 20px
          color: $color-text-l
          font-size: $font-size-medium
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
