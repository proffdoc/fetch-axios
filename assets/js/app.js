import { BASE_URL } from "./constant.js";
const tBody = document.querySelector("tbody");
const search = document.querySelector("#search");
const sortAsc = document.querySelector(".asc-price");
const sortDesc = document.querySelector(".desc-price");
const sortDefault = document.querySelector(".default-price");
const sortTitle = document.querySelector(".sort-title");
const sortByTitleSelect = document.querySelector("#sort-by-title");
const spinner = document.querySelector(".spinner");
const more = document.querySelector(".more");
const wellcome = document.querySelector(".wellcome span");


const getAllData = async (endpoint) => {
    try {
      const response = await axios(`${BASE_URL}/${endpoint}`);
      return response;
    } catch (error) {
      console.log(error);
    }}
const getDataById = async (endpoint, id) => {
        try {
          const response = await axios(`${BASE_URL}/${endpoint}/${id}`);
          return response;
        } catch (error) {
          console.log(error);
        }
      };
const deleteDataById = async (endpoint, id) => {
        try {
          const response = await axios.delete(`${BASE_URL}/${endpoint}/${id}`);
          return response;
        } catch (error) {
          console.log(error);
        }
      };
const addNewData = async (endpoint, payload) => {
        try {
          const response = await axios.post(`${BASE_URL}/${endpoint}`, payload);
          return response;
        } catch (error) {
          console.log(error);
        }
      };

let rowCount = 3;
let products = null;


async function getProducts() {
  try {
    const response = await getAllData("products");
    drawTable(response.data.slice(0, rowCount));

    products = response.data;
  } catch (error) {
    console.log(error);
  } finally {
    spinner.classList.add("d-none");
  }
}

function drawTable(arr) {
  tBody.innerHTML = "";
  arr.forEach((element) => {
    const trElem = document.createElement("tr");
    trElem.innerHTML = `
      <td><img src="${element.image}"/></td>
      <td>${element.id}</td>
      <td>${element.title}</td>
      <td>${element.category}</td>
      <td>${element.description}</td>
      <td>${element.price}</td>
      <td><i class="fa-solid fa-heart fav-icon" data-id="${element.id}"></i></td>
      <td><a href="details.html?id=${element.id}">Deatils</a></td>
      <td><a href="form.html?id=${element.id}" class="btn btn-success">Edit</a></td>
      `;

    tBody.append(trElem);
  });
}

search.addEventListener("input", function (e) {
  const filtered = products.filter((item) =>
    item.title
      .trim()
      .toLowerCase()
      .includes(e.target.value.trim().toLowerCase())
  );
  drawTable(filtered);
});

sortAsc.addEventListener("click", function () {
  const sorted = products.toSorted((a, b) => a.price - b.price);

  drawTable(sorted);
});
sortDesc.addEventListener("click", function () {
  const sorted = products.toSorted((a, b) => b.price - a.price);

  drawTable(sorted);
});
sortDefault.addEventListener("click", function () {
  drawTable(products);
});

sortTitle.addEventListener("click", function () {
  let sorted;
  if (this.textContent === "Sort By Title Asc") {
    this.textContent = "Sort By Title Desc";
    sorted = products.toSorted((a, b) =>
      a.title.toLowerCase().localeCompare(b.title.toLowerCase())
    );
  } else if (this.textContent === "Sort By Title Desc") {
    this.textContent = "Sort By Title Default";

    sorted = products.toSorted((a, b) =>
      b.title.toLowerCase().localeCompare(a.title.toLowerCase())
    );
  } else {
    sorted = [...products];
    this.textContent = "Sort By Title Asc";
  }

  drawTable(sorted);
});

sortByTitleSelect.addEventListener("change", function (e) {
  let sorted;
  if (this.value === "asc") {
    sorted = products.toSorted((a, b) =>
      a.title.toLowerCase().localeCompare(b.title.toLowerCase())
    );
  } else if (this.value === "desc") {
    sorted = products.toSorted((a, b) =>
      b.title.toLowerCase().localeCompare(a.title.toLowerCase())
    );
  } else {
    sorted = [...products];
  }

  drawTable(sorted);
});

more.addEventListener("click", function () {
  if (this.textContent === "Show More") {
    rowCount += 3;
  } else {
    rowCount -= 3;
  }
  if (rowCount >= products.length) {
    this.textContent = "Show Less";
  }
  if (rowCount <= 3) {
    this.textContent = "Show More";
  }
  drawTable(products.slice(0, rowCount));
});