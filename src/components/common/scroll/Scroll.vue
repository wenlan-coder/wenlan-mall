<template>
<div ref="wrapper" class="wrapper">

        <div class="content"><slot></slot></div>
 
</div>
  
</template>

<script>
import BScroll from 'better-scroll'
export default {
    props:{
        /** * 当数据更新后，刷新scroll的延时。 */
      refreshDelay: {
        type: Number,
        default: 20
      },
        //是否派发滚动获取位置事件
        probeType:{
            type:Number,
            default:0,
        },
        //是否派发上拉加载事件
        pullUpLoad:{
            type:Boolean,
            default:false,
            
        },
        goods:{
            type:Array,
            default:null,
        }

    },
    data(){
        return {
            scroll:null,
        }
    },
    mounted() {
        
        //保证dom渲染完毕后初始化scroll
    setTimeout(()=>{
        this._initBscroll();
        // console.log(this);
    },20)
   
    },
    methods:{
        //初始化better-scroll
        _initBscroll(){
            if(!this.$refs.wrapper){
                return
            }
            // console.log(this);
            //better-scroll的初始化
            this.scroll = new BScroll(this.$refs.wrapper,{                                                                                                                                                                                         
            click:true,
            probeType:this.probeType,
            pullUpLoad:this.pullUpLoad
        })
        console.log(this.scroll);
        //是否派发获取位置事件
        this.scroll.on('scroll',(position)=>{
            this.$emit('scroll',position)
            // console.log(position);
        })
        console.log(this.goods);
        //是否派发下拉加载事件
        if(this.probeType){
            this.scroll.on('pullingUp',()=>{
            // console.log('上拉加载更多');
            //传出pullingUp
            this.$emit('pullingUp')
        })
        }
        },
        //代理scrollto方法
        scrollTo(x,y,time=500){
            this.scroll&&this.scroll.scrollTo(x,y,time)

        },
        //代理refresh方法
        refresh(){
           console.log('---');
           this.scroll&&this.scroll.refresh();
        },
        //代理finsishpullup方法
        finishPullUp(){
            this.scroll&&this.scroll.finishPullUp()
        },
        //记录离开时候home离开位置
        getScrollY(){
            return this.scroll?this.scroll.Y:0

        }
      
    
    },
    //性能优化，watch全局监听，更新30条数据后refresh
    watch:{
        goods(){
            console.log(this.goods)
            setTimeout(()=>{
                this.refresh();
            },this.refreshDelay)
            
        },
        deep:true,
        immediate:true
        
    }
}
</script>

<style scoped>

</style>