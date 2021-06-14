<template>
<div id="detail">
    <detail-nav-bar class="detail-nav" @titleCli="titleCli" ref="detailnav"></detail-nav-bar>
    <!-- 加载图片后计算高度，初始化滚动失败， -->
      <scroll class="wrapper"  ref="scroll"  :probe-type="3"  @scroll="contentPosition">  
      <detail-swiper :top-img="topImg">npm</detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-image-info :detail-info="detailInfo"></detail-image-info>
      <detail-item-params :detail-params="itemParams" ref="params"></detail-item-params>
      <detail-info-comment :comment="commentInfo" ref="comments"></detail-info-comment>
      <goods-list :goods="recommends" ref="recommends"></goods-list>
      </scroll>
      <detail-bottom-bar @add-car="addCar"></detail-bottom-bar>
      <back-top @click.native="backtop" v-show="isShowBackTop"></back-top>
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
import DetailBottomBar from "./childComps/DetailBottomBar.vue"
 import {backTopMixin} from 'common/mixin.js'
import {debounce} from 'common/utils.js'
// import BackTop from 'components/content/backTop/BackTop'

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
        GoodsList,
        DetailBottomBar,
    },
    mixins:[backTopMixin],
    data(){
       return{
            iid:null,
            topImg:null,
            goods:{},
            shop:{},
            detailInfo:{},
            itemParams:{},
            commentInfo:{},
            recommends:[],
            detailImgListener:null,
            itemPoy:[], //navbar滚动位置
            slider:null,
            currentIndex:0,
            isShowBackTop:false,
        }
    },
    // mixins:[itemMixin],这里不使用混入，全局谨慎使用
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
        this.slider=debounce(()=>{
        
        this.itemPoy=[];
        this.itemPoy.push(0);
        this.itemPoy.push(this.$refs.params.$el.offsetTop);
        this.itemPoy.push(this.$refs.comments.$el.offsetTop);
        this.itemPoy.push(this.$refs.recommends.$el.offsetTop);
        this.itemPoy.push(Number.MAX_VALUE)
        console.log(this.itemPoy);
        },20)
    },
    mounted(){

         //获取itempoY值
      
        //监听图片刷新detailimginfo组件
    this.$bus.$on("imageLoad",()=>{
    // console.log("detail里面组件监听");
    this.$refs.scroll.refresh();   //重新计算高度
    this.slider();
    
     })
     this.detailImgListener=()=>{
    //  console.log("detailImgload里面组件监听");
      this.$refs.scroll.refresh();   //重新计算高度
     }
     //googlist里面监听
     this.$bus.$on("ImgLoad",this.detailImgListener)
},
    destroyed(){
    console.log("销毁了");
    this.$bus.$off("ImgLoad",this.detailImgListener)
    },
    updated(){
       
    },
    methods:{
        titleCli(index) {
        console.log(index);
        this.$refs.scroll.scrollTo(0,-this.itemPoy[index]+48,200)
        
        },
        contentPosition(position){
           
            const positionY =-position.y
            let length=this.itemPoy.length;
            // console.log(Number.MAX_VALUE);  //hack通过给数组增加一个元素，简化判断代码，空间换时间
            // console.log(positionY);
            for(let i=0;i<length-1;i++){
                if(this.currentIndex!==i&&(positionY>=this.itemPoy[i]&&positionY<this.itemPoy[i+1])){
                   this.currentIndex=i;
                   console.log(this.currentIndex);
                   this.$refs.detailnav.currentIndex=this.currentIndex;
                }
        }
         //计算是否显示回答顶部
            this.listenBackTopPoy(position);
    },
    //添加购物车
    addCar(){
        //获取购物车展示的信息
        const product={};
        product.image=this.topImg[0];
        product.title=this.goods.title;
        product.desc=this.goods.desc;
        product.price=this.goods.realPrice;
        product.iid=this.iid;
        //将商品添加到购物车
        this.$store.dispatch("addCart",product)
        
        
    }
   
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
.wrapper{
  height: calc( 100% - 97px);
  overflow: hidden;

}
.detail-nav{
    z-index: 99;
    position:relative;
    background-color:#fff ;
}
</style>