<template>
<div class="tab-bar-item" @click="itemClick">
    <!-- 这里用div包裹，以防替换失去属性 -->
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :style="activeStyle"><slot name="item-text"></slot></div>
</div>
</template>

<script>
export default {
    data (){
        return {
        //   isActive:true;
        }
    },
    computed:{
        isActive(){
            return this.$route.path.indexOf(this.path) !== -1;
        },
        activeStyle(){
            return this.isActive ? {color:this.activeColor} : {} //三目运算符
         }

    },
    props:{
        path:String,
        activeColor:{
            type:String,
            default:'blue'  //静态传值
        }
    },
    methods:{
        itemClick(){
            this.$router.push(this.path)
        }
    }

}
</script>

<style>

.tab-bar-item {
    text-align: center;
    flex: 1;
    height: 49px;
    font-size: 12px;
 
}
.tab-bar-item img {
    width: 24px;
    height: 24px;
    margin-bottom: 3px;
    vertical-align: middle;
    margin-top: 3px;
    
}

</style>