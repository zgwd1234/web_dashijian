$(function () {
    getUserInfo()
})
  

//获取用户基本信息
function getUserInfo(){
$.ajax({
    method:'GET',
    url:'/my/userinfo',
   
    success:function (res) {
        if(res.status !==0){
            return layui.layer.msg('获取信息失败')
        }
        //d调用渲染对象
        renderAvatar(res.data)

    },

   
    
})
}


// 渲染用户的头像
function renderAvatar(user) {
    var name = user.nickname||user.username
    //设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;'+name)
    //按需渲染用户的头像
    if(user.user_pic!==null){
    //1.渲染图片图像
        $('.layui-nav-img').attr('src',user.user_pic).show()
        $('.text-avatar').hide()
    }else{
    //2.渲染文本图像
        $('.layui-nav-img').hide()
        var first=name[0].toUpperCase()
        $('.text-avatar').html(first).show()

    }
}
