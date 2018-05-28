<template>
  <div class="wrapper">
    <swiper :options="swiperOption" v-if="lists.length">
      <swiper-slide v-for="item in lists" :key="item.id">
        <a :href="item.linkUrl">
          <img class="swiper-img" :src="item.picUrl">
        </a>
      </swiper-slide>
      <div class="swiper-pagination"  slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
export default {
  name: 'baseSlider',
  props: {
    lists: Array
  },
  data() {
    return {
      swiperOption: {
        autoplay: 5000,
        loop: true,
        pagination: '.swiper-pagination'
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .wrapper >>> .swiper-pagination-bullet
    width: 6px
    height: 6px
    background: rgba(144,144,144,.8)
    opacity: 1
  .wrapper >>> .swiper-pagination-bullet-active
    width: 10px
    border-radius: 3px
    background: #fff
  .wrapper
    width: 100%
    height: 0
    padding-bottom: 40%
    overflow: hidden
    .swiper-img
      display: block
      width: 100%;
</style>
