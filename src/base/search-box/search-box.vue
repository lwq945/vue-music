<template>
  <div class="search-box">
    <i class="icon-search"></i>
    <input type="text" class="box" v-model="queryWord" :placeholder="placeholder">
    <i class="icon-dismiss" v-show="queryWord" @click="clear"></i>
  </div>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: '搜索歌曲、歌手'
    }
  },
  data() {
    return {
      queryWord: ''
    }
  },
  created() {
    this.$watch('query', (newquery) => {
      this.$emit('query', newquery)
    })
  },
  methods: {
    clear() {
      this.queryWord = ''
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"

  .search-box
    display: flex
    align-items: center
    width: 100%
    height: 40px
    padding: 0 6px
    box-sizing: border-box
    background: $color-highlight-background
    border-radius: 6px
    .icon-search
      font-size: 24px
      color: $color-background
    .box
      flex: 1
      margin: 0 5px
      line-height: 18px
      background: $color-highlight-background
      color: $color-text
      font-size: $font-size-medium
      outline: none
      &::placeholder
        color: $color-text-d
    .icon-dismiss
      font-size: 16px
      color: $color-background
</style>