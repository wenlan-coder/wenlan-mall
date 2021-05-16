<template>
  <div v-if="Object.keys(detailInfo) !== 0" class="shop-info">
    <div class="shop-desc">
      <div class="start"></div>
      <div class="desc">{{ detailInfo.desc}}</div>
      <div class="end"></div>
    </div>
    <div class="info-key">{{detailInfo.detailImage[0].key}}</div>
    <div class="info-list">
      <img
        v-for="(item, index) in detailInfo.detailImage[0].list"
        :key="index"
        :src="item"
        @load="imgLoad"
        alt=""
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
      return{
          counter:0,  //加载个数
          imageLength:0,
        

      }
  },
  props: {
    detailInfo: {
      type: Object,
      default(){
          return{}
      }
      
    },
  },
  methods:{
      imgLoad(){
          if(++this.counter===this.imageLength){
            console.log("imageinfo组件里面图片监听准备发送");
              this.$bus.$emit("imageLoad")
          }
      },
    
  },
  watch:{  //监听图片加载数量
          detailInfo(){
            this.$nextTick(()=>{
               this.imageLength=this.detailInfo.detailImage[0].list.length;
      

            })
             
          },
        immediate:true,

     }
};
  
</script>

<style scoped>
.shop-info{
  padding:20px 0;
  border-bottom: 5px solid #f2f5f8;

}
.shop-desc{
  padding: 0 15px;
  
}
.desc{
  padding: 15px 0;
  font-size: 18px;
}
.shop-desc .start::before, .shop-desc .end::after{
  content:'';
  position: absolute;
  width: 5px;
  height: 5px;
  bottom: 0;
  background-color:blue;
}
.shop-desc .start, .shop-desc .end{
  width: 90px;
  height: 1px;
  border-radius: 15px;
  background-color:blue ;
  position: relative;
}
.shop-desc .start{
  float: left;
}
.shop-desc .end{
  float: right;
}
.shop-desc .end::after{
  right: 0;
}
.info-key{
  padding: 20px;
  color: blue;
}
.info-list img{
  width: 100%;
  margin: 5px 0;
}




</style>>

