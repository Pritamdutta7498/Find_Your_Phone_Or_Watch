//step-1......
const loadPhones = async (searchText, dataLimit) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhones(data.data, dataLimit);
};
//step-2.........

const displayPhones = (phones, dataLimit) => {
  const phonesContainer = document.getElementById("phones-container");
  //search result clear after search
  phonesContainer.textContent = "";
  //display 10 phone only....and show all
  const showAll = document.getElementById("show-all");
  if (dataLimit && phones.length > 10) {
    phones = phones.slice(0, 10);
    showAll.classList.remove("d-none");
  } else {
    showAll.classList.add("d-none");
  }

  //display no phones found!---important

  const notFound = document.getElementById("not-found");
  if (phones.length === 0) {
    notFound.classList.remove("d-none");
  } else {
    notFound.classList.add("d-none");
  }
  //display all phone
  phones.forEach((phone) => {
    //step-3.............
    const myDiv = document.createElement("div");
    myDiv.innerHTML = `
        <div class="col">
        <div class="card p-5">
            <img src="${phone.image}" class="card-img-top">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">This is a longer card with supporting text below as a natural lead-in
                    to
                    additional content. This content is a little bit longer.</p>
                    <button onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">details</button>
            </div>
        </div>
    </div>`;
    phonesContainer.appendChild(myDiv);
  });
  //stop spinner loader
  toggleSpinner(false);
};
//show all btn function
const processSearch = (dataLimit) => {
  toggleSpinner(true);
  const inputField = document.getElementById("search-field");
  const searchText = inputField.value;
  loadPhones(searchText, dataLimit);
};

document.getElementById("btn-search").addEventListener("click", function () {
  //start spinner loader
  processSearch(10);
});

//search input field enter key handler:
document
  .getElementById("search-field")
  .addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      processSearch(10);
    }
  });

const toggleSpinner = (isLoading) => {
  const loaderSection = document.getElementById("loader");
  if (isLoading) {
    loaderSection.classList.remove("d-none");
  } else {
    loaderSection.classList.add("d-none");
  }
};
//not the best way to load show all

document.getElementById("btn-show-all").addEventListener("click", function () {
  processSearch();
});

const loadPhoneDetails = async (id) => {
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;

  const res = await fetch(url);
  const data = await res.json();
  displayPhoneDetails(data.data);
};

const displayPhoneDetails  = phone =>{
  console.log(phone);
  console.log();
  const modalTitle = document.getElementById('phoneDetailModalLabel');
  modalTitle.innerText = phone.name;
  const phoneDetail = document.getElementById('phone-detail');
  phoneDetail.innerHTML = `
  <p>Release Date: ${phone.releaseDate ? phone.releaseDate : 'No data found!' }</p>
  <p>Chipset: ${phone.mainFeatures ? phone.mainFeatures.chipSet : "No data found!"} </p>
  <p>Memory: ${phone.mainFeatures ? phone.mainFeatures.memory : "No data found!"} </p>
  `;

}
// loadPhones("apple");
