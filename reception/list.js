$(function () {
  // 获取URL传递来的文章id
  var typeId = window.location.search.split('=')[1];
  $.ajax({
    url: 'http://localhost:8080/api/v1/index/search',
    data: {
      type: typeId
    },
    success: function (backData) {
      // console.log(backData);
      if (backData.code == 200) {
        if (backData.data.data.length == 0) {
          $('div.left_con').html('没有数据');
          return;
        }
        var resHtml = template('latest_temp', backData);
        $('div.left_con').html(resHtml);
      }
    }
  });
  //-------------------------------------------------
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
      backData.month = month; //添加到backData数据中
      //console.log(backData);
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
  // 七：获取搜索文章带过来的关键字
  var searchTxt = window.location.search.split('=')[1];
  searchTxt = decodeURI(searchTxt); //urlencode解码
  // console.log(searchTxt);
  if (isNaN(parseInt(searchTxt)) == true) {
    //发送ajax请求获取搜索数据
    $.ajax({
      url: 'http://localhost:8080/api/v1/index/search',
      data: {
        key: searchTxt
      },
      success: function (backData) {
        // console.log(backData);
        if (backData.code == 200) {
          if (backData.data.data.length == 0) {
            $('div.left_con').html("没有数据");
            return;
          }
          //3.通过模板引擎渲染到页面上.
          var resHtml = template('latest_temp', backData);
          $('div.left_con').html($(resHtml));

          $('.list_title>h3').text('搜索结果:' + searchTxt);
        }
      }
    });
  }
})