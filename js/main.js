var productNameInput = document.getElementById("productName");
var productPriceInput = document.getElementById("productPrice");
var productCategoryInput = document.getElementById("productCategory");
var productImageInput = document.getElementById("productImage");
var productDescriptionInput = document.getElementById("productDescription");
var searchElament = document.getElementById("searchElament");
var addButton = document.getElementById("addButton");
var upDateButton = document.getElementById("upDateButton");
var curentIndex = 0;

var allProducts = [];
if (localStorage.getItem("list") !== null) {
  allProducts = JSON.parse(localStorage.getItem("list"));
  displayNewData();
}

function addNewProduct() {
  if (validationName() && validationPrice() && validationCategory()  && validationDescription() && validationImage()) {
    var product = {
      name: productNameInput.value.trim(),
      Price: Number(productPriceInput.value),
      Category: productCategoryInput.value.trim(),
      Description: productDescriptionInput.value.trim(),
      image: productImageInput.files[0]
        ? `${productImageInput.files[0]?.name}`
        : "images (1).jpg", 
    };
    allProducts.push(product);
    localStorage.setItem("list", JSON.stringify(allProducts));
    displayNewData();
    clearForm();
  }
}

function clearForm() {
  productNameInput.value = null;
  productPriceInput.value = null;
  productCategoryInput.value = null;
  productImageInput.value = null;
  productDescriptionInput.value = null;
  productNameInput.classList.remove("is-valid");
  productPriceInput.classList.remove("is-valid");
  productCategoryInput.classList.remove("is-valid");
  productImageInput.classList.remove("is-valid");
  productDescriptionInput.classList.remove("is-valid");

  
}
function displayNewData() {
  var html = "";
  for (var i = 0; i < allProducts.length; i++) {
    html += creatCols(i);
  }
  document.getElementById("dataRow").innerHTML = html;
}
function deleteElement(index) {
  allProducts.splice(index, 1);
  localStorage.setItem("list", JSON.stringify(allProducts));
  displayNewData();
}
function searchData() {
  var term = searchElament.value;
  var html = "";
  for (var i = 0; i < allProducts.length; i++) {
    if (allProducts[i].name.toLowerCase().includes(term.toLowerCase())) {
      html += creatCols(i);
    }
  }
  document.getElementById("dataRow").innerHTML = html;
}

function editElement(index) {
  curentIndex = index;
  var product = allProducts[index];
  productNameInput.value = product.name;
  productPriceInput.value = product.Price;
  productCategoryInput.value = product.Category;
  productDescriptionInput.value = product.Description;
  addButton.classList.add("d-none");
  upDateButton.classList.remove("d-none");
}
function upDateElement() {
  var product = {
    name: productNameInput.value,
    Price: Number(productPriceInput.value),
    Category: productCategoryInput.value,
    Description: productDescriptionInput.value,
    image: productImageInput.files[0]
      ? `../img/${productImageInput.files[0]?.name}`
      : "../img/images (1).jpg",
  };
  allProducts.splice(curentIndex, 1, product);
  localStorage.setItem("list", JSON.stringify(allProducts));
  displayNewData();

  addButton.classList.remove("d-none");
  upDateButton.classList.add("d-none");
  clearForm();
}
function creatCols(i) {
  var regex = new RegExp(searchElament.value, "gi");
  return `<div class="col-lg-2 col-md-4">
<div class="product bg-white rounded-3 p-4 text-center text-black ">
<img src="${
    allProducts[i].image
      ? `./img/${allProducts[i].image}`
      : "./img/images (1).jpg"
  }" class="w-100 pb-2" alt="${allProducts[i].name}">
<h2>${allProducts[i].name.replace(
    regex,
    (match) => `<span class="bg-info">${match}</span>`
  )}</h2>
<h4>${allProducts[i].Price}</h4>
<h4>${allProducts[i].Category}</h4>
<p>${allProducts[i].Description}</p>
</div> 
<div class="pt-3 d-flex justify-content-between">
<button onclick="deleteElement(${i})" class="btn-outline-danger btn px-4">Clear <i class="fa-solid fa-trash"></i></button>
<button  onclick="editElement(${i})" class="btn-outline-primary btn">Update<i class="fa-solid fa-pen-to-square"></i></button>
</div>  
</div>`;
}
function validationName() {
  var regex = /^[a-zA-Z][a-zA-Z0-9]{2,19}$/;
  var text = productNameInput.value;
  var validationName = document.getElementById("validationName");
  if (regex.test(text)) {
    productNameInput.classList.remove("is-invalid");
    productNameInput.classList.add("is-valid");
    validationName.classList.add("d-none");
    return true;
  } else {
    productNameInput.classList.add("is-invalid");
    productNameInput.classList.remove("is-valid");
    validationName.classList.remove("d-none");
    return false;
  }
}

function validationPrice() {
  var regex = /^\d{1,3}(,\d{3})*$/;
var productPriceInput = document.getElementById("productPrice");
  var text = productPriceInput.value;
  var validationPrice = document.getElementById("validationPrice");

  if (regex.test(text)) {
    productPriceInput.classList.remove("is-invalid");
    productPriceInput.classList.add("is-valid");
    validationPrice.classList.add("d-none");
    return true;
  } else {
    productPriceInput.classList.add("is-invalid");
    productPriceInput.classList.remove("is-valid");
    validationPrice.classList.remove("d-none");
    return false;
  }
}
function validationCategory() {
  var regex = /^(tV|mOBILE|electronics)$/i;
  var text = productCategoryInput.value;
  var validationCategory = document.getElementById("validationCategory");
  if (regex.test(text)) {
    productCategoryInput.classList.remove("is-invalid");
    productCategoryInput.classList.add("is-valid");
    validationCategory.classList.add("d-none");
    return true;
  } else {
    productCategoryInput.classList.add("is-invalid");
    productCategoryInput.classList.remove("is-valid");
    validationCategory.classList.remove("d-none");
    return false;
  }
}
function validationDescription() {
  var regex = /^[a-zA-Z][a-zA-Z0-9]{2,19}$/m;
  var text = productDescriptionInput.value;
  var validationDescription = document.getElementById("validationDescription");
  if (regex.test(text)) {
    productDescriptionInput.classList.remove("is-invalid");
    productDescriptionInput.classList.add("is-valid");
    validationDescription.classList.add("d-none");
    return true;
  } else {
    productDescriptionInput.classList.add("is-invalid");
    productDescriptionInput.classList.remove("is-valid");
    validationDescription.classList.remove("d-none");
    return false;
  }
}
function validationImage() {
  var regex = /^.{1,}\.(jpg|png|avif|jpeg|svg)$/;
  var text = productImageInput.value;
  var validationImage = document.getElementById("validationImage");
  if (regex.test(text)) {
    productImageInput.classList.remove("is-invalid");
    productImageInput.classList.add("is-valid");
    validationImage.classList.add("d-none");
    return true;
  } else {
    productImageInput.classList.add("is-invalid");
    productImageInput.classList.remove("is-valid");
    validationImage.classList.remove("d-none");
    return false;
  }
}
