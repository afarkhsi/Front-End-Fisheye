function photographerFactory(photographer) {
    const { name, id, city, country, tagline, price, portrait, likes } = photographer;
    // console.log("test export array :", mediaArrayById)
    // Template card photographe page d'accueil
    const wrapper = document.createElement('section');
    wrapper.classList.add("photographes")

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const card = `
            <a href="./photographer.html?id=${id}" aria-label="${name}">
                <article aria-label = "Profil du photographe">
                    <div class="profil_picture">
                        <img src="${picture}" alt="${portrait}">
                    </div>
                    <div class="profil_description">
                        <h2>${name}</h2>
                        <h3>${city}, ${country}</h3>
                        <h4>${tagline}</h4>
                        <h5>${price}€/jour</h5>
                    </div>
                </article>
            </a>
        `
        wrapper.innerHTML=card
        console.log(id)
        return wrapper;
    }

    // Template banner page photographe

    const wrapperBanner = document.createElement('section');
    wrapperBanner.classList.add('photographe_banner');
    wrapperBanner.setAttribute('data-hidden-on-modal', '');

    function getUserBannerDOM() {
        const banner = 
        `
            <article aria-label = "Profil du photographe">
                <div class="profil_description">
                    <h2>${name}</h2>
                    <h3>${city}, ${country}</h3>
                    <h4>${tagline}</h4>
                </div>
                <div class="profil_description_button">
                    <button class="contact_button" aria-label="Contacter ${name}" onmouseover="" onclick="displayModal()">Contactez-moi</button>
                </div>
                <div class="profil_picture">
                    <img src="${picture}" alt="${portrait}">
                </div>
            </article>
        `
        wrapperBanner.innerHTML=banner
        return wrapperBanner
    }

    return { id, name, city, country, tagline, price, picture, getUserCardDOM, getUserBannerDOM }
}