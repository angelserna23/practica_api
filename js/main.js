const menuNav = document.querySelector(".header__nav-menu");
const menuIcon = document.querySelector(".header__img-menu");

menuIcon.addEventListener('click', () => {
    menuNav.classList.toggle("show");
});

document.addEventListener('click', (e) => {
    if(!menuNav.contains(e.target) && !menuIcon.contains(e.target)) {
        menuNav.classList.remove("show");
    }
});

/*Traer los datos de la API*/
const createShow = (show) => {
    const card = document.createElement("section");
    card.classList.add("show__card");

    const img = document.createElement("img");
    img.classList.add("show__card-img");
    img.src = (show.image && (show.image.medium || show.image.original)) || 'https://placehold.co/210x295?text=No+image';
    img.alt = show.name;

    //Div de la informacion de la tarjeta
    const info = document.createElement("div");
    info.classList.add("show__info");

    //Titulo
    const title = document.createElement("h3");
    title.classList.add("show__card-title");
    title.textContent = show.name;

    //Agregamos el div de las imagenes
    const select = document.createElement("div");
    select.classList.add("show__select");
    
    const like = document.createElement("img");
    like.classList.add("show__select-icon-1");
    like.src = "img/heart (1).svg";
    like.alt = "Like";
    like.addEventListener('mouseenter', ()  => like.classList.toggle('is-active'));

    const star = document.createElement("img");
    star.classList.add("show__select-icon-2");
    star.src = "img/star.svg";
    star.alt = "Star";
    star.addEventListener('mouseenter', () => star.classList.toggle('is-active'));

    select.append(like, star);
    info.append(title, select);
    card.append(img, info);

    return card;
}

/*Cargar todo el contenido en nuestra pagina web*/
document.addEventListener('DOMContentLoaded', () => {
  fetch('https://api.tvmaze.com/shows?page=1')
    .then((response) => response.json())
    .then((data) => {
      const showsGrid = document.querySelector('.shows');
      showsGrid.innerHTML = '';

      data.forEach((show) => {
        const showCard = createShow(show);
        showsGrid.appendChild(showCard);
      });
    })
    .catch((error) => {
      console.log('Error fetch:', error);
    });
});

/*Buscador de series*/
const searchSeries = async () => {
  const seriesName = document.querySelector(".header__search-input").value.toLowerCase();

  if (seriesName) {
    try {
      const response = await axios.get("https://api.tvmaze.com/search/shows?q=" + seriesName);
      const seriesGrid = document.querySelector(".shows");
      seriesGrid.innerHTML = "";

      response.data.forEach(item => {
        const seriesCard = createShow(item.show); // cada item tiene la propiedad show
        seriesGrid.appendChild(seriesCard);
      });

    } catch (error) {
      console.log("No existe esa serie");
    }
  }
};

document.querySelector(".header__search-submit").addEventListener('click', searchSeries);
document.querySelector(".header__search-input").addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        console.log("search");
        searchSeries();
    }
});
