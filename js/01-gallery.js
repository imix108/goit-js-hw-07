import { galleryItems } from './gallery-items.js';

const gallery = document.querySelector('.gallery');

function createGalleryItems(items) {
  return items
    .map(({ preview, original, description }) => {
      return `
        <li class="gallery__item">
          <a class="gallery__link" href="${original}">
            <img
              class="gallery__image"
              src="${preview}"
              data-source="${original}"
              alt="${description}"
            />
          </a>
        </li>
      `;
    })
    .join('');
}

gallery.innerHTML = createGalleryItems(galleryItems);


gallery.addEventListener('click', (event) => {
  event.preventDefault();
  if (event.target.nodeName === 'IMG') {
    const imageSrc = event.target.getAttribute('data-source');
    const imageAlt = event.target.getAttribute('alt');
    openModal(imageSrc, imageAlt);
  }
});

function openModal(src, alt) {
  const modal = basicLightbox.create(`
    <img src="${src}" alt="${alt}">
  `);

  modal.show();

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      modal.close();
    }
  });
}
