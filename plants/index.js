//self-assessment task Plants#1
// console.log('Score: 105/110 \n 1. Вёрстка валидная +10 \n 2. Вёрстка cемантическая +20 \n    <header>, <main>, <footer> +3 \n    пять элементов <section> +3 \n    один заголовок <h1> +3 \n    четыре заголовка <h2> +3 \n    один элемент <nav> +3 \n    два списка ul > li > a +3 \n    пять кнопок <button> +2 \n 3. Вёрстка соответствует макету +48 \n    блок <header> +6 \n    секция welcome +7 \n    секция about +7 \n    секция service +7 \n    секция prices +7 \n    секция contacts +7 \n    блок <footer> +7 \n 4. Требования к css + 12 \n    для построения сетки используются флексы +2 \n    при уменьшении масштаба страницы браузера вёрстка размещается по центру, а не сдвигается в сторону +2 \n    фоновый цвет тянется на всю ширину страницы +2 \n    иконки добавлены в формате .svg +2 \n    изображения добавлены в формате .jpg и .png +2 \n    есть favicon +2 \n 5. Интерактивность, реализуемая через css +20 \n    плавная прокрутка по якорям +5 \n    cсылки в футере ведут на гитхаб и на страницу курса +5 \n    интерактивность включает в себя не только изменение внешнего вида курсора, но и другие визуальные эффекты +5 \n    плавное изменение внешнего вида элемента при наведении и клике не влияющее на соседние элементы +5');

//self-assessment task Plants#2
// console.log('Score: 85/75 \n 1. Вёрстка соответствует макету. Ширина экрана 768px +24 \n    блок <header> +2 \n    секция welcome +3 \n    секция about +4 \n    секция service +4 \n    секция prices +4 \n    секция contacts +4 \n    блок <footer> + 3 \n 2. Вёрстка соответствует макету. Ширина экрана 380px +24 \n    блок <header> +2 \n    секция welcome +3 \n    секция about +4 \n    секция service +4 \n    секция prices +4 \n    секция contacts +4 \n    блок <footer> + 3 \n Ни на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки. Весь контент страницы при этом сохраняется +15 \n    нет полосы прокрутки при ширине страницы от 1440рх до 380px +7 \n    нет полосы прокрутки при ширине страницы от 380px до 320рх +8 \n На ширине экрана 380рх и меньше реализовано адаптивное меню +22 \n    при ширине страницы 380рх панель навигации скрывается, появляется бургер-иконка +2 \n    при нажатии на бургер-иконку плавно появляется адаптивное меню +4 \n    адаптивное меню соответствует цветовой схеме макета +4 (Цвет фона адаптивного меню такой-же как у аккордеона в секции Contacts)\n    при нажатии на крестик адаптивное меню плавно скрывается уезжая за экран +4 \n    ссылки в адаптивном меню работают, обеспечивая плавную прокрутку по якорям +4 \n    при клике по ссылке в адаптивном меню адаптивное меню плавно скрывается, также скрытие меню происходит если сделать клик вне данного окна +4');

const isMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOs: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function () {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function () {
    return (
      isMobile.Android() ||
      isMobile.BlackBerry() ||
      isMobile.iOs() ||
      isMobile.Opera() ||
      isMobile.Windows());
  }
};

