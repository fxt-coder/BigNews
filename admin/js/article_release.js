$(function () {
  var articleId = $('#articleList.btn').split('=')[0];
  console.log(articleId);
  
  $.ajax({
    type: "get",
    url: BigNew.article_search,
    data: "data",
    dataType: "dataType",
    success: function (response) {
      
    }
  });

  
})