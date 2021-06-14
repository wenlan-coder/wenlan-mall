<template>
  <div class="goods-list-item" @click="clickDetail">
    <img :src="resImage" alt="" @load="imgLoad">
    <div class="goods-info">
      <p>{{ goodsItem.title }}</p>
      <span class="price">{{ goodsItem.price }}</span>
      <span class="collect">{{ goodsItem.cfav }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    goodsItem: {
      type: Object,
      default: {},
    },
  },
  computed:{
    resImage(){
      return this.goodsItem.image ||this.goodsItem.show.img;
    }
  },
  data(){
    return {
      iid:null,

    }
  },
    methods:{
    imgLoad(){
     
      // if(this.$route.path.indexOf('/home')){
      //   this.$bus.$emit('homeImgLoad')}
      //   else if(this.$route.path.indexOf('/detail')){
      //     this.$bus.$emit('detailImgLoad') 
      //   }
       this.$bus.$emit("ImgLoad")
      },
    clickDetail(){
    this.$router.push({
      name:'detail',
      params:{
        iid:this.goodsItem.iid,
}
    })
    },
  }
}
</script>
<style>
.goods-list-item {
  position: relative;
  width: 48%;
  padding: 5px;
  padding-bottom: 40px;
}
.goods-list-item img {
  width: 100%;
  border-radius: 5px;
}
.goods-info {
  font-size: 14px;
  position: absolute;

  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}
.goods-info p {
  margin-bottom: 3px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.goods-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}
.goods-info .collect {
  position: relative;
}
.goods-info .collect::before {
  content: "";
  position: absolute;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0px 0/14px 14px;
  left:-15px;
}
</style>