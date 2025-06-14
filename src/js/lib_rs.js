'use strict';

import $ from 'jquery';

$(function() {

  // ハンバーガーメニュー
  $('.nav-toggle').on('click', function() {
    $(this).toggleClass('open');
    $('.g-nav').toggleClass('open');

    // メニューが開いてる間、後はスクロール不可に
    if ($(this).hasClass('open'))
    {
      $('html').css('overflow', 'hidden');
    }
    else
    {
      $('html').css('overflow', 'scroll');
    }
  });

  // メニューがクリックされたら非表示
  $('.g-nav-menu li a').on("click", function() {
    $('.g-nav').removeClass('open');
  });

  // よくある質問ページ
  $(".q-title").on("click", function() {
    // .q-btnに「selected」を付与
    $(this).children().toggleClass('selected');
    // .q-titleの「data-content」を参照し、アコーディオン展開
    $($(this).attr('data-content')).slideToggle(10);
  });

});