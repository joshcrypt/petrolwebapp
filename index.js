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
  var petroldata =JSON.stringify({"Mileage":Mileage,"PpL":PpL,"Amount":Amount,"Capacity":Capacity,"PetrolStation":PetrolStation,"LicensePlate":LicensePlate,"AdditionalInfo":AdditionalInfo});
  let url = "http://localhost:5000/petroldetails";
  //Creating XHR object
  var xhr = new XMLHttpRequest();
  if (!('withCredentials' in xhr)) {
    alert('Browser does not support CORS.');
    return;
  }
  xhr.open("POST",url);
  xhr.onerror = function() {
    alert('There was an error.');
  };

  xhr.setRequestHeader('Content-Type','application/json');
  xhr.onload = function(){
    var data = JSON.parse(xhr.responseText);
    if(data.stat == 'ok'){
      console.log(data.message);
    }
    else{
      alert(data.message);
    }
  }
  xhr.send(petroldata);
  location.reload();
}