window.addEventListener('load', function() {
  const body = document.body;
  const burgerIcon = document.querySelector('.burger-icon');
  const burgerIcon_open = document.querySelector('.burger-icon__open');
  const burgerIcon_close = document.querySelector('.burger-icon__close');
  const nav = document.querySelector('.nav');
  const navLinks = document.querySelectorAll('.nav__link[href]');
  const burgerLinks = document.querySelector('.burger-links');

  if (isMobile.any()) {
    body.classList.toggle('_touch');
  }
  else {
    body.classList.toggle('_pc');
  }

  if (burgerIcon) {
    burgerIcon.addEventListener("click", function(e) {
      body.classList.toggle('_none-scroll');
      burgerIcon.classList.toggle('_active');
      burgerIcon_open.classList.toggle('_hidden');
      burgerIcon_close.classList.toggle('_active');
      nav.classList.toggle('_active');
      burgerLinks.classList.toggle('_active');
    });
  }

  if (navLinks.length > 0) {
    navLinks.forEach(navLink => {
      navLink.addEventListener('click', onNavLinkClick);
    });

    function onNavLinkClick(e) {
      const navLink = e.target;
      const toSection = navLink.getAttribute('href').substr(1);
      e.preventDefault();

      if (burgerIcon.classList.contains('_active')) {
        body.classList.remove('_none-scroll');
        burgerIcon_open.classList.toggle('_hidden');
        burgerIcon_close.classList.toggle('_active');
        burgerIcon.classList.remove('_active');
        nav.classList.remove('_active');
        burgerLinks.classList.remove('_active');
      }

      document.getElementById(toSection).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }

  document.addEventListener('click', (e) => {
    let target = e.target;
    let itsIcon = target == burgerIcon || burgerIcon.contains(target);
    let itsNav = target == nav || nav.contains(target);

    if (!itsIcon && !itsNav && burgerIcon.classList.contains('_active')) {
      body.classList.remove('_none-scroll');
      burgerIcon_open.classList.toggle('_hidden');
      burgerIcon_close.classList.toggle('_active');
      burgerIcon.classList.remove('_active');
      nav.classList.remove('_active');
      burgerLinks.classList.remove('_active');
    }
  });

  const welcomeBtn = document.querySelector('.welcome__btn');
  welcomeBtn.addEventListener('click', function(e) {
    document.location.href='#about-us';
  });

// ----Plans3 functional----
  // ----Service----
  let variantArr = ['garden', 'planting', 'lawn'];
  const serviceBtns = document.querySelectorAll('.service__btn');
  const serviceVariant = document.querySelectorAll('.service__variant');
  let count = [];

  serviceBtns.forEach(Btn => {
    Btn.addEventListener('click', blurVariants);
  });

  function blurVariants(e) {
    const Btn = e.target;
    Btn.classList.toggle('_active');
    count.some(element => element === Btn.classList[1]) ? count.splice(count.indexOf(Btn.classList[1], 0), 1) : count.push(Btn.classList[1]);

    if (count.length === 0) {
      serviceBtns.forEach(btn => {
        btn.classList.remove('_disabled');
        btn.disabled = false;
      });
      serviceVariant.forEach(variant => {
        if (variant.classList.contains('_blur')) {
          variant.classList.remove('_blur');
        }
      });
    }

    if (0 < count.length <= 2) {
      count.forEach(elem => {
        serviceBtns.forEach(btn => {
          if (btn.classList.contains('_disabled')) {
            btn.classList.remove('_disabled');
            btn.disabled = false;
          }
          if (btn.classList.contains('_active') === false) {
            serviceVariant.forEach(variant => {
              if (variant.classList.contains(btn.classList[1]) &&
              variant.classList.contains('_blur') === false) {
                variant.classList.toggle('_blur');
              }
            });
          }
          if (btn.classList.contains('_active')) {
            serviceVariant.forEach(variant => {
              if (variant.classList.contains(btn.classList[1]) &&
              variant.classList.contains('_blur')) {
                variant.classList.toggle('_blur');
              }
            });
          }
        });
      });
    }

    if (count.length === 2) {
      serviceBtns.forEach(btn => {
        if (btn.classList.contains('_active') === false) {
          btn.classList.add('_disabled');
          btn.disabled = true;
        }
      });
    }

  }

  serviceVariant.forEach(variant => {
    variant.addEventListener('click', function(e) {
      if (variant.classList.contains('_blur') === false) {
        document.location.href='#prices';
      }
    });
  });

  // ----Prices----
  const pricesCheck = document.querySelectorAll('.dropdown__input');
  const pricesBtnDropdown = document.querySelectorAll('.dropdown__btn');
  const pricesBtn = document.querySelector('.prices__btn')

  pricesCheck.forEach(checkbox => {
      checkbox.addEventListener('click', dropdown);
    });

  function dropdown(e) {
    const checkbox = e.target;
    for (var i = 0; i < pricesCheck.length; i++) {
      if (pricesCheck[i] != checkbox) {
        pricesCheck[i].oldChecked = false;
      }
    }
    if (checkbox.oldChecked) {
      checkbox.checked = false;
    }
    checkbox.oldChecked = checkbox.checked;
  }

  pricesBtnDropdown.forEach(btn => {
    btn.addEventListener('click', function(e) {
      document.location.href='#contacts';
    });
  });

  pricesBtn.addEventListener('click', function(e) {
    document.location.href='#contacts';
  });

  // ----Contacts----
  const select = document.querySelector('.select');
  const values = document.querySelector('.select__values');
  const selectValue = document.querySelectorAll('.select__value');

  const selected = document.querySelector('.selected');
  const city = document.querySelector('._city');
  const phone = document.querySelector('._phone');
  const address = document.querySelector('._address');

  cityBtn = document.querySelector('.selected-table__button');

  const selectLabel = document.querySelector('.select__label');
  const contactsImg = document.querySelector('.contacts__img');

  const selectedArr = [
    {
      city: 'Canandaigua, NY',
      phone: '+1	585	393 0001',
      adress: '151 Charlotte Street'
    },
    {
      city: 'New York City',
      phone: '+1	212	456 0002',
      adress: '9 East 91st Street'
    },
    {
      city: 'Yonkers, NY',
      phone: '+1	914	678 0003',
      adress: '511 Warburton Ave'
    },
    {
      city: 'Sherrill, NY',
      phone: '+1	315	908 0004',
      adress: '14 WEST Noyes BLVD'
    }
  ];

  let cityLet = 'City';

  select.addEventListener('click', function(e) {
    values.classList.toggle('_hide');
    if (!values.classList.contains('_hide') && !selected.classList.contains('_hide')) {
      selected.classList.add('_hide');
      contactsImg.style.display = 'inline';
      if (window.innerWidth < 1023) {
        contactsImg.style.margin = '172px 0 0 7px';
      }
    }
    if (values.classList.contains('_hide') && cityLet != 'City') {
      selected.classList.remove('_hide');
      if (window.innerWidth < 599) {
        contactsImg.style.display = 'none';
      }
    }
  })

  selectValue.forEach(citySelect => {
    citySelect.addEventListener('click', selectCity);
  });


  function selectCity(e) {
    const citySelect = e.target;
    cityLet = citySelect.textContent;
    if (cityLet != 'City') {
      selectLabel.style.fontSize = '16px';
      selectLabel.textContent = citySelect.textContent;
      if (window.innerWidth > 600 && window.innerWidth < 1023) {
        select.style.margin = '61px 0 0';
        selectLabel.style.padding = '5px 35px';
        contactsImg.style.margin = '289px 0 0 7px';
      }
      if (window.innerWidth < 599) {
        select.style.margin = '42px 0 0';
        selectLabel.style.padding = '5px 0 5px 20px';
        contactsImg.style.display = 'none';
      }
      for (let i = 0; i < selectedArr.length; i++) {
        console.log(selectedArr[i].city);
        if (cityLet === selectedArr[i].city) {
          city.textContent = selectedArr[i].city;
          phone.textContent = selectedArr[i].phone;
          address.textContent = selectedArr[i].adress;
        }
      }
      select.classList.add('_city');
      selected.classList.remove('_hide');
    }
  }

  document.addEventListener('click', (e) => {
    let target = e.target;
    let itsValue = target === values || values.contains(target);
    let itsLabel = target === select || select.contains(target);
    // console.log(itsValue);
    if (!itsValue && !itsLabel && !values.classList.contains('_hide')) {
      values.classList.add('_hide');
      if (cityLet != 'City') {
        selected.classList.remove('_hide');
      }
    }
  });

  cityBtn.addEventListener('click', function(e) {
    // console.log(phone.textContent);
    document.location.href = 'tel:' + phone.textContent;
  });

  console.log(cityLet.length);
});