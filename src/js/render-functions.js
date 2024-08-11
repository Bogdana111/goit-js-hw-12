import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export function renderImageCard(data) {
  const lightbox = new SimpleLightbox('.gallery a', {
    captions: true,
    captionsData: 'alt',
    captionPosition: 'bottom',
    captionDelay: 250,
  });
  const gallery = document.querySelector('.gallery');

  const markup = data.hits
    .map(
      image => `<div class="image-wrapper">
    <a href="${image.largeImageURL}">
    <img class="gallery-images" src="${image.webformatURL}" alt="${image.tags}"></img>
    </a>
    <div class="text-wrapper">
    <div class="text-item"><h5 class="text-header">Likes</h5><p class="text-info">${image.likes}</p></div>
    <div class="text-item"><h5 class="text-header">Views</h5><p class="text-info">${image.views}</p></div>
    <div class="text-item"><h5 class="text-header">Comments</h5><p class="text-info">${image.comments}</p></div>
    <div class="text-item"><h5 class="text-header">Downloads</h5><p class="text-info">${image.downloads}</p></div>
    </div>
    </div>`
    )
    .join('');
  gallery.insertAdjacentHTML('beforeend', markup);

  lightbox.refresh();
}

export function clearGallery(container) {
  const gallery = document.querySelector('.gallery');
  gallery.innerHTML = '';
}
