// 初始化编辑器
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
        }
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
