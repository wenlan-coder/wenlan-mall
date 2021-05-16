import { request } from "./request";

//获取详情页面id
export function getDetail(iid){
    return request({
    url:'/detail',
    params:{
        iid,
    }
    })
    
}
//获取推荐信息
export function getRecommend(){
    return request({
        url:'/recommend'
    })
}
//goods类
export class Goods{
    constructor(itemInfo,columns,services){
        this.title=itemInfo.title
        this.desc=itemInfo.desc
        this.newPrice=itemInfo.price
        this.oldPrice=itemInfo.oldPrice
        this.discount=itemInfo.discountDesc
        this.columns=columns
        this.services=services
        this.realPrice=itemInfo.lowNowPrice
    }
}
//店铺类shop
export class Shop{
    constructor(shopInfo){
        this.logo=shopInfo.shopLogo
        this.name=shopInfo.name
        this.fans=shopInfo.cFans
        this.sells=shopInfo.cSells
        this.score=shopInfo.score
        this.goodsCount=shopInfo.cGoods
        

    }
}
//判断对象是否为空object(key).length===0  则对象为空
// const obj ={

// }
// Object.keys(obj)===0