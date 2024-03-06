//* 한 섹션씩 이동하는 스크롤

$(document).ready(function() {
  var windowHeight = $(window).height(); // 윈도우의 높이
  var scrolling = false; // 스크롤 중 여부
  var lastScrollTop = 0; // 이전 스크롤 위치

  // 스크롤 이벤트를 감지하는 함수
  $(window).on('scroll', function() {
      // 스크롤 중이면 중복 실행을 방지하기 위해 종료
      if (scrolling) return;

      // 현재 스크롤 위치
      var scrollTop = $(window).scrollTop();

      // 위 혹은 아래 방향의 스크롤 여부 확인
      var isScrollingDown = scrollTop > lastScrollTop;
      lastScrollTop = scrollTop;

      // 현재 보여지는 섹션의 인덱스
      var sectionIndex = Math.floor(scrollTop / windowHeight);

      // 다음 섹션의 상단 위치
      var nextSectionTop = (sectionIndex + (isScrollingDown ? 1 : 0)) * windowHeight;

      // 다음 섹션으로 이동
      scrollToNextSection(nextSectionTop);
  });

  // 다음 섹션으로 이동하는 함수
  function scrollToNextSection(nextSectionTop) {
      // 스크롤 중 상태 변경
      scrolling = true;

      // 다음 섹션의 상단으로 이동
      $('html, content').animate({
          scrollTop: nextSectionTop
      }, 800, function() {
          // 스크롤 중 상태 변경
          scrolling = false;
      });
  }
});