const loginScreen = document.getElementById('login-screen');
const questionScreen = document.getElementById('question-screen');
const nameInput = document.getElementById('name-input');
const startBtn = document.getElementById('start-btn');
const topLeftBtn = document.getElementById('top-left-btn');
const title = document.getElementById('title');
const noBtn = document.getElementById('no-btn');
const yesBtn = document.getElementById('yes-btn');

// Azione per il pulsante start
startBtn.addEventListener('click', () => {
    const name = nameInput.value.trim();
    if (name.toLowerCase() === 'cristina' || name.toLowerCase() === 'maria cristina' || name.toLowerCase() === 'ma. cristina') {
        loginScreen.style.display = 'none';
        questionScreen.style.display = 'flex';
        title.innerHTML = `I LOVE YOU SO MUCH <span class="highlight">${name}</span>`;
    } else {
        alert('You are not my girlfriend, please if you are not Cristina Magallanes you should not be here ;)');
    }
});

// Evita che il pulsante no sia cliccabile
noBtn.addEventListener('mouseover', () => {
    const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
    const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);
    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;
});

yesBtn.addEventListener('click', () => {
    setTimeout(() => {
        window.open('https://www.poemist.com/jose-corazon-de-jesus/kamay-ng-birhen', '_blank');
    }, 100); // ritardo
    setTimeout(() => {
        window.open('https://music.youtube.com/watch?v=-sNgBet587k', '_blank');
    }, 200); // ritardo
})

topLeftBtn.addEventListener('click', () => {
    alert("Hold the mouse click for 3 seconds ;)");
})

let lastHeartTime = 0; // Memorizza l'ultimo tempo in cui è stato creato un cuore

// Crea cuori al movimento del mouse
document.addEventListener('mousemove', (e) => {
    const now = Date.now(); // Ottieni il tempo attuale in millisecondi

    const inputRect = nameInput.getBoundingClientRect(); // Ottieni le dimensioni e la posizione dell'input
    const startBtnRect = startBtn.getBoundingClientRect();
    const topLeftBtnRect = topLeftBtn.getBoundingClientRect();
    const yesBtnRect = yesBtn.getBoundingClientRect();

    const isMouseOverTopLeftBtn = e.pageX >= topLeftBtnRect.left && e.pageX <= topLeftBtnRect.right &&
                                  e.pageY >= topLeftBtnRect.top && e.pageY <= topLeftBtnRect.bottom;
    
    const isMouseOverYestBtn = e.pageX >= yesBtnRect.left && e.pageX <= yesBtnRect.right &&
                                  e.pageY >= yesBtnRect.top && e.pageY <= yesBtnRect.bottom;

    const isMouseOverInput = e.pageX >= inputRect.left && e.pageX <= inputRect.right &&
                             e.pageY >= inputRect.top && e.pageY <= inputRect.bottom;

    const isMouseOverStartBtn = e.pageX >= startBtnRect.left && e.pageX <= startBtnRect.right &&
                           e.pageY >= startBtnRect.top && e.pageY <= startBtnRect.bottom;

    // Crea un cuore solo se sono passati almeno 100ms dall'ultimo
    if (now - lastHeartTime > 100 && !isMouseOverInput && !isMouseOverStartBtn && !isMouseOverTopLeftBtn && !isMouseOverYestBtn) {
        const heart = document.createElement('img');
        heart.src = 'assets/cute heart.png'; // Percorso dell'immagine del cuore
        heart.classList.add('heart');
        heart.style.position = 'absolute'; // Aggiungi posizione assoluta per il movimento
        heart.style.left = `${e.pageX - 15}px`; // Regola la posizione per centrare il cuore
        heart.style.top = `${e.pageY - 15}px`;

        document.body.appendChild(heart);

        // Rimuovi il cuore dopo 2 secondi
        setTimeout(() => {
            heart.remove();
        }, 2000);

        lastHeartTime = now; // Aggiorna l'ultimo tempo
    }
});

let isMousePressed = false; // indica se il mouse è premuto
let heartImage = null; // Memorizza l'immagine che si ingrandisce
let scaleInterval = null; // Memorizza l'intervallo per ingrandire il cuore

// crea e mostra l'immagine al clic del mouse
document.addEventListener('mousedown', (e) => {
    // verifica se il clic è su elementi da escludere
    if (e.target === startBtn || e.target === nameInput || e.target === topLeftBtn || e.target === yesBtn) {
        return; // interrompi l'esecuzione se il clic è sul pulsante o sull'input
    }

    // Crea l'immagine del cuore solo se non esiste già
    if (!heartImage) { 
        heartImage = document.createElement('img');
        heartImage.src = 'assets/cute heart.png';
        heartImage.style.position = 'absolute';
        heartImage.style.left = `${e.pageX - heartImage.width / 2}px`;
        heartImage.style.top = `${e.pageY - heartImage.height / 2}px`;
        heartImage.style.transform = 'scale(0.2)';
        heartImage.style.transition = 'none'; // Disabilita transizioni per un ingrandimento continuo

        document.body.appendChild(heartImage);
    }

    isMousePressed = true; // il mouse è premuto

    // Ingrandimento continuo con un intervallo
    if (!scaleInterval) {
        scaleInterval = setInterval(() => {
            // Aumenta la scala del cuore
            const currentScale = parseFloat(heartImage.style.transform.replace('scale(', '').replace(')', '')) || 1;
            heartImage.style.transform = `scale(${currentScale + 0.01})`; // Incrementa la scala
        }, 70); // Ogni 100ms, incrementa la scala di 0.05
    }
});

// Fermare l'ingrandimento quando il mouse viene rilasciato
document.addEventListener('mouseup', () => {
    isMousePressed = false;
    clearInterval(scaleInterval); // Ferma l'ingrandimento
    scaleInterval = null; // Reset dell'intervallo

    if (heartImage) {
        setTimeout(() => {
            heartImage.remove();
            heartImage = null; // Reset dell'immagine
        }, 500); // Rimuove l'immagine dopo un piccolo ritardo
    }
});

let mousePressTimeout = null; // Memorizza il timer per il tempo di pressione del mouse
let second = 0; 
let gif = null;

// gestione del clic del mouse per rilevare il tempo di pression
document.addEventListener('mousedown', (e) => {

    if (!gif) {
        gif = document.createElement('img');
        gif.src = '/assets/tonton-heart-running.gif';
        gif.style.position = 'absolute';
        gif.style.left = `${e.pageX - gif.width / 2}px`;
        gif.style.top = `${e.pageY - gif.height / 2}px`;
        gif.style.width = '300px';
    }

    second = 0;

    mousePressTimeout = setInterval(() => {
        second += 1;
        if (second === 3) {
            heartImage.remove();
            heartImage = null;
            document.body.appendChild(gif);
            clearInterval(mousePressTimeout);
        } 
    }, 1000);
});

// quando il mouse viene rilasciato ferma il timer
document.addEventListener('mouseup', () => {
    clearInterval(mousePressTimeout); // ferma il timer
});