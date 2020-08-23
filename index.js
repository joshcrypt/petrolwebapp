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
  let url = " https://petrolappapi.herokuapp.com/petroldetails";
  var Mileage = document.getElementById('Mileage').value;
  var PpL = document.getElementById('PpL').value;
  var Amount = document.getElementById('Amount').value;
  var Capacity = document.getElementById('Capacity').value;
  var PetrolStation = document.getElementById('PetrolStation').value;
  var LicensePlate = document.getElementById('LicensePlate').value;
  var AdditionalInfo = document.getElementById('AdditionalInfo').value;
  //Creating XHR object
  var xhr = new XMLHttpRequest();
  if (!('withCredentials' in xhr)) {
    alert('Browser does not support CORS.');
    return;
  }
  xhr.open("POST",url,false);
  xhr.onerror = function() {
    alert('There was an error.');
  };
  xhr.setRequestHeader('Content-Type','application/json');
  xhr.send(JSON.stringify({"Mileage":Mileage,"PpL":PpL,"Amount":Amount,"Capacity":Capacity,"PetrolStation":PetrolStation,"LicensePlate":LicensePlate,"AdditionalInfo":AdditionalInfo}));
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
  /*xhr.onload = function(){
    if (xhr.status != 204) { // analyze HTTP status of the response
      alert(`Error ${xhr.status}: ${xhr.statusText}`); // e.g. 404: Not Found
    } else { // show the result
      alert(`Done, got ${xhr.response.length} bytes`); // response is the server
    }
  }
  xhr.onprogress = function(event) {
    if (event.lengthComputable) {
      alert(`Received ${event.loaded} of ${event.total} bytes`);
    } else {
      alert(`Received ${event.loaded} bytes`); // no Content-Length
    }
  
  };
  xhr.send(petroldata);*/
  location.reload();
}
