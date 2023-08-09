$.ajaxPrefilter(function (options) {
   
    options.url='http://ajax.frontend.itheima.net'+options.url
    

    //统一为有权限的接口设置请求头
    if(options.url.indexOf('/my/')!==-1){
        options.Headers={
            Authorization:localStorage.getItem('token')||''
        }
    }
    //全局调用complete的回调函数
    options.complete=function (res) {
        if(res.responseJSON.status===1&&res.responseJSON.status==='身份验证失败'){
            localStorage.removeItem('token')
            location.href='/login.html'
        }
    }
        

})