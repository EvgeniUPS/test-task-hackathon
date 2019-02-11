let listRequest = {
  cat: 'https://api.chucknorris.io/jokes/categories',
  randomJoke: 'https://api.chucknorris.io/jokes/random'
};
let selectedCategory = '';

function toggleMenu() {
  let toggleBtn = document.querySelector('.list-toggle');
  toggleBtn.textContent = 'more\u25BA';
  toggleBtn.addEventListener('click', function() {
    let btn = document.querySelector('.u-list');

    toggleBtn.textContent =
      toggleBtn.textContent == 'more\u25BA'
        ? (toggleBtn.textContent = 'less\u25C4')
        : (toggleBtn.textContent = 'more\u25BA');
    btn.classList.toggle('open');
  });
}
toggleMenu();

function getCategories() {
  fetch(listRequest.cat)
    .then(response => response.json())
    .then(response => renderCategories(response))
    .then(response => getData(response));
}
getCategories();

function getData() {
  let ulClass = document.querySelector('ul');
  let selectedCat;
  function highlight(node) {
    if (selectedCat) {
      selectedCat.classList.remove('activeItem');
    }
    selectedCat = node;
    selectedCat.classList.add('activeItem');
  }
  ulClass.addEventListener('click', event => {
    let target = event.target;
    console.info(target.textContent);
    if (target.tagName != 'LI') return;
    highlight(target);

    selectedCategory = target.textContent;
    selectedCategory ? getJokeByCat() : getJoke();
    return target.textContent;
  });
}

function renderCategories(categories) {
  let list = document.querySelector('#list');
  let listItem;

  for (key in categories) {
    listItem = document.createElement('li');
    listItem.textContent = categories[key];
    list.appendChild(listItem);
  }
  return list;
}
renderCategories();

let jokeText = document.querySelector('#joke');

function getJoke() {
  fetch(listRequest.randomJoke)
    .then(response => response.json())
    .then(response => {
      jokeText.textContent = '"' + response.value + '"';
    });
}
getJoke();

function getJokeByCat() {
  fetch('https://api.chucknorris.io/jokes/random?category=' + selectedCategory)
    .then(response => response.json())
    .then(response => {
      jokeText.textContent = '"' + response.value + '"';
    });
}
function newJoke() {
  let btn = document.querySelector('#new-joke');

  btn.addEventListener('click', function(e) {
    console.log(selectedCategory);
    getJokeByCat();
  });
}
newJoke();
