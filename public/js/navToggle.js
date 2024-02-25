//! 나브 바 토글

// 페이지 로드 후 실행되는 함수
document.addEventListener("DOMContentLoaded", function() {
    // .dropdown 클래스를 가진 요소를 모두 선택
    const dropdowns = document.querySelectorAll('.dropdown');
    
    // 모든 .dropdown 요소에 클릭 이벤트 리스너 추가
    dropdowns.forEach(function(dropdown) {
        dropdown.addEventListener('click', function() {
            // 현재 클릭된 .dropdown 요소의 하위 요소인 .dropdown-content를 선택
            const dropdownContent = dropdown.querySelector('.dropdown-content');
            
            // dropdownContent의 display 속성을 확인하여 토글링
            if (dropdownContent.style.display === 'block') {
                dropdownContent.style.display = 'none'; // 표시되어 있다면 숨김
            } else {
                dropdownContent.style.display = 'block'; // 숨겨져 있다면 표시
            }
        });
    });
});