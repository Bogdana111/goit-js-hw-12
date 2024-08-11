// import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import '../src/css/styles.css';
import { fetchImages } from './js/pixabay-api';
import { renderImageCard, clearGallery } from './js/render-functions';

const searchForm = document.querySelector('.search-form');
const loader = document.querySelector('.loader');
const input = document.querySelector('.input-text');

searchForm.addEventListener('submit', handleSearch);

let currentPage = 1;
let currentQuery = '';

async function handleSearch(event) {
  event.preventDefault();
  const searchWord = input.value.trim().toLowerCase();

  if (searchWord === '') {
    iziToast.error({
      position: 'topRight',
      message: 'Search query cannot be empty. Please enter a keyword!',
    });
    return;
  }

  currentQuery = searchWord;
  currentPage = 1;

  clearGallery();
  loader.classList.remove('hidden');
  document.querySelector('.load-more').classList.add('hidden');

  try {
    const data = await fetchImages(currentQuery, currentPage);

    if (data.total === 0) {
      iziToast.error({
        position: 'topRight',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
    } else {
      renderImageCard(data);
      if (data.totalHits > 15) {
        document.querySelector('.load-more').classList.remove('hidden');
      }
    }
  } catch (error) {
    iziToast.error({
      position: 'topRight',
      message: 'An error occurred while fetching data. Please try again later.',
    });
    console.error(error);
  } finally {
    loader.classList.add('hidden');
  }

  searchForm.reset();
}
const loadMoreBtn = document.querySelector('.load-more');

loadMoreBtn.addEventListener('click', async () => {
  currentPage += 1;
  loader.classList.remove('hidden');

  try {
    const data = await fetchImages(currentQuery, currentPage);

    renderImageCard(data);

    const { height: cardHeight } = document
      .querySelector('.gallery')
      .firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 20,
      behavior: 'smooth',
    });

    if (currentPage * 15 >= data.totalHits) {
      loadMoreBtn.classList.add('hidden');
      iziToast.info({
        position: 'topRight',
        message: "We're sorry, but you've reached the end of search results.",
      });
    }
  } catch (error) {
    iziToast.error({
      position: 'topRight',
      message: 'An error occurred while loading more images.',
    });
    console.error(error);
  } finally {
    loader.classList.add('hidden');
  }
});
