document.addEventListener('DOMContentLoaded', () => {
  let imagenesMias = [];
  let imagenesIG = [];

  const galeria = document.getElementById('galeria');

  function mostrarImagenes(urls) {
    galeria.innerHTML = '';

    urls.forEach(url => {
      const img = document.createElement('img');
      img.src = url;
      img.alt = 'Foto';
      img.className = "w-full rounded-lg shadow-md filter grayscale hover:grayscale-0 hover:scale-105 transition-all duration-300 mb-2 cursor-pointer";
      img.loading = "lazy";
      img.addEventListener('click', () => mostrarLightbox(url));
      galeria.appendChild(img);
    });
  }

  function mostrarPostsIG(posts) {
    galeria.innerHTML = '';

    posts.forEach(link => {
      const iframe = document.createElement('iframe');
      iframe.src = `${link}embed`;
      iframe.setAttribute('frameborder', '0');
      iframe.setAttribute('scrolling', 'no');
      iframe.setAttribute('allowtransparency', 'true');
      iframe.className = "w-full max-w-[300px] min-h-[400px] max-h-[500] mx-auto mb-6 rounded-lg shadow-lg";
      galeria.appendChild(iframe);
    });

    // Necesario para que Instagram procese los embeds
    if (window.instgrm) {
      window.instgrm.Embeds.process();
    }
  }

  function mostrarLightbox(url) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    lightboxImg.src = url;
    lightbox.classList.remove('hidden');
  }

  function cerrarLightbox() {
    document.getElementById('lightbox').classList.add('hidden');
    document.getElementById('lightboxImg').src = '';
  }

  document.getElementById('cerrarLightbox').addEventListener('click', cerrarLightbox);
  document.getElementById('lightbox').addEventListener('click', cerrarLightbox);

  // Cargar datos
  fetch('./galeria/images.json')
    .then(res => res.json())
    .then(data => {
      imagenesMias = data.mias || [];
      imagenesIG = data.instagram || [];

      // Mostrar por defecto: fotos personales
      mostrarImagenes(imagenesMias);
    });

  // Selector de pestañas
  const btnMias = document.getElementById('btn-mias');
  const btnIG = document.getElementById('btn-instagram');

  btnMias.addEventListener('click', () => {
    btnMias.classList.add('active');
    btnIG.classList.remove('active');
    mostrarImagenes(imagenesMias);
  });

  btnIG.addEventListener('click', () => {
    btnIG.classList.add('active');
    btnMias.classList.remove('active');
    mostrarPostsIG(imagenesIG);
  });
});
