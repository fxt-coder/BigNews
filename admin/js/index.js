$(function () {
  $.ajax({
    url: window.BigNew.user_info,
    headers: {
      Authorization: window.localStorage.getItem('token')
    },
    success: function (backData) {
      console.log(backData);
      if (backData.code == 200) {
        $('.user_info>span>i').text(backData.data.nickname);
        $('.user_info>img').attr('src', backData.data.userPic);
        $('.user_center_link>img').attr('src', backData.data.userPic);
      }
    }
  });
  $('.logout').on('click', function () {
    if (confirm('确定要退出嘛？')) {
      window.localStorage.removeItem('token');
      window.location.href = './login.html';
    }
  });

  // 一级菜单点击事件
  $('div.level01').on('click', function () {
    $(this).addClass('active').siblings('div').removeClass('active');
    if ($(this).index() == 1) {
      $('ul.level02').slideToggle();
      $(this).find('b').toggleClass('rotate0');
      $('ul.level02>li:eq(0)>a')[0].click();
      //jQuery对象的click()事件,他只会触发js单击事件,而不会触发a标签的默认跳转事件.
      //dom对象的click()事件,他不仅会触发js单击事件,还会触发a标签的默认跳转事件
    }
  });

  // 二级菜单点击事件
  $('ul.level02>li').on('click', function () {
    $(this).parent().siblings('div').removeClass('active');
    $(this).addClass('active').siblings('li').removeClass('active');
  });
});