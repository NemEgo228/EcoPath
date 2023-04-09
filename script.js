document.addEventListener('DOMContentLoaded', function() {
    const audio = document.getElementById('audio');
    const playButton = document.getElementById('play-sound');

    audio.volume = 1.0;

    playButton.addEventListener('click', function() {
        if (audio.paused) {
            audio.play();
            playButton.textContent = 'НЕ НАЖИМАТЬ';
        } else {
            audio.pause();
            playButton.textContent = 'ТЫ КЛОУН';
        }
    });


    setInterval(createRandomElements, 1000);
});

function createRandomElements() {
    const numberOfElements = 10; // Укажите желаемое количество элементов
    const elements = ['clown_nose.png', 'clown_shoe.png', 'balloon.png'];

    for (let i = 0; i < numberOfElements; i++) {
        const element = document.createElement('img');
        element.src = elements[Math.floor(Math.random() * elements.length)];
        element.className = 'random-element';
        element.style.position = 'absolute';
        element.style.left = Math.random() * (window.innerWidth - 100) + 'px';
        element.style.top = Math.random() * (window.innerHeight - 100) + 'px';
        element.style.width = '50px';
        element.style.height = 'auto';
        element.style.zIndex = 999;
        document.body.appendChild(element);

        setTimeout(() => {
            element.remove();
        }, 1000);
    }
}

