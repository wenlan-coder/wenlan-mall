import {request} from './request';
//获取网络请求方法
export function getHomeMultidata(){
    return request({
        url:'/home/multidata'
    })
}
//获取tabcontr部分数据
export function getGoodsList(type,page) {
    return request({
        url:'home/data',
        params:{
            page,
            type,

        }
    })
}