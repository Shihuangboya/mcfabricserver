// 初始化CKEditor5编辑器
ClassicEditor
    .create(document.querySelector('#editor-container'), {
        toolbar: {
            items: [
                'heading',
                '|',
                'bold',
                'italic',
                'link',
                'bulletedList',
                'numberedList',
                'undo',
                'redo'
            ]
        },
        language: 'zh-CN'
    })
    .then(editor => {
        console.log('编辑器初始化成功', editor);

        // 添加图片上传功能
        editor.model.document.on('paste', (evt, data) => {
            if (data.files.length > 0) {
                handleImageUpload(data.files[0]);
            }
        });

        editor.ui.view.editingView.element.addEventListener('drop', (e) => {
            e.preventDefault();
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                handleImageUpload(files[0]);
            }
        });
    })
    .catch(error => {
        console.error('编辑器初始化失败', error);
    });

// 处理图片上传
function handleImageUpload(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        const imageUrl = e.target.result;
        insertImageIntoEditor(imageUrl);
    };
    reader.readAsDataURL(file);
}

// 将图片插入编辑器
function insertImageIntoEditor(imageUrl) {
    const editor = document.querySelector('#editor-container');
    editor.innerHTML += `<img src="${imageUrl}" alt="用户上传的图片" style="max-width: 100%; height: auto;">`;
}

// 获取最后一次发布时间
function getLastPublishTime() {
    return localStorage.getItem('lastPublishTime') || 0;
}

// 检查发布限制
function canPublish() {
    const lastTime = parseInt(getLastPublishTime());
    const currentTime = Date.now();
    const timeDiff = currentTime - lastTime;

    if (timeDiff < 180000) { // 3分钟 = 180000 毫秒
        const remaining = Math.ceil((180000 - timeDiff) / 1000);
        Swal.fire({
            title: '发布限制',
            text: `请等待 ${remaining} 秒后再发布！`,
            icon: 'warning',
            timer: 2000
        });
        return false;
    }
    return true;
}

// 发布内容
function publishContent() {
    if (!canPublish()) return;

    const content = document.querySelector('#editor-container').innerHTML;
    const title = prompt('请输入故事标题：');

    if (!title || !content) {
        Swal.fire({
            title: '发布失败',
            text: '标题和内容不能为空！',
            icon: 'error'
        });
        return;
    }

    // 存储到 localStorage
    const post = {
        title,
        content,
        author: '匿名用户',
        time: new Date().toLocaleString(),
        id: Date.now().toString()
    };

    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts.unshift(post);
    localStorage.setItem('posts', JSON.stringify(posts));

    // 更新最后一次发布时间
    localStorage.setItem('lastPublishTime', Date.now().toString());

    // 提示发布成功
    Swal.fire({
        title: '发布成功',
        text: '你的故事已发布！',
        icon: 'success'
    });

    // 更新发布记录
    updatePublicationHistory();
}

// 更新发布记录
function updatePublicationHistory() {
    const historyDiv = document.getElementById('publication-history');
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    
    historyDiv.innerHTML = '<h3>最近发布的日常</h3>';
    
    posts.forEach(post => {
        const postDiv = document.createElement('div');
        postDiv.className = 'post-item';
        postDiv.innerHTML = `
            <h4>${post.title}</h4>
            <p>作者：${post.author}</p>
            <p>时间：${post.time}</p>
            <div>${post.content}</div>
        `;
        historyDiv.appendChild(postDiv);
    });
}

// 初始化发布记录
updatePublicationHistory();