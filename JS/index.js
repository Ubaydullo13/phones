import { createRow, validate } from "./functions.js";

const wrapper = document.getElementById("wrapper");
const name = document.getElementById("name");
const price = document.getElementById("price");
const description = document.getElementById("desc");
const formEL = document.getElementById("form");
const loader = document.querySelector(".center");

document.addEventListener("DOMContentLoaded", function () {
  fetch("https://auth-rg69.onrender.com/api/products/all")
    .then((response) => response.json())
    .then((data) => {
      if (data.length) {
        data.forEach((phone, index) => {
          let row = createRow(phone, index + 1);
          wrapper.innerHTML += row;
        });

        loader.style.display = "none";

        const deleteBtns = document.querySelectorAll(".btn-danger");
        if (deleteBtns.length) {
          deleteBtns.forEach((del) => {
            del &&
              del.addEventListener("click", function () {
                let id = this.parentNode.parentNode
                  .getAttribute("data-id")
                  .substring(5);
                if (id) {
                  let isDelete = confirm("Are you sure you want to delete");
                  if (isDelete) {
                    fetch(`https://auth-rg69.onrender.com/api/products/${id}`, {
                      method: "DELETE",
                    })
                      .then((response) => response.json())
                      .then((data) => {
                        if (
                          data.message == "Mahsulot muvaffaqiyatli o'chirildi"
                        ) {
                          location.reload();
                        }
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                  }
                }
              });
          });
        }

        const nameList = document.querySelectorAll(".text-primary");
        if (nameList.length) {
          nameList.forEach((name) => {
            name &&
              name.addEventListener("click", function () {
                let id = this.parentNode.getAttribute("data-id").substring(5);
                if (id) {
                  let domain = window.location.href.substring(
                    0,
                    window.location.href.search("index")
                  );
                  window.location.assign(`${domain}pages/info.html?id=${id}`);
                }
              });
          });
        }
      }
    })
    .catch((error) => console.log(error));

  formEL.addEventListener("submit", function (e) {
    e.preventDefault();
    if (validate(name, price)) {
      let phone = {
        name: name.value,
        price: price.value,
        description: description.value,
        status: "active",
        category_id: "2",
      };

      fetch("https://auth-rg69.onrender.com/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(phone),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.id) {
            let row = createRow(phone, wrapper.children.length + 1);
            wrapper.innerHTML += row;
            formEL.reset();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  });
});
