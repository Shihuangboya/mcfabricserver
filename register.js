document.getElementById('register-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirm-password').value.trim();

    // 简单的用户验证（示例）
    const existingUsers = JSON.parse(localStorage.getItem('users')) || {};

    if (username && password && confirmPassword) {
        if (password === confirmPassword) {
            if (existingUsers[username]) {
                // 用户名已存在
                Swal.fire({
                    title: '注册失败',
                    text: '用户名已存在，请选择其他用户名！',
                    icon: 'error'
                });
                return;
            }

            // 存储用户信息
            existingUsers[username] = password;
            localStorage.setItem('users', JSON.stringify(existingUsers));

            // 注册成功，跳转到登录页面
            Swal.fire({
                title: '注册成功',
                text: '欢迎加入，' + username + '！请登录以继续。',
                icon: 'success'
            }).then(() => {
                window.location.href = 'login.html';
            });
        } else {
            // 密码不一致
            Swal.fire({
                title: '注册失败',
                text: '密码不一致，请重试！',
                icon: 'error'
            });
        }
    } else {
        Swal.fire({
            title: '注册失败',
            text: '用户名、密码和确认密码不能为空！',
            icon: 'error'
        });
    }
});