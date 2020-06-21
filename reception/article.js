$(function () {
  // url传文章id
  var id = window.location.search.split('=')[1];
  // console.log(id);

  $.ajax({
    url: 'http://localhost:8080/api/v1/index/article',
    data: {
      id: id
    },
    success: function (backData) {
      // console.log(backData);

      if (backData.code == 200) {
        $('.article_title').text(backData.data.title);
        $('.article_con').html(backData.data.content);
        $('.article_links a').eq(0).text(backData.data.prev.title)
        $('.articlr_links a').eq(0).attr('href', './article.html?id=' + backData)
        $('.article_links a').eq(1).text(backData.data.next.title);
        $('.article_links a').eq(1).attr('href', './article.html?id=' + backData.data.next.id);
        var resHtml = template('info_temp', backData);
        $('.article_info').html(resHtml);
        $('.breadcrumb a').eq(1).text(backData.data.category);
      }
    }
  });


  // 根据文章id获取文章底下的评论
  getComment();
  function getComment() {
    $.ajax({
      type: 'get',
      url: 'http://localhost:8080/api/v1/index/get_comment',
      data: {
        articleId: id
      },
      success: function (backData) {
        // console.log(backData);
        if (backData.code == 200) {
          //通过模板引擎渲染
          var resHtml = template('com_list_temp', backData);
          $('.comment_list_con').html(resHtml);
          //多少条评论
          $('.comment_count').text(backData.data.length + "条评论");
        }
      }
    });
  }


  // 发表评论
  $('input.comment_sub').on('click', function (e) {
    e.preventDefault();
    var comment_name = $('.comment_name').val().trim();
    var comment_input = $('.comment_input').val().trim();
    if (comment_name == '' || comment_input == "") {
      alert('评论不能为空')
      return;
    }

    $.ajax({
      type: "post",
      url: "http://localhost:8080/api/v1/index/post_comment",
      data: {
        author: comment_name,
        content: comment_input,
        articleId: id
      },
      success: function (backData) {
        // console.log(backData);
        if (backData.code == 201) {
          alert('发表成功!');
          $('.comment_name').val('');
          $('.comment_input').val('');
          getComment();
        }
      }
    });
  })






  //三: 热门排行
  $.ajax({
    url: 'http://localhost:8080/api/v1/index/rank',
    success: function (backData) {
      //console.log(backData);
      if (backData.code == 200) {
        //遍历数据
        //找到数据要渲染的标签,分别渲染上. 
        for (var i = 0; i < backData.data.length; i++) {
          $('.content_list>li').eq(i).children('a').text(backData.data[i].title);
          $('.content_list>li').eq(i).children('a').attr('href',
            './article.html?id=' + backData.data[i].id);
        }
      }
    }
  });


  //四: 最新评论
  $.ajax({
    url: 'http://localhost:8080/api/v1/index/latest_comment',
    success: function (backData) {
      var month = new Date().getMonth() + 1; //当前的月份
      backData.month = month;//添加到backData数据中
      // console.log(backData);
      var resHtml = template('latestcomment_temp', backData);
      $('.comment_list').html(resHtml);
    }
  });

  //五: 焦点关注
  $.ajax({
    url: 'http://localhost:8080/api/v1/index/attention',
    success: function (backData) {
      //console.log(backData);
      if (backData.code == 200) {
        var resHtml = template('attention_temp', backData);
        $('.guanzhu_list').html(resHtml);
      }
    }
  })
  //六: 获取所有的文章类型
  $.ajax({
    url: 'http://localhost:8080/api/v1/index/category',
    success: function (backData) {
      //console.log(backData);
      if (backData.code == 200) {
        var resHtml = template('category_temp', backData);
        $('.level_two').html(resHtml);;
        //七.获取所有的文章类型2
        var resHtml2 = template('category_temp2', backData);
        $('.left_menu.fl').html(resHtml2);
      }
    }
  });


  //七:点击搜索按钮
  $('.search_btn').on('click', function () {
    var searchTxt = $('.search_txt').val().trim();
    if (searchTxt == "") {
      alert("搜索关键字为空!");
      return;
    } else if (isNaN(parseInt(searchTxt)) == false) {
      alert('搜索关键字为文本内容');
      return;
    } else {
      window.location.href = "./list.html?searchTxt=" + searchTxt;

    }
  })
  //文本输入框设置键盘按下事件:回车
  $('.search_txt').on('keydown', function (e) {
    if (e.keyCode == 13) {
      $('.search_btn').click();
    }
  })
})