let galleryIndex = 1;

window.plusGallery = function (n) {
  showGallery((galleryIndex += n));
};

window.currentGallery = function (n) {
  showGallery((galleryIndex = n));
};

function showGallery(n) {
  const slides = document.getElementsByClassName('gallerySlide');
  const dots = document.getElementsByClassName('galleryDot');

  if (n > slides.length) galleryIndex = 1;
  if (n < 1) galleryIndex = slides.length;

  for (let i = 0; i < slides.length; i++) slides[i].style.display = 'none';
  for (let i = 0; i < dots.length; i++)
    dots[i].className = dots[i].className.replace(' active', '');

  slides[galleryIndex - 1].style.display = 'block';
  dots[galleryIndex - 1].className += ' active';
}

showGallery(galleryIndex);
