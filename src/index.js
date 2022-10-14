import './css/styles.css';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { getPictures } from './js/pixabay';
import { createMarkup, clearMarkup } from './js/markup';
import { formRef, galleryRef, loadRef } from './js/refs';

formRef.addEventListener('submit', onSubmit);
loadRef.addEventListener('click', onLoadClick);

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
    const { total, hits, totalHits } = searchData;
    Notiflix.Notify.success(`Hooray! We found ${totalHits} images!`);
    if (total.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }
    const markup = hits.map(item => createMarkup(item)).join('');
    console.log(markup);
    galleryRef.innerHTML = markup;
  } catch (error) {
    console.log('Упс!');
    console.log(error);
  }
}

function onLoadClick(event) {
  const markup = createMarkup(hits);
  galleryRef.insertAdjacentHTML('beforeend', markup);
}
