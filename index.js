const URL = process.env.URL;
(function() {
  'use strict';
  window.addEventListener('load', function() {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function(form) {
      form.addEventListener('submit', function(event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });
  }, false);
})();
//Process Form data
function FormProcess(){
  var Mileage = document.getElementById('Mileage').value;
  var PpL = document.getElementById('PpL').value;
  var Amount = document.getElementById('Amount').value;
  var Capacity = document.getElementById('Capacity').value;
  var PetrolStation = document.getElementById('PetrolStation').value;
  var LicensePlate = document.getElementById('LicensePlate').value;
  var AdditionalInfo = document.getElementById('AdditionalInfo').value;
  //Creating XHR object
  let xhr = new XMLHttpRequest();
  xhr.open("POST",URL,true);
  xhr.setRequestHeader('Content-Type','application/json');
  // Create a state change callback 
  xhr.onreadystatechange = function () { 
    if (xhr.readyState === 4 && xhr.status === 200) { 
        // Print received data from server 
        result.innerHTML = this.responseText; 
    } 
  }; 
  var petroldata =JSON.stringify({"Mileage":Mileage,"PpL":PpL,"Amount":Amount,"Capacity":Capacity,"PetrolStation":PetrolStation,"LicensePlate":LicensePlate,"AdditionalInfo":AdditionalInfo});
  xhr.send(petroldata);
  location.reload();
}
