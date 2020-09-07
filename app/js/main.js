function openFormCallBack() {
  const form = document.querySelector(".scr_popup-fo");
  [...document.querySelectorAll(".popup-btn")].forEach((el) => {
    el.onclick = (e) => {
      form.style.display = "block";
    };
  });
  document.querySelector(".scr_popup-cl").onclick = (e) => {
    form.style.display = "none";
    [...form.querySelectorAll("input")].forEach((el) => {
      el.value = "";
    });
  };
}

//Form call back
//
//messageName
const nameError = "Поле обязательно для заполнения";
const nameNotCorrect = "Проверьте поле имя";
// messagePhone
const phoneError = "Поле обязательно для заполнения";
const phoneNotCorrect = "Некооректный номер телефона";
//messageEmail
const emailError = "Поле обязательно для заполнения";
const emailNotCorrect = "Некооректный почтовый адрес";

const PHONE_MASK = "^(\\+7|8)[\\d]{10}$";
const MAIL_MASK = "^[a-zA-z]+\\W?[a-z]+@[a-zA-z]+\\.[a-z]{2,3}$";
const NAME_MASK = "^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']?$";

function getMask(name) {
  return name === "phone" ? PHONE_MASK : name === "email" ? MAIL_MASK : NAME_MASK;
}

function test(mask, domElem, domfildError, messageError, messageNotCorrect, className, classNameValue) {
  if (domElem.value === "") {
    domfildError.innerHTML = messageError;
  } else if (new RegExp(getMask(mask)).test(domElem.value)) {
    domfildError.innerHTML = "";
    domElem.setAttribute(className, classNameValue);
  } else {
    domfildError.innerHTML = messageNotCorrect;
  }
}

[...document.querySelectorAll(".scr_popup-in")].forEach((el) => {
  let nameFildError = el.querySelector(".scr_fi-er-one");
  let phoneFildError = el.querySelector(".scr_fi-er-two");
  let emailFildError = el.querySelector(".scr_fi-er-three");
  el.querySelector(".src_con-btn").onclick = (evt) => {
    evt.preventDefault();
    for (let input of el.querySelectorAll(".src_in-all")) {
      if (input.dataset.validatio === "name") {
        test(input.dataset.validatio, input, nameFildError, nameError, nameNotCorrect);
      } else if (input.dataset.validatio === "phone") {
        test(input.dataset.validatio, input, phoneFildError, phoneError, phoneNotCorrect, "data-correct", "true");
      } else if (input.dataset.validatio === "email") {
        test(input.dataset.validatio, input, emailFildError, emailError, emailNotCorrect);
      }
    }
    for (let input of document.querySelectorAll("[data-correct]")) {
      if (input.dataset.correct) {
        el.querySelector(".scr_form").onsubmit = async () => {
          let formData = new FormData(form);
          let respons = await fetch("URL", {
            method: "GET",
            body: formData,
          });
          let result = await respons.json();
          console.log(result);
        };
      } else {
        return false;
      }
    }
  };
});

//Opening box with information about thing
function openInformationAboutThing() {
  [...document.querySelectorAll(".scr_pr-in-item")].forEach((el) => {
    let openBl = el.querySelector(".scr_pr-wp-extra");
    let evenObj = el.querySelector(".scr_pr-in-icon img");
    let openForm = document.querySelector(".scr_popup-fo");
    let evenBtn = el.querySelector(".scr_btn-extra");
    evenObj.onclick = (e) => {
      openBl.style.display = "block";
    };
    el.querySelector(".closed").onclick = (e) => {
      openBl.style.display = "none";
    };
    evenBtn.onclick = (e) => {
      openForm.style.display = "block";
    };
  });
}

// galleryWithZoom
function galleryWithZoom() {
  const arr = document.querySelectorAll(".slider-item img");
  const form = document.querySelector(".popup_img");
  const pleca = document.querySelector(".popup_img-wrap img");
  arr.forEach((el, index) => {
    el.onclick = (e) => {
      const slideIndex = index;
      form.style.display = "block";
      pleca.style.opacity = 0;
      setTimeout(surfacing, 350, pleca);
      pleca.src = el.src;
      const rigth = document.querySelector(".popup_img-next");
      btnNext(pleca, slideIndex, arr, rigth);
      const left = document.querySelector(".popup_img-prev");
      btnPrev(pleca, slideIndex, arr, left);
    };
  });
  document.querySelector(".popup_img-closed").onclick = (e) => {
    form.style.display = "none";
  };
}

function btnNext(pleca, slideIndex, arr, rigth) {
  rigth.onclick = (e) => {
    pleca.style.opacity = 0;
    setTimeout(surfacing, 250, pleca);
    if (slideIndex < arr.length - 1) slideIndex++;
    else slideIndex = 0;
    pleca.src = arr[slideIndex].src;
  };
}

function surfacing(pleca) {
  pleca.style.opacity = 1;
  pleca.style.transition = "opacity 0.5s step-end";
}

function btnPrev(pleca, slideIndex, arr, left) {
  left.onclick = (e) => {
    pleca.style.opacity = 0;
    setTimeout(surfacing, 350, pleca);
    if (slideIndex > 0) slideIndex--;
    else slideIndex = arr.length - 1;
    pleca.src = arr[slideIndex].src;
  };
}

// smoothScroll
function smoothScroll() {
  const parent = document.querySelector(".scroll");
  const smoothLinks = parent.querySelectorAll("a");
  for (let smoothLink of smoothLinks) {
    smoothLink.onclick = (e) => {
      e.preventDefault();
      const id = smoothLink.getAttribute("href");
      console.log(id);
      document.querySelector(id).scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "start",
      });
    };
  }
}

document.querySelector(".header__wrapper-menu-mobile-bth").onclick = () => {
  document.querySelector(".header__wrapper-menu-mobile").classList.add("active");
  // document.querySelector(".header__wrapper-logo img").style.display = "none";
};

document.querySelector(".header__wrapper-menu-mobile").onclick = () => {
  document.querySelector(".header__wrapper-menu-mobile").classList.remove("active");
  document.querySelector(".header__wrapper-logo img").style.display = "block";
};

smoothScroll();
galleryWithZoom();
openInformationAboutThing();
openFormCallBack();
