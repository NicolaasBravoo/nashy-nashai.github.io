document.addEventListener('DOMContentLoaded', () => {
  let allImages = [];

  function loadAllImages() {
    const galeria = document.getElementById('galeria');

    allImages.forEach(url => {
      const img = document.createElement('img');
      img.src = url;
      img.alt = 'Foto';
      img.className = "w-full rounded-lg shadow-md filter grayscale hover:grayscale-0 hover:scale-105 transition-all duration-300 mb-2 cursor-pointer";
      img.loading = "lazy";

      img.addEventListener('click', () => mostrarLightbox(url));
      galeria.appendChild(img);
    });
  }

  function mostrarLightbox(url) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    lightboxImg.src = url;
    lightbox.classList.remove('hidden');
  }

  function cerrarLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    lightbox.classList.add('hidden');
    lightboxImg.src = '';
  }

  document.getElementById('cerrarLightbox').addEventListener('click', cerrarLightbox);

  document.getElementById('lightbox').addEventListener('click', cerrarLightbox);


  fetch('./galeria/images.json')
    .then(res => res.json())
    .then(imagenes => {
      allImages = imagenes;
      loadAllImages();
    })
    .catch(error => {
      console.error("Error cargando imágenes:", error);
    });
});
