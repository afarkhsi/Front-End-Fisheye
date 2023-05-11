import {mediaData, mediaPhotographer} from '../pages/photographerController.js'


const dateBtn = document.querySelector('.selector__element2')
const popularityBtn = document.querySelector('.selector__element1')
const titleBtn = document.querySelector('.selector__element3')
const navTab = document.querySelector('.dropdown')
// --- Utils function --- //

// Sort data by date
export const sortByDate = (data) => {
  const copyData = [...data]

  return copyData.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    if (dateA > dateB) {
      return -1;
    }
    if (dateA < dateB) {
      return 1;
    }
    console.log(copyData)
    return 0
  }); 
}

// Listener sort by date
dateBtn.addEventListener('click', function () {
  const dataSorted = sortByDate(mediaPhotographer)
  mediaData(dataSorted)
})

dateBtn.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const dataSorted = sortByDate(mediaPhotographer)
    mediaData(dataSorted)
  }
})


// // Listener sort by likes
popularityBtn.addEventListener("click", function () {
  const popularityArray = Array.from(mediaPhotographer);
  popularityArray.sort(function (a, b) {
    return b.likes - a.likes
  });

  mediaData(popularityArray)
})

popularityBtn.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const popularityArray = Array.from(mediaPhotographer);
    popularityArray.sort(function (a, b) {
      return b.likes - a.likes
    });
  
    mediaData(popularityArray)
  }
})


// Listener sort by title
titleBtn.addEventListener("click", function () {
  const titleArray = Array.from(mediaPhotographer);
  titleArray.sort((a, b) => {
    const titleA = a.title.toUpperCase();
    const titleB = b.title.toUpperCase();
    if (titleA < titleB) {
      return -1;
    }
    if (titleA > titleB) {
      return 1;
    }

    return 0
  });
  mediaData(titleArray)
})

titleBtn.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const titleArray = Array.from(mediaPhotographer);
    titleArray.sort((a, b) => {
      const titleA = a.title.toUpperCase();
      const titleB = b.title.toUpperCase();
      if (titleA < titleB) {
        return -1;
      }
      if (titleA > titleB) {
        return 1;
      }
  
      return 0
    });
    mediaData(titleArray)
  }
})


// Sort menu

const dropdowns = document.querySelectorAll('.dropdown');
dropdowns.forEach(dropdown => {
  const select = dropdown.querySelector('.select');
  const caret = dropdown.querySelector('.material-symbols-outlined');
  const menu = dropdown.querySelector('.menu');
  const options = dropdown.querySelectorAll('.menu li');
  const selected = dropdown.querySelector('.selected');


  select.addEventListener('click', () => {
    select.classList.toggle('select-clicked');
    caret.classList.toggle('material-symbols-outlined-rotate');
    menu.classList.toggle('menu-open');
    selected.setAttribute('aria-expanded', 'true')
    // dropdowns.setAttribute('aria-expanded')
  });

  options.forEach(option => {
    option.addEventListener('click', () => {
      selected.innerText = option.innerText;
      selected.setAttribute('aria-expanded', 'false')
      select.classList.remove('select-clicked');
      caret.classList.remove('material-symbols-outlined-rotate');
      menu.classList.remove('menu-open');

      options.forEach(option => {
        option.classList.remove('active');
      });

      option.classList.add('active');
    })

    option.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        selected.innerText = option.innerText;
        selected.setAttribute('aria-expanded', 'false')
        select.classList.remove('select-clicked');
        caret.classList.remove('material-symbols-outlined-rotate');
        menu.classList.remove('menu-open');
  
        options.forEach(option => {
          option.classList.remove('active');
        });
  
        option.classList.add('active');
      }
    })
  })

 

  //Listener nav Key
  select.addEventListener('keydown',keyHandler)

  // let sortElements = document.querySelectorAll('.selector__element')
  function keyHandler(e) {
    if (e.key === 'Enter') {
      select.classList.toggle('select-clicked');
      caret.classList.toggle('material-symbols-outlined-rotate');
      menu.classList.toggle('menu-open');
      selected.setAttribute('aria-expanded', 'true')
    }
    if (e.key === 'Escape') {
      selected.setAttribute('aria-expanded', 'false')
      select.classList.remove('select-clicked');
      caret.classList.remove('material-symbols-outlined-rotate');
      menu.classList.remove('menu-open');
    }
  }

  const focusableElementsArray = [
    '.selector__element',
  ];

  const focusableElements = navTab.querySelectorAll(focusableElementsArray)
  console.log('tableau elements à focus:', focusableElements)

})
