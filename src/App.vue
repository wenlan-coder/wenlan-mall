<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/img/logo/logo.gif"> -->
    <!-- 使用keep-alive属性必须给组件定义name -->
    <keep-alive exclude="Detail"><router-view></router-view></keep-alive>
  <tab-bar-main></tab-bar-main>
  </div>
</template>
<script>

import TabBarMain from './components/content/tabBarMain/TabBarMain.vue'
export default {
  components:{
    TabBarMain
 
  }

}

</script>
<style>
@import './assets/css/base.css';


</style>
