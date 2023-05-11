// DOM Elements
const body = document.getElementById('body')
const mainWrapper = document.getElementById('main')
const bannerDom = document.querySelector('.photographer-banner-container')
const mediaDom = document.querySelector('.photographer-media-container')
const filterDom = document.querySelector('.photographer-filter-container')
const header = document.querySelector('header')

const focusableElementsArray = [
  '[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
];

// eslint-disable-next-line no-unused-vars
function displayModal() {
  //DOM Elements
  const modal = document.querySelector(".contact_modal");
  const encard = document.querySelector('.likes_price');
  const form = document.querySelector(".form");
  const formData = document.querySelectorAll(".formData");

  //Display et style à l'ouverture de la modale
  modal.style.visibility = "visible";
  header.setAttribute('aria-hidden', 'true');
  mainWrapper.setAttribute('aria-hidden', 'true');
  modal.setAttribute('aria-hidden', 'false');
  body.classList.add('no-scroll');

  formData.forEach((data) => data.setAttribute("data-error-visible", "false"));

  form.reset();

  mediaDom.style.opacity = "0.3";
  bannerDom.style.opacity = "0.3";
  filterDom.style.opacity = "0.3";
  encard.style.opacity = "0";
  header.style.opacity = "0.3";

  //Gestion de la navigation avec Tab

  const focusableElements = modal.querySelectorAll(focusableElementsArray)
  // console.log('tableau elements à focus:', focusableElements)

  const firstFocusableElement = focusableElements[0]
  // console.log('premier element focus:', firstFocusableElement)

  const lastFocusableElement = focusableElements[focusableElements.length -1]
  // console.log('dernier element focus:', lastFocusableElement)

  if (!firstFocusableElement) {
    return;
  }

  const keyCode = {
    tab: 9, 
  };

  firstFocusableElement.focus()

  focusableElements.forEach((focusableElement) => {
    if (focusableElement.addEventListener) {
      focusableElement.addEventListener('keydown', (event) => {
        const tab = event.which === keyCode.tab;

        if (!tab) {
          return;
        }

        if (event.shiftKey) {
          if (event.target === firstFocusableElement) { // shift + tab
            event.preventDefault();

            lastFocusableElement.focus();
          }
        } else if (event.target === lastFocusableElement) { // tab
          event.preventDefault();

          firstFocusableElement.focus();
        }
      });
    }
  });
}

function closeModal() {
  const modal = document.querySelector(".contact_modal");
  const encard = document.querySelector('.likes_price');
  modal.style.visibility = "hidden";
  header.setAttribute('aria-hidden', 'false');
  mainWrapper.setAttribute('aria-hidden', 'false');
  modal.setAttribute('aria-hidden', 'true');
  body.classList.remove('no-scroll');
  mediaDom.style.opacity = "1";
  bannerDom.style.opacity = "1";
  filterDom.style.opacity = "1";
  header.style.opacity = "1";
  encard.style.opacity = "1";

  mainWrapper.focus()
}


// eslint-disable-next-line no-unused-vars
function validate() {
  const form = document.querySelector(".form");
  const formData = document.querySelectorAll(".formData");
  //Gestion des messages d'erreur personnalisés 
  const prenom = document.querySelector('#form-firstname');
  const nom = document.querySelector('#form-lastname');
  const email = document.querySelector('#form-email');
  const message = document.querySelector('#form-message');
  const modal =  document.querySelector('.modal');

  const prenomValide = () => (prenom.value.trim().length >= 2);
  const nomValide = () => (nom.value.trim().length >= 2);
  let regexEmail = /^[a-zA-Z][a-zA-Z0-9\-_.]+@[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}$/;
  const emailValide = () => regexEmail.test(email.value);
  const messageValide = () => (message.value.trim().length >= 10);

  // console.log(prenomValide(prenom))
  // console.log(formData[0])

  let erreur = false; 

  if(!prenomValide()) {
    formData[0].setAttribute("data-error-visible", "true");
    erreur=true;
    modal.style.backgroundColor= "#e9a293"
  } else {
    formData[0].setAttribute("data-error-visible", "false");
  }
  if(!nomValide()) {
    formData[1].setAttribute("data-error-visible", "true");
    erreur=true;
    modal.style.backgroundColor= "#e9a293"
  } else {
    formData[1].setAttribute("data-error-visible", "false");
  }
  if(!emailValide()) {
    formData[2].setAttribute("data-error-visible", "true");
    erreur=true;
    modal.style.backgroundColor= "#e9a293"
  } else {
    formData[2].setAttribute("data-error-visible", "false");
  }
  if(!messageValide()) {
    formData[3].setAttribute("data-error-visible", "true");
    // eslint-disable-next-line no-unused-vars
    erreur=true;
    modal.style.backgroundColor= "#e9a293"
  } else {
    formData[3].setAttribute("data-error-visible", "false");
  }

  if(!prenomValide() === false && !nomValide() === false && !emailValide() === false && !messageValide () === false) {
    console.log(`
    --VOTRE EMAIL A ÉTÉ ENVOYÉ AVEC SUCCES--

    Prenom: ${prenom.value},
    Nom: ${nom.value},
    Email: ${email.value},

    Message : ${message.value}
    `)
  form.reset()
  closeModal()
  modal.style.backgroundColor= "#DB8876"
  }
}


document.addEventListener('keydown', function (event) {
  const modal = document.querySelector(".contact_modal");
  if (event.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') {
    closeModal()
  } else if (event.key === "tab" && modal !== null) {
    event.preventDefault()
  }
})
