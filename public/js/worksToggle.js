// contentBox2 클릭 시 이미지 토글
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('contentBox2').addEventListener('click', function() {
        var img = document.getElementById('contentImages4');
        img.classList.toggle('hiddenImg');
    });

// contentImages8 클릭 시 이미지 토글
    document.getElementById('contentBox6').addEventListener('click', function() {
        var img = document.getElementById('contentImages8');
        img.classList.toggle('hiddenImg');
    });

    // contentImages11 클릭 시 이미지 토글
    document.getElementById('contentBox8').addEventListener('click', function() {
        var img = document.getElementById('contentImages11');
        img.classList.toggle('hiddenImg');
    });
});


