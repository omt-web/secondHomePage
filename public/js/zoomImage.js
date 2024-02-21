// !이미지 확대, 축소 테스트 성공1
// const image = document.getElementById('image');
// const zoomInButton = document.getElementById('zoomIn');
// const zoomOutButton = document.getElementById('zoomOut');

// let scale = 1;

// zoomInButton.addEventListener('click', () => {
//   scale += 0.1;
//   image.style.transform = `scale(${scale})`;
// });

// zoomOutButton.addEventListener('click', () => {
//   scale -= 0.1;
//   image.style.transform = `scale(${scale})`;
// });

// window.addEventListener('scroll', () => {
//     const scrollY = window.scrollY;
//     const maxScale = 0.7;
//     const minScale = 0.5;
//     const sensitivity = 0.02; // 스크롤 민감도를 조절합니다.
  
//     if (scrollY > 0) {
//       scale = Math.max(maxScale, scale + sensitivity);
//     } else {
//       scale = 1;
//     }
  
//     image.style.transform = `scale(${scale})`;
//   });


//! 이미지 확대 축소 테스트 2
const scrollButton = document.getElementById('scrollButton');
const firstScreen = document.querySelector('.first-screen');
const secondScreen = document.querySelector('.second-screen');
const text1 = document.getElementById('text1');
const text2 = document.getElementById('text2');
const background1 = document.getElementById('background1');
const background2 = document.getElementById('background2');

scrollButton.addEventListener('click', () => {
    firstScreen.style.transform = 'translateY(-10%)';
    secondScreen.style.transform = 'translateY(0%)';
    text1.style.display = 'none';
    text2.style.display = 'block';
    background1.style.transform = 'scale(1.2)';
    background2.style.transform = 'scale(1)';
});

window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const firstScreenHeight = firstScreen.offsetHeight;

    if (scrollPosition >= firstScreenHeight - windowHeight) {
        background1.style.transform = `scale(${1 + (scrollPosition - (firstScreenHeight - windowHeight)) / windowHeight})`;
        background2.style.transform = 'scale(1)';

    } else {
        background1.style.transform = 'scale(1)';
        background2.style.transform = `scale(${1 + (scrollPosition - (firstScreenHeight - windowHeight)) / windowHeight})`;

    }
});

