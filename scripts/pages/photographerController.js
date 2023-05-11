import {mediaFactory} from "../factories/mediaFactory.js";
import {PhotographersModel} from "../models/photographersModel.js";

export const parentDOM = document.querySelector("main");
const bodyDOM = document.querySelector("body");
export const urlPhotographerId = (new URL(window.location)).searchParams.get("id");

const photographersModel = new PhotographersModel('data/photographers.json');
export const photographer = await photographersModel.getPhotographerById(urlPhotographerId);

export const mediaPhotographer = await photographersModel.getMediaForOnePhotographer(urlPhotographerId);

const mediaDataContainer = document.querySelector(".photographer-media-container")
const filterContainer = document.querySelector(".photographer-filter-container")
const bannerContainer = document.querySelector(".photographer-banner-container")

async function init() {
  await bannerData(photographer);
  // await likePriceData(photographer);
  formData(photographer);
  await mediaData(mediaPhotographer);
  await mediaSort(mediaPhotographer);

  // Lightbox.init()
}

await init();

// FONCTION BANNER PHOTOGRAPHE
async function bannerData(data) {
  bannerContainer.appendChild(photographerFactory(data).getUserBannerDOM());
}

// FONCTION SORT MEDIA
async function mediaSort(data) {
  filterContainer.appendChild(mediaFactory(data).getUserMediaSortDOM());
}


// FONCTION GALERIE MEDIAS PHOTOGRAPHE
export async function mediaData(data) {
  mediaDataContainer.innerHTML = "";
  data.forEach((media) => {
    mediaDataContainer.appendChild(mediaFactory(media).getUserMediaDOM())
  });
  parentDOM.appendChild(mediaFactory(data).getLikesPrice());
}

// // FONCTION ENCARD PRIX PHOTOGRAPHE
// async function likePriceData(data) {
//   parentDOM.appendChild(mediaFactory(data).getLikesPrice());
// }

// FONCTION MODAL FORM
function formData() {
  bodyDOM.appendChild(contactForm(photographer).getContactFormDOM());
}

// // FOCUS TAB 

// const focusableElementsArray = [
//   '[href]',
//   'button:not([disabled])',
//   'input:not([disabled])',
//   'select:not([disabled])',
//   'img',
//   'video',
//   'div',
//   'article .picture_block'
// ];

// const focusableElements = bodyDOM.querySelectorAll(focusableElementsArray)
//   console.log('tableau elements à focus:', focusableElements)

// const firstFocusableElement = focusableElements[0]
// console.log('premier element focus:', firstFocusableElement)

// const lastFocusableElement = focusableElements[focusableElements.length -1]
//   // console.log('dernier element focus:', lastFocusableElement)

// const keyCode = {
//   tab: 9, 
// };

// firstFocusableElement.focus()

// focusableElements.forEach((focusableElement) => {
//   if (focusableElement.addEventListener) {
//     focusableElement.addEventListener('keydown', (event) => {
//       const tab = event.which === keyCode.tab;

//       if (!tab) {
//         return;
//       }

//       if (event.shiftKey) {
//         if (event.target === firstFocusableElement) { // shift + tab
//           event.preventDefault();

//           lastFocusableElement.focus();
//         }
//       } else if (event.target === lastFocusableElement) { // tab
//         event.preventDefault();

//         firstFocusableElement.focus();
//       }
//     });
//   }
// });