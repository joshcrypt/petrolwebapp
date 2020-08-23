//Delete petrol details
function deletePetrolDetails(Id){
    var delpetroldetail = confirm("Are you sure you want to delete?");
    if(delpetroldetail == true){
      const xhr = new XMLHttpRequest();
      let url = ` https://petrolappapi.herokuapp.com/petroldetails/${Id}`
      xhr.open("DELETE",url, false);
      xhr.send();
      location.reload();
    } else{
      location.reload();
    }
}
//Update petrol details
function setEditModal(Id){
    const xhr = new XMLHttpRequest();
    let url = ` https://petrolappapi.herokuapp.com/petroldetails/${Id}`
    xhr.open("GET",url, false);
    xhr.send();
    const petroldetail = JSON.parse(xhr.responseText);

    let Mileage = petroldetail.Mileage;
    let Date = petroldetail.Date;
    let PpL = petroldetail.PpL;
    let Amount = petroldetail.Amount;
    let Capacity = petroldetail.Capacity;
    let PetrolStation = petroldetail.PetrolStation;
    let LicensePlate = petroldetail.LicensePlate;
    let AdditionalInfo = petroldetail.AdditionalInfo;

    document.getElementById('Id').value = Id;
    document.getElementById('Mileage').value = Mileage;
    document.getElementById('Date').value = Date;
    document.getElementById('PpL').value = PpL;
    document.getElementById('Amount').value = Amount;
    document.getElementById('Capacity').value = Capacity;
    document.getElementById('PetrolStation').value = PetrolStation;
    document.getElementById('LicensePlate').value = LicensePlate; 
    document.getElementById('AdditionalInfo').value = AdditionalInfo;
    //Set the action on the form
    //document.getElementById('editpetroldetailsform').action = url;
}
//Put Petrol Details after update
function PutPetrolDetails(){
  //alert("This has worked");
  var Id = document.getElementById('Id').value;
  var Mileage = document.getElementById('Mileage').value;
  var Date = document.getElementById('Date').value;
  var PpL = document.getElementById('PpL').value;
  var Amount = document.getElementById('Amount').value;
  var Capacity = document.getElementById('Capacity').value;
  var PetrolStation = document.getElementById('PetrolStation').value;
  var LicensePlate = document.getElementById('LicensePlate').value; 
  var AdditionalInfo = document.getElementById('AdditionalInfo').value;
  var xhr = new XMLHttpRequest();
  if (!('withCredentials' in xhr)) {
    alert('Browser does not support CORS.');
    return;
  };
  let url = ` https://petrolappapi.herokuapp.com/petroldetails/${Id}`;
  xhr.open("PUT",url,false);
  xhr.onerror = function() {
    alert('There was an error.');
  };
  xhr.setRequestHeader('Content-Type','application/json'); 
  xhr.send(JSON.stringify({"Mileage":Mileage,"Date":Date,"PpL":PpL,"Amount":Amount,"Capacity":Capacity,"PetrolStation":PetrolStation,"LicensePlate":LicensePlate,"AdditionalInfo":AdditionalInfo}));
  xhr.onload = () =>{
    alert(xhr.responseText);
  };
  xhr.onreadystatechange =() => {//Call a function when the state changes.
    if(xhr.status == 204) {
      alert(`Error ${xhr.status}: ${xhr.statusText}`); // e.g. 404: Not Found
    } else { // show the result
      alert(`Done, got ${xhr.response.length} bytes`); // response is the server
    }
  }
  location.reload();
}
  //Load Petrol details in view page
function LoadPetrolDetails(){
const xhr = new XMLHttpRequest();
let url = " https://petrolappapi.herokuapp.com/petroldetails";
xhr.open("GET",url,false);
xhr.send();
const petroldetails = JSON.parse(xhr.responseText);
for(let petroldetail of petroldetails){
  const petrolview = `
    <div class="col-4">
    <div class="card text-center text-white bg-dark border-dark mb-3">
        <div class="card-body">
            <h5 class="card-title">${petroldetail.Date}</h5>
            <h6 class="card-subtitle mb-2">${petroldetail.Id}</h6>
            <h6 class="card-subtitle mb-2">${petroldetail.Mileage}</h6>
            <div>Amount: ${petroldetail.Amount}</div>
            <div>Price Per Liter: ${petroldetail.PpL}</div>
            <div>Capacity: ${petroldetail.Capacity}</div>
            <div>Petrol Station: ${petroldetail.PetrolStation}</div>
            <div>License Plate: ${petroldetail.LicensePlate}</div>
            <div>Additional Info: ${petroldetail.AdditionalInfo}</div>
            <hr>
            <button type="button" class="btn btn-danger" onclick="deletePetrolDetails(${petroldetail.Id})">Delete</button>
            <button type="button" class="btn btn-primary" data-toggle="modal"
                data-target="#editpetroldetailsModal" onclick="setEditModal(${petroldetail.Id})">
                Edit
            </button>
        </div>
    </div>
  </div>
  `
  document.getElementById('petroldetails').innerHTML = document.getElementById('petroldetails').innerHTML + petrolview;
}
}
LoadPetrolDetails();