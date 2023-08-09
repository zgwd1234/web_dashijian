$(function () {
    // 点击去注册的链接
    $('#link_reg').on('click',function () {
        $('.reg-box').show()
        $('.login-box').hide()
    })
    // 点击去登录的链接
    $('#link_login').on('click',function () {
        $('.reg-box').hide()
        $('.login-box').show()
    })
    // 从layui中得到form
    var form = layui.form
    var layer= layui.layer
    // 通过form.verify校正了自定义的规则
    form.verify ({
        pwd:[/^[\S]{6,12}$/,'非空格和6-12位'],
        // 校验两次密码身份一致的规则
        repwd:function (value) {
         var pwd = $('.reg-box[name=password]').val()
            if(pwd !== value) {
                return '不一致'
            }
        }
    })
    // 监听注册表单提交事件
    $('#form_reg').on('submit',function (e) {
        e.preventDefault()
        var data={
            username:$('#form_reg[name=username]').val(),
            password:$('#form_reg[name=password]').val()
        }
        $.post('/api/reguser',data,function (res) {
            if(res.status !== 0){
                return layer.msg(res.message)
            }
            layer.msg('注册成功，请登录')
            // 模拟人的点击行为
            $('#link_login').click()
        })
    })
    // 监听登录表单提交事件
    $('#form_login').submit(function (e) {
        // 阻止默认提交表单的行为
        e.preventDefault()
        $.ajax({
            url:'/api/login/',
            method:'POST',
            // 快速获取表单的途径
            data:$(this).serialize(),
            success:function(res){
                if(res.ststus!==0){
                    return layer.msg('登录失败')

                }
                layer.msg('登陆成功')
                //console.log(res.token)
                location.href('/index.html')
            }
        })
    })
})