<template>
  <div id="home">
    <nav-bar class="home-nav-bar">
      <div slot="center">WENLAN-MAll</div>
    </nav-bar>
    <tab-bar-control
    v-show="isTop"
    :titles="titles"
    @tab-current-index="tabcurrent"
    ref="tabcontrol1"
    ></tab-bar-control>
    <scroll class="content"
    ref="scroll"
    :probe-type="3"
    :pull-up-load="true"
    @scroll="position"
    @pullingUp="pullingUp"
    :goods=goods[currentType].list>
        <home-carousel :banners="banners" @carouselimg="carouselImg"></home-carousel>
    <home-recommend :recommends="recommends"></home-recommend>
    <home-feature-view></home-feature-view>
    <tab-bar-control
    :titles="titles"
    @tab-current-index="tabcurrent"
    ref="tabcontrol2"
    ></tab-bar-control>
    <goods-list :goods="goods[currentType].list"></goods-list> 
     <div class="pullup-tips">
          <div v-if="!isPullUpLoad" class="before-trigger">
            <span class="pullup-txt">Pull up and load more</span>
          </div>
          <div v-else class="after-trigger">
            <span class="pullup-txt">Loading...</span>
          </div>
        </div>
  
    </scroll>
    <back-top @click.native="backtop" v-show="isShowBackTop"></back-top>
    
      </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import TabBarControl from "components/content/tabBarControl/TabBarControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backTop/BackTop'


import HomeCarousel from "./childCops/HomeCarousel.vue";
import HomeRecommend from "./childCops/HomeRecommend.vue";
import HomeFeatureView from "./childCops/HomeFeatureView";

import { getHomeMultidata, getGoodsList } from "network/home";
import {debounce} from '@/common/utils.js'




export default {
  components: {
    NavBar,
    TabBarControl,
    GoodsList,
    Scroll,
    BackTop,
    HomeCarousel,
    HomeRecommend,
    HomeFeatureView,
 
    
  },
  data() {
    return {
      banners: [],
      recommends: [],
      titles: ["流行", "精选", "新款"],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      isShowBackTop:true,
      isPullUpLoad:false,
      isLoad:false,
      isTop:false, //是否吸顶
      tabOffSetTop:'',
      ScrollY:'' //当前滚动高度
    };
  },
  created() {
    this.getHomeMultidata();
    this.getGoodsList("pop");
    this.getGoodsList("new");
    this.getGoodsList("sell");
  
  },
  mounted(){
    // const refresh=debounce(this.$refs.scroll.refresh(),1000)
    //     //goodsitem监听函数完成
    //     //性能优化，防抖
    // this.$bus.$on('imgLoad',()=>{
    //   // console.log('test');
    //   refresh()
      
  
    // })

    
  

    
  },
  //home离开记录当前位置
  activated(){
    // console.log('activated');
    this.$refs.scroll.scrollTo(0,this.ScrollY,0)  //激活回到当前位置
    this.$refs.scroll.refresh();
  },
  deactivated(){
    // console.log('deavtated');
    this.ScrollY = this.$refs.scroll.getScrollY()
    // console.log(this.ScrollY);

  },
  // updated(){
  //   this.$refs.scroll.refresh();   //解决刷新失去滚动

  // },
  methods: {
    /**
     * 监听事件相关方法 
     */
    //监听tabcontrol点击
    tabcurrent: function (index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "sell";
          break;
        case 2:
          this.currentType = "new";
          break;
          
      };
      //解决两个tarcontrol不统一
      this.$refs.tabcontrol2.currentIndex=index;
      this.$refs.tabcontrol1.currentIndex=index;
    },
    backtop(){
      this.$refs.scroll.scrollTo(0,0);
    },
    //下拉加载事件
    pullingUp(){
      // console.log('加载更多');
    this.getGoodsList(this.currentType)
    },
    carouselImg(){
      //减少请求次数
      if(!this.isLoad){
      this.tabOffSetTop=this.$refs.tabcontrol2.$el.offsetTop;
      this.isLoad=true;
      }
      
    },
    position(position){
      this.isShowBackTop = -(position.y)>1000
      // console.log(position);
      //isfixed，是否吸顶
      this.isTop = -(position.y)>this.tabOffSetTop
   
    },

    
    /**
     *网络请求代码
     */
    //请求轮播图，推荐数据
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        //函数执行销毁内存变量,箭头函数this执向this为组件,res赋值给data
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    // 动态请求商品数据 x
    getGoodsList(type) {
      const page = this.goods[type].page + 1;
      getGoodsList(type, page).then((res) => {
        //保存数据
        this.goods[type].list.push(...res.data.list);
        // console.log(res.data.list);
        this.goods[type].page += 1;
        // console.log(this.goods["pop"].list);
        this.$refs.scroll.finishPullUp();
        this.isPullUpLoad=true;
        //结束下拉加载
      });
    },
  },
};
</script>

<style scoped>
#home{
  height: 100vh;  /**vh代表可视区高度**/
}

.home-nav-bar {
  background-color: var(--color-tint);
  color: aliceblue;
  position: fixed;
}
.content{
  position:absolute;
  top: 48px;
  bottom: 49px;
  right: 0;
  left: 0;
  overflow: hidden;
}
.pullup-tips{
    padding:30px;
    text-align:center;
    color: #999;
    }

</style>