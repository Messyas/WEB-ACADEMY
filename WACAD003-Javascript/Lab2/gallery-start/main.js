const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Declaring the array of image filenames */

const images = [
    "pic1.jpg",
    "pic2.jpg",
    "pic3.jpg",
    "pic4.jpg",
    "pic5.jpg"
]

/* Declaring the alternative text for each image file */

const alts = {
    "pic1.jpg" : "imagem de um zoio",
    "pic2.jpg" : "Provavel planeta gasoso",
    "pic3.jpg" : "Flores da mamis",
    "pic4.jpg" : "Farao felipe coutinho",
    "pic5.jpg" : "Brabuleta dormindo na foia"
}

/* Looping through images */

for (const image of images) {
    const newImage = document.createElement('img');
    newImage.setAttribute('src', `images/${image}`);
    newImage.setAttribute('alt', alts[image]);
    thumbBar.appendChild(newImage); 
    newImage.addEventListener('click', e => {
        displayedImage.src = e.target.src;
        displayedImage.alt = e.target.alt;
    });
}

/* Wiring up the Darken/Lighten button */

btn.addEventListener('click', () => {
    if (btn.classList.contains('dark')) {
      btn.classList.replace('dark', 'light');
      btn.textContent = 'Lighten';
      overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
      return;              
    }
    btn.classList.replace('light', 'dark');
    btn.textContent = 'Darken';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0)';
  });

