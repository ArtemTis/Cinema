
const modalFunc = () => {
  const btnAdd = document.querySelector('.films__btn');
  const modal = document.querySelector('.modal');

  btnAdd.addEventListener('click', () => {
    modal.classList.add('active');
    document.body.classList.add('lock');

  })

  modal.addEventListener('click', (e) => {
    const modalWindow = e.target.closest('.modal__window');
    if (!modalWindow) {
      modal.classList.remove('active');
      document.body.classList.remove('lock');
    }
  })
}
modalFunc();


const addFilm = () => {
  const form = document.querySelector('.modal__form');
  const block = document.querySelector('.films__cards');
  let body = {};
  let name = 0;

  if (localStorage.getItem('name')) {
    name = localStorage.getItem('name');
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    //const body = {};

    formData.append('form', form.classList.value);

    formData.forEach((value, field) => {
      body[field] = value;
    })

    name++

    localStorage.setItem(`${name}`, JSON.stringify(body));

    localStorage.setItem('name', name);

    //////////////

    // var preview = document.querySelector('img');
    // var file = document.querySelector('input[type=file]').files[0];
    // var reader = new FileReader();

    // reader.readAsDataURL(file);
    // console.log(reader.readAsDataURL(file));

    // reader.onloadend = function () {
    //   body.image = reader.result;
    // }

    // console.log(body);
    ///////////////////

    block.insertAdjacentHTML('beforeend', `
        <div class="films__card" data-id="${name}">
        <div class="films__image">
            <img src="${body.image}" alt="Обложка фильма">
            <img src="img/trash.png" alt="Delete film" class="recycle">
            <div class="review__wrapper">
              <p class="review">ОТЗЫВЫ</p>
            </div>
        </div>
        <div class="films__info">
            <h3 class="films__title">${body.name}</h3>
            <p class="films__country">Страна: ${body.country}</p>
            <p class="films__genre">Жанр: ${body.genre}</p>
            <p class="films__date">Дата выхода: ${body.date}</p>
            <p class="films__age">${body.age}</p>
        </div>
      </div>
    `)

    event.target.reset();

    const modal = document.querySelector('.modal');
    modal.classList.remove('active');
    document.body.classList.remove('lock');

    //name = 0;
  })

}
addFilm()

const renderFilm = () => {
  const block = document.querySelector('.films__cards');

  //let storageFilm = localStorage.getItem(`${name}`);         Object.keys(localStorage)
  let nameNumber = localStorage.getItem('name');

  if (nameNumber) {
    for (let i = 1; i <= Number(nameNumber); i++) {
      if (Object.keys(localStorage).find(elem => elem == i) >= 0) {
        block.insertAdjacentHTML('beforeend', `
            <div class="films__card" data-id="${i}">
            <div class="films__image">
                <img src="${JSON.parse(localStorage.getItem(`${i}`)).image}" alt="Обложка фильма">
                <img src="img/trash.png" alt="Delete film" class="recycle">
                <div class="review__wrapper">
                  <p class="review">ОТЗЫВЫ</p>
                </div>
            </div>
            <div class="films__info">
                <h3 class="films__title">${JSON.parse(localStorage.getItem(`${i}`)).name}</h3>
                <p class="films__country">Страна: ${JSON.parse(localStorage.getItem(`${i}`)).country}</p>
                <p class="films__genre">Жанр: ${JSON.parse(localStorage.getItem(`${i}`)).genre}</p>
                <p class="films__date">Дата выхода: ${JSON.parse(localStorage.getItem(`${i}`)).date}</p>
                <p class="films__age">${JSON.parse(localStorage.getItem(`${i}`)).age}</p>
            </div>
          </div>
        `)
      }
    }
  }

}
renderFilm();

