let url = "https://fakestoreapi.com/products/";
let dataList = document.querySelector(".data");
let btn1 = document.querySelector("#btn1");
let btn2 = document.querySelector("#btn2");
let btn3 = document.querySelector("#btn3");
let btn4 = document.querySelector("#btn4");
let btn5 = document.querySelector("#btn5");
let cartProduct = document.querySelector(".cart__list");
let openModal = document.querySelector("#cart");
let closeModal = document.querySelector("#closeCart");
let cart = document.querySelector(".cart");
let count = document.querySelector(".count");
let feeAmount = document.querySelector(".fee__amount");
let totalAmount = document.querySelector(".total__amount");

const getStData = () => {
  const res = JSON.parse(localStorage.getItem("product"));
  return res;
};

const renderStorage = () => {
  const data = getStData();
  if (data) {
    cartProduct.innerHTML = data
      .map(
        (item) =>
          `
        <li class="cart__product">
        <ul class="item__list">
        <li>
        <ul class="product__list">
         <button class="del__btn" data-id="${item.id}"></button>
         <img src="${item.image}" alt="product" class="product__img">
        </ul>
        </li>
        <li>
        <ul class="amount__list">
        <p class="product__price">${item.price}</p>
        <p class="product__price">1</p>
        </ul>
        </li>
        </ul>
        
        </li>
        `
      )
      .join("");
  }
};
const addData = (data) => {
  const oldData = getStData();
  if (oldData) {
    const existingData = oldData.findIndex((item) => item.id === data.id);
    if (existingData !== -1) {
      oldData[existingData] = data;
      localStorage.setItem("product", JSON.stringify(oldData));
    } else {
      localStorage.setItem("product", JSON.stringify([...oldData, data]));
    }
  } else {
    localStorage.setItem("product", JSON.stringify([data]));
  }
};
const money = async () => {
  let count = 0;
  const data = await getStData();

  try {
    for (let i = 0; i < data.length; i++) {
      if (data[i] === 0) {
        count = 0;
      } else {
        count = count + Number(data[i].price);
      }
    }
  } catch (error) {
    console.log(error);
  }

  return count;
};
money();
const renderData = (data) => {
  dataList.innerHTML = data
    .map(
      (item) => `
    <li class="item">
    <div class="card__img">
      <img class="img" src="${item.image}" >
    </div>

    <h3 class ="item__name" >${
      item.title.length > 22 ? item.title.slice(0, 22) + "..." : item.title
    }</h3>
    <ul class="starList">
    <li class="starItem"><img src="./img/star1.svg"></li>
    <li class="starItem"><img src="./img/star1.svg"></li>
    <li class="starItem"><img src="./img/star1.svg"></li>
    <li class="starItem"><img src="./img/star1.svg"></li>
    <li class="starItem"><img src="./img/star2.svg"></li>
    </ul>
    <div class="price__box">
    <p class="productPrice">$${item.price}</p>
    <p class="realPrice">$1000</p>
    <p class="discountPrice">24% Off</p>
    </div>
    <button class="addCart" data-id="${item.id}" ></button>
    </li>
 
 
 `
    )
    .join("");
};

const getData = async () => {
  try {
    const res = await fetch(url);
    const data = await res.json();
    renderData(data);
    console.log(data);
  } catch (error) {}
};
getData();

const totalFee = () => {
  const fee = money();
  const count = 20 + fee;
  feeAmount.innerHTML = `$${fee}`;
  if (fee === 0) {
    totalAmount.innerHTML = `$0`;
  } else {
    totalAmount.innerHTML = `$${count}`;
  }
};
totalFee();
const addCount = () => {
  count.innerHTML = getStData().length;
};
const trueRender = async (e) => {
  try {
    if (e.target.dataset.id) {
      const res = await fetch(`${url}category${e.target.dataset.id}`);
      const data = await res.json();
      renderData(data);
      console.log(data);
    } else {
      const res = await fetch(`${url}`);
      const data = await res.json();
      renderData(data);
      console.log(data);
    }
  } catch (error) {}
};
const addEvent = async (e) => {
  try {
    const res = await fetch(`${url}${e.target.dataset.id}`);
    const data = await res.json();
    addData(data);
    addCount();
    totalFee();
  } catch (error) {}
};
addCount();
dataList.addEventListener("click", addEvent);

let tabs = document.querySelector(".tabs");
tabs.addEventListener("click", trueRender);
cartProduct.addEventListener("click", (e) => {
  let id = Number(e.target.dataset.id);
  if (id) {
    const data = getStData();
    localStorage.setItem(
      "product",
      JSON.stringify(data.filter((item) => item.id !== id))
    );
  }
  renderStorage();
  addCount();
  totalFee();
});

btn1.addEventListener("click", () => {
  btn1.classList.add("active");
  btn2.classList.remove("active");
  btn3.classList.remove("active");
  btn4.classList.remove("active");
  btn5.classList.remove("active");
});
btn2.addEventListener("click", () => {
  btn1.classList.remove("active");
  btn2.classList.add("active");
  btn3.classList.remove("active");
  btn4.classList.remove("active");
  btn5.classList.remove("active");
});
btn3.addEventListener("click", () => {
  btn1.classList.remove("active");
  btn2.classList.remove("active");
  btn3.classList.add("active");
  btn4.classList.remove("active");
  btn5.classList.remove("active");
});
btn4.addEventListener("click", () => {
  btn1.classList.remove("active");
  btn2.classList.remove("active");
  btn3.classList.remove("active");
  btn4.classList.add("active");
  btn5.classList.remove("active");
});
btn5.addEventListener("click", () => {
  btn1.classList.remove("active");
  btn2.classList.remove("active");
  btn3.classList.remove("active");
  btn4.classList.remove("active");
  btn5.classList.add("active");
});

openModal.addEventListener("click", () => {
  cart.classList.toggle("positive");
  renderStorage();
  document.body.style.overflow = "hidden";
});
closeModal.addEventListener("click", () => {
  cart.classList.toggle("positive");
  document.body.style.overflow = "auto";
});

$(".slider__list").slick();
