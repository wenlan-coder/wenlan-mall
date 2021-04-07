<template>
<div id="detail">
    <detail-nav-bar class="detail-nav"></detail-nav-bar>
      <scroll class="content">
      <detail-swiper :topImg="topImg">npm</detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      </scroll>
    
</div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar.vue'
import DetailSwiper from './childComps/DetailSwiper.vue'
import {getDetail,Goods,Shop} from 'network/detail'
import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
import DetailShopInfo from './childComps/DetailShopInfo'
import Scroll from 'components/common/scroll/Scroll'
export default {
    name:'Detail',  //使用keep-alive必须加name
    components:{
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        Scroll,

     

    },
    data(){
       return{
            iid:null,
            topImg:null,
            goods:{},
            shop:{},
        }
    },
    created(){
        //保存商品id
        this.iid=this.$route.params.iid;
        // console.log('created')
        
        //请求商品图片
        getDetail(this.iid).then(res=>{
            const data =res.result
            this.topImg = res.result.itemInfo.topImages
            // console.log(res.result);
            //获取商品数据
            this.goods =new Goods(data.itemInfo,data.columns,data.shopInfo.services)
            //请求店铺信息
            this.shop = new Shop(data.shopInfo)
            // console.log(this.shop);
        })

    

    }

}
</script>

<style scoped>

#detail{
    position: relative;
    z-index: 9;
    background-color:#fff;
    height: 100vh;
}
.content{
  position:relative;
  bottom:49px ;
  right: 0;
  left: 0;
  overflow: hidden;

}
.detail-nav{
    z-index: 99;
    position:relative;
    background-color:#fff ;
}
</style>