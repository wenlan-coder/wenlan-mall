<template>
  <div id="home-carousel">
    <el-carousel trigger="click" height="213.81px" arrow="always">
      <el-carousel-item v-for="(item, index) in banners" :key="index">
        <a :href="item.link" >
          <img :src="item.image" alt="" @load="carouselImg"/>
        </a>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  props: {
    banners: {
      type: Array,
      default: [],
    },
  },
  methods:{
    carouselImg(){
      this.$emit('carouselimg')

    }
  }
};
</script>

<style>
/* #home-carousel {
 padding-top:48px ;
} */
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #9381ff;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #9381ff;
}
#home-carousel img {
  width: 100%;
}
</style>