//! 이미지 확대 축소 테스트 2
const scrollButton = document.getElementById('scrollButton');
const firstScreen = document.querySelector('.first-screen');
const secondScreen = document.querySelector('.second-screen');
const textContainer1 = document.querySelector('.textContainer1');
const textContainer2 = document.querySelector('.textContainer2');
const background1 = document.getElementById('background1');
const background2 = document.getElementById('background2');

scrollButton.addEventListener('click', () => {
    // * 이미지
    background1.style.transform = 'scale(1.4)';
    background2.style.transform = 'scale(2)';

    // * 텍스트
    textContainer1.classList.add('hidden');
    textContainer2.classList.add('hidden');
});

window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const firstScreenHeight = firstScreen.offsetHeight;
    const secondScreenHeight = secondScreen.offsetHeight;

    // *이미지 확대 축소
    if (scrollPosition >= firstScreenHeight - windowHeight) {
        const scrollRatio = (scrollPosition - (firstScreenHeight - windowHeight)) / windowHeight;
        const scrollRatio2 = (scrollPosition - (secondScreenHeight - windowHeight)) / windowHeight;
        const scaleRatio =  1 + scrollRatio;
        const scaleRatio2 = 2 + scrollRatio2;
        background1.style.transform = `scale(${scaleRatio})`;
        background2.style.transform = `scale(${scaleRatio2})`;
    } else {
        background1.style.transform = 'scale(1)';
        background2.style.transform = 'scale(1)';
    }

    // *텍스트 확대 축소
    if (scrollPosition >= firstScreenHeight - windowHeight + 4) {
        // * 스크롤 아래로
        textContainer1.classList.add('hidden');
        textContainer2.classList.add('hidden');
    } else {
        // * 스크롤 위로
        textContainer1.classList.remove('hidden');
        textContainer2.classList.remove('hidden');
    }
});
