// contentBox2 클릭 시 이미지 토글
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('contentBox2').addEventListener('click', function() {
        var img = document.getElementById('contentImages4');
        img.classList.toggle('hiddenImg');
    });
});
