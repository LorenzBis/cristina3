const loginScreen = document.getElementById('login-screen');
const questionScreen = document.getElementById('question-screen');
const nameInput = document.getElementById('name-input');
const startBtn = document.getElementById('start-btn');
const title = document.getElementById('title');
const noBtn = document.getElementById('no-btn');

// Azione per il pulsante start
startBtn.addEventListener('click', () => {
    const name = nameInput.value.trim();
    if (name) {
        loginScreen.style.display = 'none';
        questionScreen.style.display = 'flex';
        title.innerHTML = `Do you still love me, <span class="highlight">${name}</span>?`;
    } else {
        alert('Please enter your name!');
    }
});

// Evita che il pulsante no sia cliccabile
noBtn.addEventListener('mouseover', () => {
    const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
    const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);
    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;
})

let lastHeartTime = 0; // Memorizza l'ultimo tempo in cui è stato creato un cuore

// Crea cuori al movimento del mouse
document.addEventListener('mousemove', (e) => {
    const now = Date.now(); // Ottieni il tempo attuale in millisecondi

    const inputRect = nameInput.getBoundingClientRect(); // Ottieni le dimensioni e la posizione dell'input
    const btnRect = startBtn.getBoundingClientRect();

    const isMouseOverInput = e.pageX >= inputRect.left && e.pageX <= inputRect.right &&
                             e.pageY >= inputRect.top && e.pageY <= inputRect.bottom;

    const isMouseOverBtn = e.pageX >= btnRect.left && e.pageX <= btnRect.right &&
                           e.pageY >= btnRect.top && e.pageY <= btnRect.bottom;

    // Crea un cuore solo se sono passati almeno 100ms dall'ultimo
    if (now - lastHeartTime > 100 && !isMouseOverInput && !isMouseOverBtn) {
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
