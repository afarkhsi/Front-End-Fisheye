import { mediaPhotographer, photographer } from '../pages/photographerController.js'

export function mediaFactory(media) {
  const { id, photographerId, title, image, video, likes, date, price } = media;

  const wrapper = document.createElement('article');
  wrapper.classList.add("photographies")

  const picture = `assets/images/${media.photographerId}/${image}`;
  const mediaVideo = `assets/images/${media.photographerId}/${video}`;

  // Compteur like
  let compteur = likes
  let totalLikes = 0;

  // Generate Card article
  function getUserMediaDOM() {
    let mediaDOM;
    if (media.image) {
      // mediaDOM = `
      //           <article class="picture_block" aria-label="lien vers l'image">
      //               <div class="picture" data="${id}">
      //                   <img id="${id}" src="${picture}" alt="${title}"tabindex="0">
      //               </div>
      //           </article>
      //           <div class="picture_title">
      //               <h6 tabindex="0">${title}</h6>
      //               <div class="media_compteur_like">
      //                   <label id="like-${id}" for="like-${id}-input" class="compteur_like">${compteur}</label>
      //                   <input id="like-${id}-input" type="checkbox" aria-label="${compteur} likes" class="likes" onclick="">
      //               </div>
      //           </div>
      //       `
      mediaDOM = `
                <article class="picture_block" aria-label="lien vers l'image">
                    <div class="picture" data="${id}">
                        <img id="${id}" src="${picture}" alt="${title}"tabindex="0">
                    </div>
                </article>
                <div class="picture_title">
                    <h6 tabindex="0">${title}</h6>
                    <div class="media_compteur_like">
                        <label id="like-${id}" for="like-${id}-input" class="compteur_like localcounters"></label>
                        <input id="button" type="checkbox" aria-label="${compteur} likes" class="likes" onclick="">
                    </div>
                </div>
            `
    } else {
      mediaDOM = `
                <article class="picture_block" aria-label="lien vers l'image">
                    <div class="picture">
                        <video id="${id}" src="${mediaVideo}" alt="${title}" tabindex="0"></video>
                    </div>
                </article>
                <div class="picture_title">
                    <h6 tabindex="0">${title}</h6>
                    <div class="media_compteur_like">
                        <label id="like-${id}" for="like-${id}-input" class="compteur_like localcounters"></label>
                        <input id="button" type="checkbox" aria-label="${compteur} likes" class="likes"/>
                    </div>
                </div>
            `
    }
    wrapper.innerHTML = mediaDOM
    const globalCounter = document.getElementById("global-counter");
    const counters = document.querySelectorAll(".localcounters");
    const buttons = document.querySelectorAll("input[id^='button']");

    // Initialisation des compteurs
    let globalCount = totalLikes;

    let mediaCount=[];


    mediaPhotographer.forEach(media => {
      mediaCount.push(media.likes)
    })

    let counts = mediaCount;
    globalCounter.textContent = globalCount;
    counters.forEach((counter, index) => {
        counter.textContent = counts[index];
    });

    // Boucle sur chaque bouton pour ajouter les événements
    buttons.forEach((button, index) => {
        // Initialisation du compteur local
        let count = 0;

        // Événement pour le bouton
        button.addEventListener("click", (event) => {
            if (event.target.checked) {
                counts[index] += 1;
                globalCount += 1;
                counters[index].textContent = counts[index];
                globalCounter.textContent = globalCount;
            } else {
                counts[index] -= 1;
                globalCount -= 1;
                counters[index].textContent = counts[index];
                globalCounter.textContent = globalCount;
            }
            count++;
            button.textContent = count % 4 == 0 || count % 4 == 2 ? "+" : "-";
        });
    });

    // wrapper
    //   .querySelector('.likes')
    //   .addEventListener('click', (event) => {
    //     if (event.target.checked) {
    //       compteur += 1
    //       compteurJS.incrementerCompteur();
    //     } else {
    //       compteur -= 1
    //       compteurJS.decrementerCompteur();
    //     }
    //     getLikesPrice()
    //     wrapper.querySelector('input.likes').setAttribute('aria-label', `${compteur} likes`)
    //     wrapper.querySelector('label.compteur_like').innerHTML = compteur;
    //   })
    return wrapper;
  }

  // Template encard prix photographe
  const wrapperLikesPrice = document.createElement('div');
  wrapperLikesPrice.classList.add('likes_price');

  function getLikesPrice() {
    // let totalLikesCompteurJS = compteurJS.getCompteur();
    // console.log("totalLikesCompteurJS" + totalLikesCompteurJS);

    // const LikesPrice = `
    //         <div id="total-likes"><span id="sum-likes">${totalLikesCompteurJS}</span><span class="material-symbols-outlined">favorite</span></div>
    //         <span>${photographer.price}€ / jour</span>
    //     `
    const LikesPrice = `
            <div id="total-likes"><span id="global-counter">0</span><span class="material-symbols-outlined">favorite</span></div>
            <span>${photographer.price}€ / jour</span>
        `
    // wrapperLikesPrice.querySelector('sum-likes').innerHTML = totalLikes;
    wrapperLikesPrice.innerHTML = LikesPrice;
    // sumLikes()
    return wrapperLikesPrice
  }

  function sumLikes() {
    let sum = 0
    mediaPhotographer.forEach(media => {
      sum += media.likes
    })
    return sum
  }
  totalLikes = sumLikes();

  // let compteurJS = new Compteur(totalLikes);

  // Template filtres

  const wrapperMediaSort = document.createElement('section');
  wrapperMediaSort.classList.add('photographe_filter');

  function getUserMediaSortDOM() {
    const sort = `
        <h5 id="filter__title" tabindex="0">Trier par</h5>
        <div class="dropdown">
            <div class="select" data-filter-value="popularity" tabindex="0">
                <span class="selected" aria-labelledby="filter__title" aria-expanded="false" aria-haspopup="listbox">Popularité</span>
                <span id = "material" class="material-symbols-outlined">expand_more</span>
            </div>
            <ul role="listbox" class="menu" aria-activedescendant="filter__option1" aria-labelledby="filter__title">
                <li class="selector__element selector__element1 active" role="option" tabindex="0" data-filter-option="popularity" aria-labelledby="filter__title" aria-selected="true">Popularité</li>
                <li class="selector__element selector__element2" role="option" tabindex="0" data-filter-option="date" aria-labelledby="filter__title">Date</li>
                <li class="selector__element selector__element3" role="option" tabindex="0" data-filter-option="title" aria-labelledby="filter__title">Titre</li>
            </ul>
        </div>
    `
    wrapperMediaSort.innerHTML = sort;
    return wrapperMediaSort
  }

  return {
    id,
    photographerId,
    title,
    picture,
    video,
    compteur,
    totalLikes,
    date,
    price,
    getUserMediaSortDOM,
    getUserMediaDOM,
    getLikesPrice
  }
}