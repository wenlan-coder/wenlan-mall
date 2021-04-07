<template>

     <div class="nav-bar">
      <div class="left"><slot name="left"></slot></div>
      <div class="center"><slot name="center"></slot></div>
      <div class="right"><slot name="right"></slot></div>

     </div>
 
</template>

<script>
export default {

}
</script>

<style>
.nav-bar{
    position: relative;
    display: flex;
    width: 100%;
    height: 48px;
    line-height: 48px;
    text-align: center;
    box-shadow: 0px 1px 1px rgba(100,100,100,.2);
    z-index: 9;
    
   
}
.right,.left{
    width: 60px;
}
.center{
    height: 44px;
    flex: 1;
}
</style>