const deleteFilm = () => {
  let filmCards = document.getElementsByClassName('films__card');

  for (const film of filmCards) {
    film.addEventListener('click', (event) => {
      if (event.target.closest('.recycle')) {
        film.style.display = 'none';

        let id = film.dataset.id;
        if (id > 0) {
          localStorage.removeItem(id);
          // let newCount = localStorage.getItem('name') -1;
          // localStorage.setItem('name', newCount);
        }
      }
    })
    film.addEventListener('mouseover', (event) => {
      if (event.target.closest('.recycle')) {
        event.target.style.opacity = 1;
      }
    })
    film.addEventListener('mouseout', (event) => {
      if (event.target.closest('.recycle')) {
        event.target.style.opacity = '0';
      }
    })
  }
}
deleteFilm();

const sortGenre = () => {
  let filmCards = document.getElementsByClassName('films__card');
  // let array = [];

  // for (const genre of filmCards) {
  //   let genreP = genre.querySelector('.films__genre').textContent;
  //   let newString = genreP.split(' ').slice(1).join('').trim();
  //   console.log(newString);
  //   array.push(newString);
  // }
  // array.sort();
  // console.log(array);


  const input = document.querySelector('.search-block > input');
  const searchBtn = document.querySelector('.search-block > button');

  const block = document.querySelector('.films__cards');
  let nameNumber = localStorage.getItem('name');

  //let locData = JSON.parse(localStorage.getItem(`${i}`));  .split(':').slice(1).join('').trim();    (Object.keys(localStorage).find(elem => elem == i) >= 0) 

  searchBtn.addEventListener('click', () => {
    block.innerHTML = '';
    for (let i = 1; i <= Number(nameNumber); i++) {
      if (Object.keys(localStorage).find(elem => elem == i) >= 0 && (input.value || 0 != input.value.length) && (JSON.parse(localStorage.getItem(`${i}`)).genre.toLowerCase().includes(input.value.toLowerCase()) || JSON.parse(localStorage.getItem(`${i}`)).name.toLowerCase().includes(input.value.toLowerCase()) || JSON.parse(localStorage.getItem(`${i}`)).country.toLowerCase().includes(input.value.toLowerCase()))) {
        block.insertAdjacentHTML('beforeend', `
                <div class="films__card" data-id="${i}">
                <div class="films__image">
                    <img src="${JSON.parse(localStorage.getItem(`${i}`)).image}" alt="Обложка фильма">
                    <img src="img/trash.png" alt="Delete film" class="recycle">
                    <div class="review__wrapper">
                      <p class="review">ОТЗЫВЫ</p>
                    </div>
                </div>
                <div class="films__info">
                    <h3 class="films__title">${JSON.parse(localStorage.getItem(`${i}`)).name}</h3>
                    <p class="films__country">Страна: ${JSON.parse(localStorage.getItem(`${i}`)).country}</p>
                    <p class="films__genre">Жанр: ${JSON.parse(localStorage.getItem(`${i}`)).genre}</p>
                    <p class="films__date">Дата выхода: ${JSON.parse(localStorage.getItem(`${i}`)).date}</p>
                    <p class="films__age">${JSON.parse(localStorage.getItem(`${i}`)).age}</p>
                </div>
              </div>
            `)
      }
    }
    if (!input.value || 0 === input.value.length) {
      block.innerHTML = '';
      for (let i = 1; i <= Number(nameNumber); i++) {
        if (Object.keys(localStorage).find(elem => elem == i) >= 0) {
          block.insertAdjacentHTML('beforeend', `
                <div class="films__card" data-id="${i}">
                <div class="films__image">
                    <img src="${JSON.parse(localStorage.getItem(`${i}`)).image}" alt="Обложка фильма">
                    <img src="img/trash.png" alt="Delete film" class="recycle">
                    <div class="review__wrapper">
                      <p class="review">ОТЗЫВЫ</p>
                    </div>
                </div>
                <div class="films__info">
                    <h3 class="films__title">${JSON.parse(localStorage.getItem(`${i}`)).name}</h3>
                    <p class="films__country">Страна: ${JSON.parse(localStorage.getItem(`${i}`)).country}</p>
                    <p class="films__genre">Жанр: ${JSON.parse(localStorage.getItem(`${i}`)).genre}</p>
                    <p class="films__date">Дата выхода: ${JSON.parse(localStorage.getItem(`${i}`)).date}</p>
                    <p class="films__age">${JSON.parse(localStorage.getItem(`${i}`)).age}</p>
                </div>
              </div>
            `)
        }
      }
    }


  })


}
sortGenre()

