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
})

// 三：热门排行

$.ajax({
  type: "method",
  url: 'http://localhost:8080/api/v1/index/rank',
  data: "data",
  dataType: "dataType",
  success: function (response) {
    
  }
});