import BackTop from 'components/content/backTop/BackTop'
export const itemMixin={
  
    data(){
        return {
            itemImgLoad:null
        }
    },
    mounted(){
        console.log("混入");
        this.homeImgListener=()=>{
            console.log("进入到组件");
            this.$refs.scroll.refresh();
            }
            this.$bus.$on("ImgLoad",this.homeImgListener)
            
          },
    }
    
//混入backtop组件
export const backTopMixin={
    components:{
        BackTop,
        
        },
    data(){
        return{
            isShowBackTop:false
        }
    },
    methods:{
        backtop(){
            this.$refs.scroll.scrollTo(0,0);
          },
          listenBackTopPoy(position){
            this.isShowBackTop = -(position.y)>1000
          }
    }
}