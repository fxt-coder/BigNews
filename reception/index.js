$(function () {
  // 一:热点图
  $.ajax({
    url: 'http://localhost:8080/api/v1/index/hotpic',
    success: function (backData) {
      // console.log(backData);
      if (backData.code == 200) {
        var resHtml = template('hotpic', backData);
        $('.focus_list').html(resHtml);
      }
    }
  });


  //二: 最新资讯
  $.ajax({
    url: 'http://localhost:8080/api/v1/index/latest',
    success: function (backData) {
      //console.log(backData);
      if (backData.code == 200) {
        var resHtml = template('latest', backData);
        $('.common_news').html(resHtml);
      }
    }
  });


  // 三：热门排行

  $.ajax({
    url: 'http://localhost:8080/api/v1/index/rank',
    success: function (backData) {
      // console.log(backData);
      if (backData.code == 200) {
        for (var i = 0; i < backData.data.length; i++) {
          $('.hotrank_list>li').eq(i).children('a').text(backData.data[i].title);
          $('.hotrank_list>li').eq(i).children('a').attr('href', './article.html?id=' + backData.data[i].id);
        }
      }
    }
  });

  // 四：最新评论
  $.ajax({
    url: 'http://localhost:8080/api/v1/index/latest_comment',
    success: function (backData) {
      // console.log(backData);
      var month = new Date().getMonth() + 1;
      backData.month = month;
      var resHtml = template('lastecomment', backData);
      $('.comment_list').html(resHtml);
    }
  })

  // 五：焦点关注
  $.ajax({
    url: 'http://localhost:8080/api/v1/index/attention',
    success: function (backData) {
      // console.log(backData);
      if (backData.code == 200) {
        var resHtml = template('attention', backData);
        $('.guanzhu_list').html(resHtml);
      }
    }
  });

  // 获取文章类别
  $.ajax({
    url: 'http://localhost:8080/api/v1/index/category',
    success: function (backData) {
      //console.log(backData);
      if (backData.code == 200) {
        var resHtml = template('category_temp', backData);
        $('.level_two').html(resHtml);
        //七.获取所有的文章类型2
        var resHtml2 = template('category_temp2', backData);
        $('.left_menu.fl').html(resHtml2);
      }
    }
  });


  // 搜索文章
  $('.search_btn').on('click', function () {
    var searchTxt = $('.search_txt').val().trim();
    if (searchTxt == '') {
      alert('不能为空');
      return;
    } else if (isNaN(parseInt(searchTxt)) == false) {
      alert('搜索关键词为文本内容');
      return;
    } else {
      window.location.href = './list.html?searchTxt=' + searchTxt;
    }
  });

  // 回车搜索
  $('.search_txt').on('keydown', function (e) {
    if (e.keyCode == 13) {
      // alert('点击了一下回车');
      $('.search_btn').click();
    }
  });
})