const review = () => {
  // const filmCards = document.getElementsByClassName('films__card');
  const filmCards = document.querySelectorAll('.films__card');
  const modal = document.querySelector('.modal-review');
  let id = 0;

  // for (const film of filmCards) {
    filmCards.forEach(film => {

    film.addEventListener('click', (event) => {
      id = film.dataset.id;
      if (event.target.classList == 'review') {
        console.log('click' + id);

        addReview(id);
        renderReview(id);

        modal.classList.add('active');
        document.body.classList.add('lock');

        modal.addEventListener('click', (e) => {
          const modalWindow = e.target.closest('.modal__window');
          if (!modalWindow) {
            modal.classList.remove('active');
            document.body.classList.remove('lock');
          }
        })
      }
    })
  })
}
review();

const addReview = (id) => {
  const form = document.querySelector('.review__form');
  const input = form.querySelector('input');
  const field = document.querySelector('.text-field');
  let message = [];

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    console.log(id);

    if (localStorage.getItem(`message ${id}`)) {
      message = JSON.parse(localStorage.getItem(`message ${id}`));
    }

    if (input.value) {
      message.push(input.value);
      localStorage.setItem(`message ${id}`, JSON.stringify(message));

      field.insertAdjacentHTML('beforeend', `
      <div class="message">
          <div class="message__text">${input.value}</div>
      </div>
      `)
    }

    console.log(JSON.parse(localStorage.getItem(`message ${id}`)));

    // if (input.value) {
    //   field.insertAdjacentHTML('beforeend', `
    //   <div class="message">
    //       <div class="message__text">${input.value}</div>
    //   </div>
    //   `)
    // }
    message = [];
    event.target.reset();
  })
}

const renderReview = (id) => {
  const field = document.querySelector('.text-field');

  field.innerHTML = '';
  if (localStorage.getItem(`message ${id}`)) {
    for (let i = 0; i < JSON.parse(localStorage.getItem(`message ${id}`)).length; i++) {
      field.insertAdjacentHTML('beforeend', `
        <div class="message">
            <div class="message__text">${JSON.parse(localStorage.getItem(`message ${id}`))[i]}</div>
        </div>
      `)
    }
  }
  // JSON.parse(localStorage.getItem(`message ${id}`));
}



//////////////////////////  block.innerHTML = `<p class="not-found">Ничего не найдено</p>`;

// function previewFile() {
//   var preview = document.querySelector('img');
//   var file = document.querySelector('input[type=file]').files[0];
//   var reader = new FileReader();

//   reader.onloadend = function () {
//     preview.src = reader.result;
//   }

//   if (file) {
//     reader.readAsDataURL(file);
//   } else {
//     preview.src = "";
//   }
// }








// function readAndShowFiles() {
//   var files = document.getElementById("images").files;
//   var reader;
//   var file;
//   var i;

//   for (i = 0; i < files.length; i++) {
//     file = files[i];
//     reader = new FileReader();
//     reader.onload = (function(file) {
//       return function(e) {
//         var span = document.createElement('span');
//         span.innerHTML = ['<img src="', e.target.result,
//           '" title="', escape(file.name), '">'
//         ].join('');
//         document.getElementById('list').insertBefore(span, null);
//       };
//     })(file);
//     reader.readAsDataURL(file);
//   }
// }

//https://www.cbr-xml-daily.ru/daily_json.js
// fetch('https://iss.moex.com/iss/statistics/engines/currency/markets/selt/rates.json?iss.meta=off')
//   .then((response) => {
//     if (!response.ok) {
//       throw new Error('HTTP error, status = ' + response.status);
//     }
//     return response.json();
//   })
//   .then((json) => {
//     // Текущий курс доллара и евро ЦБРФ
//     console.log(json.cbrf.data[0][json.cbrf.columns.indexOf('CBRF_USD_LAST')]);
//     console.log(json.cbrf.data[0][json.cbrf.columns.indexOf('CBRF_EUR_LAST')]);
//   })
//   .catch((error) => {
//     console.error(error);
//   });