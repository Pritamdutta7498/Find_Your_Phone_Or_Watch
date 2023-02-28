//step-1......
const loadPhones = async (searchText) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhones(data.data);
};
//step-2.........
const displayPhones = (phones) => {
  const phonesContainer = document.getElementById("phones-container");
  //search result clear after search
  phonesContainer.textContent = '';
  //display 10 phone only....
  phones = phones.slice(0,9);

  //display no phones found!---important

  const notFound =document.getElementById('not-found');
  if(phones.length === 0){
    notFound.classList.remove('d-none');
  }else{
    notFound.classList.add('d-none');
  }
  //display all phone
  phones.forEach((phone) => {
    console.log(phone);
    //step-3.............
    const myDiv = document.createElement("div");
    myDiv.innerHTML = `
        <div class="col">
        <div class="card p-5">
            <img src="${phone.image}" class="card-img-top">
            <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">This is a longer card with supporting text below as a natural lead-in
                    to
                    additional content. This content is a little bit longer.</p>
            </div>
        </div>
    </div>`;
    phonesContainer.appendChild(myDiv);
  });
  //stop spinner loader
  toggleSpinner(false);



};
//handle search btn click


document.getElementById('btn-search').addEventListener('click', function(){
  //start spinner loader
  toggleSpinner(true);


    const inputField = document.getElementById('search-field');
    const searchText = inputField.value;
    loadPhones(searchText)
    
});
const toggleSpinner = isLoading =>{
  const loaderSection = document.getElementById('loader');
  if(isLoading){
    loaderSection.classList.remove('d-none');
  }else{
    loaderSection.classList.add('d-none');
  }
}

// loadPhones();
