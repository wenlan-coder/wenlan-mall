<template>
     <swiper :options="swiperOption" class="swiper">
        <swiper-slide v-for="(item,index) in topImg" :key="index"  class="swiper-item">
            <div align="center"><img :src="item" alt=""></div>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>

    </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
export default {
    name:'work',
    components: {
        Swiper,
        SwiperSlide
    },
    props:{
    topImg:{
        type:Array,
        default:[]   
         }
    },
    data(){
        return {
            
            swiperOption: {
                autoplay: {
                    disableOnInteraction: false,  // 用户操作swiper之后，是否禁止autoplay
                    delay: 3000, // 自动切换的时间间隔（单位ms）
                },
                initialSlide: 0,   //初始索引
                loop: true,  //是否循环
                pagination: { el: '.swiper-pagination' }, // 分页按钮
                paginationClickable :true,
    
               
            }
        }
    }
}
</script>

<style>
.swiper{
    height: 300px;
}
</style>
