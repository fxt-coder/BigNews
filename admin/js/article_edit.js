$(function () {

  // 1.图片预览
  $('#inputCover').on('change', function () {
    var file1 = this.files[0];
    var url = URL.createObjectURL(file1);
    $(this).prev().attr('src', url);
  });

  // 2.获取文章类别
  $.ajax({
    type: "get",
    url: BigNew.category_list,
    success: function (backData) {
      // console.log(backData);
      if (backData.code == 200) {
        var resHtml = template('category', backData);
        $('select.category').html(resHtml);
      }
    }
  });

  // 3.编辑页插件jeDate
  jeDate("#testico", {
    zIndex: 20999,
    format: "YYYY-MM-DD",
    isTime: false,
    minDate: "2014-09-19 00:00:00"
  })
  //4.编辑页使用富文本编辑器  wangEditor
  var E = window.wangEditor;
  var editor = new E('#editor');
  // 或者 var editor = new E( document.getElementById('editor') )
  editor.create()

  // 点击编辑跟随url传递过来文章的id
  var articleId = window.location.search.split('=')[1];
  // console.log(articleId);
  $.ajax({
    url: BigNew.article_search,
    data: {
      id: articleId
    },
    success: function (backData) {
      // console.log(backData);
      $('#inputTitle').val(backData.data.title); //文章标题
      $('.article_cover').attr('src', backData.data.cover);
      $('.select.category').val(backData.data.categoryId);
      $('#testico').val(backData.data.date);
      editor.txt.html(backData.data.content)
    }
  });

  // 编辑按钮点击事件
  $('.btn-edit').on('click', function (e) {
    e.preventDefault();
    // form表单数据的提交
    var fd = new FormData($('form')[0])//将dom元素转换为jq对象
    fd.append('content',editor.txt.html());
    fd.append('state','已发布');
    fd.append('id',articleId);

    $.ajax({
      type: "post",
      url: BigNew.article_edit,
      data: fd,
      contentType:false,
      processData:false,
      success: function (backData) {
        // console.log(backData);
        if (backData.code==200) {
          alert('修改成功');
          window.history.back();
        }
        
      }
    });
  });


  // 存草稿
  $('.btn-draft').on('click', function (e) {
    e.preventDefault();
    // form表单数据的提交
    var fd = new FormData($('form')[0])//将dom元素转换为jq对象
    fd.append('content',editor.txt.html());
    fd.append('id',articleId);

    $.ajax({
      type: "post",
      url: BigNew.article_edit,
      data: fd,
      contentType:false,
      processData:false,
      success: function (backData) {
        // console.log(backData);
        if (backData.code==200) {
          alert('修改成功');
          window.history.back();
        }
        
      }
    });
  });
})