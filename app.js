// Stores the URL of the Random User API
let randomUserGenerator = "https://randomuser.me/api/?results=12";

// Target the Container Div
const gridContainer = document.getElementById('grid-container');

// Targets the Modal Close Window
const closeModal = document.querySelector('.close');

// Targets the Modal
const modalContent = document.getElementById('bg-modal');

// Stores results into currentEmployee 
let currentEmployee = [];

// Used as an array to hold results for modal window
let employee = [];


// Fetch to convert API into JSON
fetch(randomUserGenerator)
    .then(response => response.json())
    .then(function (data) {
        let users = data.results;
        displayEmployees(users);
        currentEmployee = users;
    })
    .then(filteredEmployees)
    .catch(error => console.log(error))


// Function to iterate through employees and display them
function displayEmployees(user) {
    user.forEach((user, index) => {
        const createDiv = document.createElement('div');
        createDiv.className = 'employee-info';
        createDiv.setAttribute("data-index", `${index}`);
            createDiv.innerHTML = `
                <img src=${user.picture.large} class="employee-image">
                <div class="card">
                    <h3 class="names">${user.name.first} ${user.name.last}</h3>
                    <p class="email">${user.email}</p>
                    <p class="location">${user.location.city}</p>
                </div>  
            `;
            gridContainer.append(createDiv);     
    })

};

// Add Event Listener to populate the modal
gridContainer.addEventListener("click", (event) => {
    if(event.target !== gridContainer){
      const card = event.target.closest(".employee-info");
      const index = card.getAttribute('data-index');
      showModal(index);
    }
  });

// Function to hold results into employee array for Modal
function filteredEmployees() {
    employee = currentEmployee;
}

// Function to interpolate the information from selected card into modal
function showModal(index) {
    employee = currentEmployee[index];
    let name = employee.name;
    let dob = employee.dob;
    let phone = employee.phone;
    let email = employee.email;
    let city = employee.location.city;
    let street = employee.location.street;
    let state = employee.location.state;
    let postcode = employee.location.postcode;
    let picture = employee.picture.large;
    let date = new Date(dob.date);

    const modalHTML = ` 
    <div id="modal-content">
    <div class="close">x</div>
    <img class="modal-avatar" src="${employee.picture.large}" />
        <h2 id= "modalCard" class="name generated" data-index="${index}" >${name.first} ${name.last}</h2>
        <p class="email generated">${email}</p>
        <p class="address generated">${city}</p>
        <hr />
        <p class="phone generated">${phone}</p>
        <p class="address generated">${street} ${state}, ${postcode}</p>
        <p class= "bday generated">Birthday: ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
      `

    //   Places modal content into modal container and allows click event to display modal
      modalContent.innerHTML = modalHTML; 
      modalContent.style.display = "flex";  
}

// Add Event Listener to close modal window
document.body.addEventListener('click', function(e) {
    if (e.target.className === "close")
    modalContent.style.display = "none";
})
