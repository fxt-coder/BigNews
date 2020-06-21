$(function () {
  var myPage = 1;
  getComData(myPage);
  function getComData(page, callback) {
    $.ajax({
      url: BigNew.comment_list,
      data: {
        page: page,
        perpage: 2
      },
      success: function (backData) {
        // console.log(backData);
        if (backData.code == 200) {
          var resHtml = template('com_list_temp', backData);
          $('tbody').html(resHtml);
          if (backData.data.data.length != 0 && callback != null) {
            callback(backData);
          } else if (backData.data.totalPage == myPage - 1 && backData.data.data.length == 0) {
            myPage -= 1;
            //重新生成页码条
            $('#pagination').twbsPagination('changeTotalPages',
              backData.data.totalPage, myPage);
          }

          $('#pagination').twbsPagination({
            totalPages: backData.data.totalPage, //总页数
            visiblePages: 5,
            first: '首页',
            prev: '上一页',
            next: '下一页',
            last: '尾页',
            onPageClick: function (event, page) {
              //给myPage赋值,值就是当前点击的整个页码
              myPage = page;
              //把当前点击的页码传进去. 调用方法.
              getComData(page, null);
            }
          });
        }
      }
    });
  }

  // 批准
  $('tbody').on('click', '.btn-pizhun', function () {
    var id = $(this).attr('data-id');
    $.ajax({
      type: "post",
      url: BigNew.comment_pass,
      data: {
        id: id
      },
      success: function (backData) {
        // console.log(backData);
        if (backData.code == 200) {
          alert('审核通过');
          getComData(myPage, null);
        }
      }
    });
  });


  // 拒绝
  $('tbody').on('click', '.btn-jujue', function () {
    var id = $(this).attr('data-id');
    $.ajax({
      type: "post",
      url: BigNew.comment_reject,
      data: {
        id: id
      },
      success: function (backData) {
        // console.log(backData);
        if (backData.code == 200) {
          alert('拒绝成功');
          getComData(myPage, null)
        }
      }
    });
  });

  // 删除
  $('tbody').on('click', '.btn-delete', function () {
    var id = $(this).attr('data-id');
    $.ajax({
      type: "post",
      url: BigNew.comment_delete,
      data: {
        id: id
      },
      success: function (backData) {
        // console.log(backData);
        if (backData.code == 200) {
          alert('删除成功');
          getComData(myPage, function (backData) {
            $('#pagination').twbsPagination('changeTotalPages',
              backData.data.totalPage, myPage);
          })
        }
      }
    });
  });









})