//防抖函数
export function debounce(fn,delay){
    let timer;
    return function(...args){
        if(timer) clearTimeout(timer)
        timer=setTimeout(()=> {
            fn(...args)
        },delay);
    }
}
//时间格式转换
function add0(m){return m<10?'0'+m:m }
export function format(value)
{

var time = new Date(value);
var y = time.getFullYear();
var m = time.getMonth()+1;
var d = time.getDate();
var h = time.getHours();
var mm = time.getMinutes();
var s = time.getSeconds();
return y+'-'+add0(m)+'-'+add0(d)+' '+add0(h)+':'+add0(mm)+':'+add0(s);
}