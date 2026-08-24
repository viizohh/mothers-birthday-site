// Get all rolodex cards
const cards = document.querySelectorAll('.rolodex-card');

// Attach click handlers to cards
cards.forEach((card, index) => {
    card.addEventListener('click', () => {
        const cardNumber = String(index + 1).padStart(2, '0');
        window.location.href = `detail-${cardNumber}.html`;
    });
});

// Quiz data for the locks
const quizData = {
    lock1: {
        question: "Which Luther Vandross song was the title track of his debut solo album?",
        options: [
            { text: "A) Never Too Much", correct: true },
            { text: "B) Here and Now", correct: false },
            { text: "C) Power of Love", correct: false },
            { text: "D) Dance with My Father", correct: false }
        ],
        unlockMessage: "the gift isnt here",
        showHeader: false
    },
    lock2: {
        question: "When was Destiny's Child Debut Album Released?",
        options: [
            { text: "A: 1999", correct: false },
            { text: "B: 1998", correct: true },
            { text: "C: 1997", correct: false },
            { text: "D: 1996", correct: false }
        ],
        unlockMessage: "redeemable paid for dinner date at any restaurant you want",
        showHeader: true
    },
    lock3: {
        question: "What year was the first iPhone released?",
        options: [
            { text: "A) 2005", correct: false },
            { text: "B) 2006", correct: false },
            { text: "C) 2007", correct: true },
            { text: "D) 2008", correct: false }
        ],
        unlockMessage: "the gift isnt here",
        showHeader: false
    },
    lock4: {
        question: "What is the capital of France?",
        options: [
            { text: "A) London", correct: false },
            { text: "B) Berlin", correct: false },
            { text: "C) Madrid", correct: false },
            { text: "D) Paris", correct: true }
        ],
        unlockMessage: "the gift isnt here",
        showHeader: false
    },
    lock5: {
        noQuiz: true,
        unlockMessage: "free present: any trades class you want to do for free! everyone invited (freeish)...",
        showHeader: true
    }
};

// Get modal elements
const quizModal = document.getElementById('quizModal');
const unlockModal = document.getElementById('unlockModal');
const closeBtn = document.querySelector('.close');
const closeUnlockBtn = document.querySelector('.close-unlock');
const quizQuestion = document.getElementById('quizQuestion');
const quizOptions = document.getElementById('quizOptions');
const quizResult = document.getElementById('quizResult');
const unlockMessage = document.getElementById('unlockMessage');
const unlockHeader = document.getElementById('unlockHeader');

let currentLock = null;
let currentQuiz = null;

// Lock click handlers - always show quiz, no persistence
['lock1', 'lock2', 'lock3', 'lock4', 'lock5'].forEach(lockId => {
    document.getElementById(lockId)?.addEventListener('click', () => {
        currentLock = lockId;
        currentQuiz = quizData[lockId];

        // If it's a free lock (no quiz), show message immediately
        if (quizData[lockId].noQuiz) {
            showUnlockMessage(quizData[lockId].unlockMessage, quizData[lockId].showHeader);
        } else {
            showQuiz(quizData[lockId]);
        }
    });
});

// Show quiz modal
function showQuiz(quiz) {
    quizQuestion.textContent = quiz.question;
    quizOptions.innerHTML = '';
    quizResult.textContent = '';

    quiz.options.forEach((option, index) => {
        const btn = document.createElement('div');
        btn.className = 'quiz-option';
        btn.textContent = option.text;
        btn.addEventListener('click', () => checkAnswer(option.correct, quiz.unlockMessage, btn));
        quizOptions.appendChild(btn);
    });

    quizModal.style.display = 'block';
}

// Generate random position for lock
function getRandomPosition() {
    const topMin = 20, topMax = 80;
    const leftMin = 10, leftMax = 90;

    const top = Math.random() * (topMax - topMin) + topMin;
    const left = Math.random() * (leftMax - leftMin) + leftMin;

    return { top: `${top}%`, left: `${left}%` };
}

// Move lock to random position
function moveLock(lockId) {
    const lockElement = document.getElementById(lockId);
    const pos = getRandomPosition();
    lockElement.style.top = pos.top;
    lockElement.style.left = pos.left;
    lockElement.style.right = 'auto';
}

// Check answer
function checkAnswer(isCorrect, message, button) {
    const allOptions = document.querySelectorAll('.quiz-option');
    allOptions.forEach(opt => opt.style.pointerEvents = 'none');

    if (isCorrect) {
        button.classList.add('correct');
        quizResult.textContent = '✓ Correct!';

        setTimeout(() => {
            quizModal.style.display = 'none';
            unlockLock(currentLock, message, currentQuiz.showHeader);
        }, 1500);
    } else {
        button.classList.add('incorrect');
        quizResult.textContent = '✗ Try again!';

        setTimeout(() => {
            quizModal.style.display = 'none';
            moveLock(currentLock);
        }, 1000);
    }
}

// Unlock lock
function unlockLock(lockId, message, showHeader) {
    showUnlockMessage(message, showHeader);
}

// Show unlock message
function showUnlockMessage(message, showHeader = true) {
    unlockMessage.textContent = message;
    if (showHeader) {
        unlockHeader.style.display = 'block';
    } else {
        unlockHeader.style.display = 'none';
    }
    unlockModal.style.display = 'block';
}

// Close modal handlers
closeBtn?.addEventListener('click', () => {
    quizModal.style.display = 'none';
});

closeUnlockBtn?.addEventListener('click', () => {
    unlockModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === quizModal) {
        quizModal.style.display = 'none';
    }
    if (e.target === unlockModal) {
        unlockModal.style.display = 'none';
    }
});
