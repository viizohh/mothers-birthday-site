// Image data with descriptive titles
const imageData = [
    { file: 'photo-01.jpg', title: 'Christmas Tree', detailPage: 'detail-01.html' },
    { file: 'photo-02.jpg', title: 'Fury', detailPage: 'detail-02.html' },
    { file: 'photo-03.jpg', title: 'Summer Time', detailPage: 'detail-03.html' },
    { file: 'photo-04.jpg', title: 'Dad and Mom', detailPage: 'detail-04.html' },
    { file: 'photo-05.jpg', title: 'Money Spread', detailPage: 'detail-05.html' },
    { file: 'photo-06.jpg', title: 'Settings Walk', detailPage: 'detail-06.html' },
    { file: 'photo-07.jpg', title: 'Graduation', detailPage: 'detail-07.html' },
    { file: 'photo-08.jpg', title: 'Nature Pose', detailPage: 'detail-08.html' },
    { file: 'photo-09.jpg', title: 'Navy Hoodie', detailPage: 'detail-09.html' },
    { file: 'photo-10.jpg', title: 'Little Islands', detailPage: 'detail-10.html' }
];

const gallery = document.getElementById('gallery');

// Shuffle array helper
function shuffle(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Create grid cells with images - no repeats
function createGrid() {
    const rows = 20;
    const cols = 20;
    const totalCells = rows * cols;

    // Create enough shuffled copies to fill the grid without immediate repeats
    const shuffledPool = [];
    const copiesNeeded = Math.ceil(totalCells / imageData.length);

    for (let i = 0; i < copiesNeeded; i++) {
        shuffledPool.push(...shuffle(imageData));
    }

    for (let i = 0; i < totalCells; i++) {
        const cell = document.createElement('div');
        cell.className = 'gallery-cell';

        const img = document.createElement('img');
        const imageInfo = shuffledPool[i];
        img.src = `images/${imageInfo.file}`;
        img.alt = imageInfo.title;
        img.loading = 'lazy';

        // Make cell clickable
        cell.style.cursor = 'pointer';
        cell.addEventListener('click', () => {
            window.location.href = imageInfo.detailPage;
        });

        cell.appendChild(img);
        gallery.appendChild(cell);
    }
}

// Infinite scroll logic - seamless looping
function handleScroll() {
    const scrollTop = gallery.scrollTop;
    const scrollLeft = gallery.scrollLeft;
    const scrollHeight = gallery.scrollHeight;
    const scrollWidth = gallery.scrollWidth;
    const clientHeight = gallery.clientHeight;
    const clientWidth = gallery.clientWidth;

    const threshold = 50; // Smaller threshold to allow more scrolling before reset

    // Reset scroll position when very close to edges for seamless infinite effect
    if (scrollTop <= threshold) {
        gallery.scrollTop = (scrollHeight - clientHeight) / 2;
    } else if (scrollTop + clientHeight >= scrollHeight - threshold) {
        gallery.scrollTop = (scrollHeight - clientHeight) / 2;
    }

    if (scrollLeft <= threshold) {
        gallery.scrollLeft = (scrollWidth - clientWidth) / 2;
    } else if (scrollLeft + clientWidth >= scrollWidth - threshold) {
        gallery.scrollLeft = (scrollWidth - clientWidth) / 2;
    }
}

// Initialize
createGrid();

// Set initial scroll position to middle
setTimeout(() => {
    const clientHeight = gallery.clientHeight;
    const clientWidth = gallery.clientWidth;
    gallery.scrollTop = (gallery.scrollHeight - clientHeight) / 2;
    gallery.scrollLeft = (gallery.scrollWidth - clientWidth) / 2;
}, 100);

// Add scroll listener
gallery.addEventListener('scroll', handleScroll, { passive: true });
