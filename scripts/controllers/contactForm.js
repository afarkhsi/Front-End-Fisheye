const body = document.getElementById('body')
const mainWrapper = document.getElementById('main')

const bannerDom = document.querySelector('.photographer-banner-container')
const mediaDom = document.querySelector('.photographer-media-container')
const filterDom = document.querySelector('.photographer-filter-container')
const header = document.querySelector('header')

function displayModal() {
  const modal = document.querySelector(".contact_modal");
  const encard = document.querySelector('.likes_price');
  const form = document.querySelector(".form");
  modal.style.visibility = "visible";
  header.setAttribute('aria-hidden', 'true');
  mainWrapper.setAttribute('aria-hidden', 'true');
  modal.setAttribute('aria-hidden', 'false');
  body.classList.add('no-scroll');
  form.reset();

  mediaDom.style.opacity = "0.3";
  bannerDom.style.opacity = "0.3";
  filterDom.style.opacity = "0.3";
  encard.style.opacity = "0";
  header.style.opacity = "0.3";
}

function closeModal() {
  const modal = document.querySelector(".contact_modal");
  const encard = document.querySelector('.likes_price');
  modal.style.visibility = "hidden";
  header.setAttribute('aria-hidden', 'false');
  mainWrapper.setAttribute('aria-hidden', 'false');
  modal.setAttribute('aria-hidden', 'true');
  body.classList.remove('no-scroll');
  //TODO: traiter cela avec une classe
  mediaDom.style.opacity = "1";
  bannerDom.style.opacity = "1";
  filterDom.style.opacity = "1";
  header.style.opacity = "1";
  encard.style.opacity = "1";
}


function validate() {
  const form = document.querySelector(".form");
  const formData = new FormData(form)
  console.log(`
    --VOTRE EMAIL A ÉTÉ ENVOYÉ AVEC SUCCES--

    Prenom: ${formData.get('firstname')},
    Nom: ${formData.get('lastname')},
    Email: ${formData.get('email')},

    Message : ${formData.get('message')}
    `)
  form.reset()
  closeModal()
}


document.addEventListener('keydown', function (event) {
  const modal = document.querySelector(".contact_modal");
  if (event.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') {
    closeModal()
  }
})
