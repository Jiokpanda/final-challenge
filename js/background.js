const div = document.querySelector(".background");
const images = ["0.jpg", "1.jpg", "2.jpg", "3.jpg", "4.jpg"];

// select random image from [images] using Math.random() and Math.floor()
const chosenImage = images[Math.floor(Math.random() * images.length)];

// add image url to div.background
div.style.backgroundImage = `url('img/${chosenImage}')`;