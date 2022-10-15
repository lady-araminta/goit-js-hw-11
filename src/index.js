import './css/styles.css';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { getPictures, page, query } from './js/pixabay';
import { createMarkup, clearMarkup } from './js/markup';
import { formRef, galleryRef, loadRef } from './js/refs';

formRef.addEventListener('submit', onSubmit);
loadRef.addEventListener('click', onLoadClick);
galleryRef.addEventListener('click', onImgClick);

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

async function onSubmit(event) {
  event.preventDefault();
  const searchQuery = event.currentTarget.elements.searchQuery.value
    .trim()
    .toLowerCase();
  console.log(searchQuery);
  if (!searchQuery) {
    Notiflix.Notify.failure('Enter a search query!');
    return;
  }
  try {
    const searchData = await getPictures(searchQuery);
    const { hits, totalHits } = searchData;
    if (hits.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }
    Notiflix.Notify.success(`Hooray! We found ${totalHits} images!`);
    const markup = hits.map(item => createMarkup(item)).join('');
    galleryRef.innerHTML = markup;
    if (totalHits > 40) {
      loadRef.classList.remove('js-load-btn');
      page += 1;
    }
  } catch (error) {
    Notiflix.Notify.failure('Something went wrong! Please retry');
    console.log(error);
  }
}

async function onLoadClick() {
  const response = await getPictures(query);
  const { hits, totalHits } = response;
  const markup = hits.map(item => createMarkup(item)).join('');
  galleryRef.insertAdjacentHTML('beforeend', markup);
  const amountOfPages = totalHits / 40 - page;
  console.log(amountOfPages);
  imagesAreOver(amountOfPages);
}

function imagesAreOver(pages) {
  if (pages < 1) {
    loadRef.classList.add('js-load-btn');
    Notiflix.Notify.info(
      "We're sorry, but you've reached the end of search results."
    );
  }
}

function onImgClick(event) {
  event.preventDefault();
  if (event.target.nodeName !== 'IMG') {
    return;
  }
}
