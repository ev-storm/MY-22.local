// document.querySelector("#title-video").playbackRate = 0.5;
const videoElement = document.querySelector("#title-video");
if (videoElement) {
  videoElement.playbackRate = 0.5;
}
//////////////////////////////////
const modalButtons = document.querySelectorAll(".btn-modal-call");

modalButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const modalCon = document.querySelector(".modal-con");
    document.querySelector(".modal-con").classList.remove("hide-prev");
    modalCon.classList.remove("hide");
    modalCon.classList.add("show");
  });
});

document
  .querySelector(".modal-con")
  .addEventListener("click", function (event) {
    if (!event.target.closest(".modal")) {
      document.querySelector(".modal-con").classList.remove("show");
      document.querySelector(".modal-con").classList.add("hide");
    }
  });

document.querySelector(".close-modal").addEventListener("click", function () {
  document.querySelector(".modal-con").classList.remove("show");
  document.querySelector(".modal-con").classList.add("hide");
});

// ...............................................

const form = document.querySelector(".modal-form");

const telSelector = form.querySelector(".input-tel");
const inputmask = new Inputmask("+7 (999) 999-99-99");
inputmask.mask(telSelector);

const validation = new JustValidate(".modal-form");

validation
  .addField(".input-name", [
    {
      rule: "minLength",
      value: 3,
      errorMessage: "Введите более 3 символов",
    },
    {
      rule: "maxLength",
      value: 30,
      errorMessage: "Введите менее 30 символов",
    },
    {
      rule: "required",
      value: true,
      errorMessage: "Введите имя",
    },
  ])
  .addField(".input-tel", [
    {
      rule: "required",
      value: true,
      errorMessage: "Телефон обязателен",
    },
    {
      rule: "function",
      validator: function () {
        const phone = telSelector.inputmask.unmaskedvalue();
        return phone.length === 10;
      },
      errorMessage: "Введите корректный телефон",
    },
  ])
  .onSuccess((event) => {
    console.log("Validation passes and form submitted", event);

    let formData = new FormData(event.target);

    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          console.log("Отправлено");

          document.querySelector(".modal-con").classList.remove("show");
          document.querySelector(".modal-con").classList.add("hide");

          const banСheck = document.querySelector(".ban-check");

          banСheck.classList.add("active");

          setTimeout(() => {
            banСheck.classList.remove("active");
          }, 4000);
        }
      }
    };

    xhr.open("POST", "mail.php", true);
    xhr.send(formData);

    event.target.reset();
  });

// Обрабатываем кнопку
const telBtn = document.querySelector(".tel-item-con");

const phoneNumber = "+7 916 230-25-78";

const messageElement = document.createElement("span");
messageElement.classList.add("copy-message");
messageElement.textContent = "Телефон скопирован";
document.querySelector(".tel-item-con").appendChild(messageElement);

telBtn.addEventListener("click", () => {
  navigator.clipboard
    .writeText(phoneNumber)
    .then(() => {
      messageElement.style.display = "inline";

      setTimeout(() => {
        messageElement.style.display = "none";
      }, 2000);
    })
    .catch((err) => {
      console.error("Не удалось скопировать текст: ", err);
    });
});

/////////////////////////////////////////////////////////////////////////////////////////////////

const container = document.getElementById("carts-container"); // Контейнер для карточек
const containerCarts = document.querySelector(".carts-swiper"); // Контейнер для слайдера
const cartsFullCon = document.querySelector(".carts-full-con"); // Модальное окно
const cartsFull = document.querySelector(".carts-full");

function toggleCartsFull(action) {
  if (action === "show") {
    cartsFullCon.classList.remove("hide");
    cartsFullCon.classList.remove("hide-prev");
    cartsFullCon.classList.add("show");
  } else if (action === "hide") {
    cartsFullCon.classList.remove("show");
    cartsFullCon.classList.add("hide");
  }
}

function generateCards(data) {
  data.forEach((item, index) => {
    const card = document.createElement("div");
    card.className = "carts";
    card.style.backgroundImage = `url(/assets/img/carts/${index + 1}/1.png)`;
    card.innerHTML = `
      <div class="carts-content">
        <h1>${item.title}</h1>
        <h2>${item.description}</h2>
        <h2><span>Адрес:</span><br>${item.address}</h2>
        <div class="carts-prop">
          <h3>Год проведения работ <br><span>${item.year}</span></h3>
          <h3>Масса м/к <br><span>${item.weight}</span></h3>
        </div>
      </div>
      <div class="carts-back"></div>
    `;
    container.appendChild(card);
  });

  setupEventListeners(); // Устанавливаем обработчики после генерации карточек
}

function setupEventListeners() {
  document.querySelectorAll(".carts").forEach((cart, index) => {
    // Добавление обработчиков клика на карточки
    cart.addEventListener("click", () => {
      toggleCartsFull("show");
      updateSwiper(index + 1); // Обновляем слайдер при открытии
    });
  });

  // Закрытие модального окна при клике вне карточек
  cartsFullCon.addEventListener("click", (event) => {
    if (!event.target.closest(".carts-full")) toggleCartsFull("hide");
  });
}

function updateSwiper(cartIndex) {
  // Удаляем старый слайдер
  const existingSwiperWrapper = document.querySelector(".swiper-wrapper");
  if (existingSwiperWrapper) {
    existingSwiperWrapper.remove();
  }

  // Создаём новый слайдер
  const cartsFullConHTML = `
    <div class="swiper-wrapper">
      <div class="swiper-slide carts-slide">
        <img class="carts-slide-back" src="/assets/img/carts/${cartIndex}/1.png" alt="">
      </div>
      <div class="swiper-slide carts-slide">
        <img class="carts-slide-back" src="/assets/img/carts/${cartIndex}/2.png" alt="">
      </div>
      <div class="swiper-slide carts-slide">
        <img class="carts-slide-back" src="/assets/img/carts/${cartIndex}/3.png" alt="">
      </div>
      <div class="swiper-slide carts-slide">
        <img class="carts-slide-back" src="/assets/img/carts/${cartIndex}/4.png" alt="">
      </div>
      <div class="swiper-slide carts-slide">
        <img class="carts-slide-back" src="/assets/img/carts/${cartIndex}/5.png" alt="">
      </div>
    </div>
  `;

  // Вставляем новый слайдер в контейнер
  containerCarts.insertAdjacentHTML("beforeend", cartsFullConHTML);

  var cartsSwiper = new Swiper(".carts-swiper", {
    slidesPerView: 1,
    loop: true,
    autoplay: {
      delay: 2000,
    },
    scrollbar: {
      el: ".swiper-scrollbar",
      hide: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
}

// Получение данных из JSON и запуск генерации карточек
fetch("../js/obj.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Статус: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => generateCards(data))
  .catch((error) => console.error("Ошибка загрузки JSON:", error));
