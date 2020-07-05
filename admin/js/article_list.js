$(function () {
  //一: 一进到文章列表页,就显示所有的文章分类. 
  //发送ajax获取所有的文章分类数据,通过模板引擎显示. 
  $.ajax({
    type: 'get',
    url: BigNew.category_list,
    success: function (backData) {
      //console.log(backData);
      if (backData.code == 200) {
        //通过模板引擎渲染到页面上.
        var resHtml = template('categoryList', backData);
        $('#selCategory').html(resHtml);
      }
    }
  });
  //----------------------------------------
  //声明一个变量用来记录当前页. 
  var currentPage;
  //把发送ajax请求获取文章并渲染做一个封装. 
  function getData(myPage, callback) {
    $.ajax({
      type: 'get',
      url: BigNew.article_query,
      data: {
        type: $('#selCategory').val().trim(),
        state: $('#selStatus').val().trim(),
        page: myPage,
        perpage: 3
      },
      success: function (backData) {
        // console.log(backData);
        if (backData.code == 200) {
          var res1 = template('articleList', backData);
          $('tbody').html(res1);
          //判断
          if (backData.data.data.length != 0 && callback != null) {
            $('#pagination').show().next('p').hide();
            callback(backData); //调用回调函数,把返回的文章数据作为实参传递过去. 
          }
          // 如果当前页是1,并且没有数据,那说明你这个文章类别里面真的就没有文章. 
          else if (currentPage == 1 && backData.data.data.length == 0) {
            //没有数据
            $('#pagination').hide().next('p').show();
          }
          //如果满足下面这个条件,说明你刚才删除的是最后一页的最后一条数据
          else if (backData.data.totalPage == currentPage - 1 && backData.data.data.length == 0) {
            currentPage -= 1;
            
            //重绘一下页码条. 
            $('#pagination').twbsPagination('changeTotalPages', backData.data.totalPage, currentPage);
          }
        }
      }
    });
  }


  //二: 一进到页面,发送ajax请求,获取默认的分类和默认的状态下的所有文章. 
  getData(1, function (backData) {
    //分页插件
    $('#pagination').twbsPagination({
      totalPages: backData.data.totalPage, //总页数
      visiblePages: 5, //可见的页码
      first: '首页',
      prev: '上一页',
      next: '下一页',
      last: '尾页',
      // 这个事件是页码被点击后的回调函数. 
      onPageClick: function (event, page) {
        currentPage = page; //给当前页赋值.
        //继续发送ajax请求. 获取当前点击的当前页的文章数据并渲染. 
        getData(page, null);
      }
    });
  })


  //三:筛选条件搜索文章
  //给搜索按钮设置点击事件,
  $('#btnSearch').on('click', function (e) {
    e.preventDefault();
    currentPage = 1; //点击搜索按钮,那当前页就变成1. 

    //发送ajax获取数据渲染. 
    getData(1, function (backData) {
      //筛选条件发生了改变,那文章总页码也有可能会发生改变. 
      //那就应该要根据总页码重绘页码条
      $('#pagination').twbsPagination('changeTotalPages', backData
        .data.totalPage, currentPage);
    });
  })

  //四:删除文章. 
  //委托方式给删除按钮们注册事件.
  $('tbody').on('click', 'a.delete', function () {
    if (confirm('你确定要删除吗?')) {
      //获取当前点击的删除按钮上面保存的文章id
      var articleId = $(this).attr('data-id');
      //发送ajax请求完成删除. 
      $.ajax({
        type: 'post',
        url: BigNew.article_delete,
        data: {
          id: articleId
        },
        success: function (backData) {
          //删除成功后,重新加载数据. 
          //console.log(backData);
          if (backData.code == 204) {
            alert('删除成功!');
            //重新加载数据
            //删除成功后,也有可能会改变总的页码, 所以在回调函数中也要重绘
            getData(currentPage, function (backData) {
              $('#pagination').twbsPagination(
                'changeTotalPages', backData
                  .data.totalPage, currentPage);
            });
          }
        }
      });
    }
  })

  $('#release_btn').on('click', function () {
    parent.$('ul.level02>li:eq(1)').click();
  });
})