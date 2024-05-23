import {getDataById} from "./app.js"

const details = document.querySelector("#details");
const url = new URLSearchParams(window.location.search);

const id = url.get("id");

async function getProduct() {
    try {
      const response = await getDataById("products", id);
      renderDetails(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  
  window.addEventListener("load", function () {
    getProduct();
  });
  
  function renderDetails(product) {
    details.innerHTML = "";
    details.innerHTML = `
      <div class="row">
      <div class="col col-6 d-flex flex-column align-items-center">
        <img src="${product.image}" alt="" />
      </div>
      <div class="col col-6 d-flex flex-column justify-content-center">
        <h2>Title: ${product.title}</h2>
        <p><b>Description:</b> ${product.description}</p>
        <p><b>Price:</b>  $${product.price}</p>
        <button class="w-50 btn btn-primary go-back">Go Back</button>
      </div>
    </div>
      `;
  
    const goBackBtn = document.querySelector(".go-back");
  
    goBackBtn.addEventListener("click", function () {
      window.history.back();
    });
  }