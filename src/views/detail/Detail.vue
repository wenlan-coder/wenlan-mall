<template>
<div id="detail">
    <detail-nav-bar class="detail-nav"></detail-nav-bar>
    <!-- 加载图片后计算高度，初始化滚动失败， -->
      <scroll class="wrapper"  ref="scroll">  
      <detail-swiper :top-img="topImg">npm</detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-image-info :detail-info="detailInfo"></detail-image-info>
      <detail-item-params :detail-params="itemParams"></detail-item-params>
      <detail-info-comment :comment="commentInfo"></detail-info-comment>
      <goods-list :goods="recommends"></goods-list>
      </scroll>
</div>
</template>
<script>
import DetailNavBar from './childComps/DetailNavBar.vue'
import DetailSwiper from './childComps/DetailSwiper.vue'
import {getDetail,Goods,Shop,getRecommend} from 'network/detail'
import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
import DetailShopInfo from './childComps/DetailShopInfo'
import Scroll from 'components/common/scroll/Scroll'
import DetailImageInfo from './childComps/DetailImageInfo.vue'
import DetailItemParams from './childComps/DetailItemParams.vue'
import DetailInfoComment from './childComps/DetailInfoComment.vue'
import GoodsList from 'components/content/goods/GoodsList.vue'
export default {
    name:'Detail',  //使用keep-alive必须加name
    components:{
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        Scroll,
        DetailImageInfo,
        DetailItemParams,
        DetailInfoComment,
        GoodsList

    },
    data(){
       return{
            iid:null,
            topImg:null,
            goods:{},
            shop:{},
            detailInfo:{},
            itemParams:{},
            commentInfo:{},
            recommends:[]
        }
    },
    created(){
        // console.log("created");
        //保存商品id
        this.iid=this.$route.params.iid;
        // console.log('created')        
        //请求商品图片
        getDetail(this.iid).then(res=>{
            const data =res.result
            this.topImg = res.result.itemInfo.topImages;
            // console.log(res.result);
            //获取商品数据
            this.goods =new Goods(data.itemInfo,data.columns,data.shopInfo.services);
            //请求店铺信息
            this.shop = new Shop(data.shopInfo);
            // console.log(this.shop);
            //取出商品详情信息
            this.detailInfo=data.detailInfo;
            //取出参数信息
            this.itemParams=data.itemParams;
            //取出评论信息
            // console.log(data.rate);
            if(data.rate.cRate!==0){
            
            this.commentInfo=data.rate.list[0];
            // console.log(this.commentInfo);
            }
            }),
        getRecommend().then(res=>{
            // console.log(res);
            // console.log(res.data.list);
            this.recommends =res.data.list;
        })
    },
    mounted(){
        //监听图片刷新
    this.$bus.$on("imageLoad",()=>{
    console.log("detail里面组件监听");
    this.$refs.scroll.refresh();   //重新计算高度
     })
    //  this.$bus.$on("detailImgLoad",()=>{
    // console.log("detailImgload里面组件监听");
    // this.$refs.scroll.refresh();   //重新计算高度
    //  })
    }
    // updated(){
    //      this.$refs.scroll.refresh();   //重新计算高度
    // }
}
</script>

<style scoped>
#detail{
    position: relative;
    z-index: 9;
    background-color:#fff;
    height: 100vh;
}
.wrapper{
  height: calc( 100% - 48px );
  overflow: hidden;

}
.detail-nav{
    z-index: 99;
    position:relative;
    background-color:#fff ;
}
</style>