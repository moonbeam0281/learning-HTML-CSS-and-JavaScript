let imagePaths = [];
let currentIndex = 0;

const prevDiv = document.querySelector('.prev');
const currDiv = document.querySelector('.current');
const nextDiv = document.querySelector('.next');

fetch('/api/images')
  .then(res => res.json())
  .then(data => {
    imagePaths = data;
    updateImages();
  });

function updateImages() {
    const total = imagePaths.length;
    const prevI = (currentIndex-1 + total) % total;
    const nextI = (currentIndex + 1) % total;
    prevDiv.style.backgroundImage = `url(${imagePaths[prevI]})`;
    currDiv.style.backgroundImage = `url(${imagePaths[currentIndex]})`;
    nextDiv.style.backgroundImage = `url(${imagePaths[nextI]})`;
}

function rotate(direction) {
  const total = imagePaths.length;
  if (direction === 'left') {
    currentIndex = (currentIndex - 1 + total) % total;
  } else {
    currentIndex = (currentIndex + 1) % total;
  }
  updateImages();
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') rotate('left');
  if (e.key === 'ArrowRight') rotate('right');
});

prevDiv.addEventListener('click', () => rotate('left'));
nextDiv.addEventListener('click', () => rotate('right'));
currDiv.addEventListener('click', () => rotate('right'));