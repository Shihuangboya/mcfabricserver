document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    // 简单的用户验证（示例）
    const validUsers = {
        'admin': 'admin123',
        'user1': 'password123'
    };

    if (username && password) {
        if (validUsers[username] === password) {
            // 登录成功
            Swal.fire({
                title: '登录成功',
                text: '欢迎回来，' + username + '！',
                icon: 'success'
            }).then(() => {
                // 存储用户状态
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('username', username);
                // 跳转到主页或其他页面
                window.location.href = '/';
            });
        } else {
            // 登录失败
            Swal.fire({
                title: '登录失败',
                text: '用户名或密码错误，请重试！',
                icon: 'error'
            });
        }
    } else {
        Swal.fire({
            title: '登录失败',
            text: '用户名和密码不能为空！',
            icon: 'error'
        });
    }
});