document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("form");
    const firstName = document.getElementById("firstName");
    const lastName = document.getElementById("lastName");
    const emailId = document.getElementById("emailId");
    const phoneNumber = document.getElementById("phoneNumber");
    const streetAddress1 = document.getElementById("streetAddress1");
    const city =document.getElementById("city");
    const state =document.getElementById("state");
    const zipcode = document.getElementById("zipcode");
    const comments = document.getElementById("comments");
    const titleRadio = document.getElementsByName("title");
    const sourceCheckbox = document.getElementsByName("source");
    const submitButton = form.querySelector('input[type="submit"]');
    const selectBox = document.getElementById("feedback-type");
    const dynamicCheckbox = document.getElementById("dynamic-checkbox");
    const resetButton = document.getElementById("resetBtn");
    const resultContainer = document.getElementById('result');
  
    const namePattern = /^[A-Za-z]+$/;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@northeastern\.edu$/;
    const phonePattern = /^\d{3}-\d{3}-\d{4}$/;
    const streetAdress1Pattern = /^[a-zA-Z0-9._%+\-\s]+$/;
    const cityPattern =  /^[A-Za-z]+$/;
    const statePattern =  /^[A-Za-z]+$/;
    const zipcodePattern = /^\d{5}$/;
  
    submitButton.disabled = true;
  
    function validateField(field, pattern, errorElementId, minLength = 1, maxLength = 100) {
      const value = field.value.trim();
      const errorField = document.getElementById(errorElementId);
  
      if (value.length === 0 || value.length < minLength || value.length > maxLength || !pattern.test(value)) {
        errorField.style.display = "block";
        return false;
      } else {
        errorField.style.display = "none";
        return true;
      }
    }
  
    function validateForm() {
      let isFormValid = true;
  
      isFormValid &= validateField(firstName, namePattern, "error-firstName", 1, 50);
      isFormValid &= validateField(lastName, namePattern, "error-lastName", 1, 50);
      isFormValid &= validateField(emailId, emailPattern, "error-emailId");
      isFormValid &= validateField(phoneNumber, phonePattern, "error-phoneNumber");
      isFormValid &= validateField(zipcode, zipcodePattern, "error-zipcode", 5, 5);
      isFormValid &= validateField(streetAddress1, streetAdress1Pattern, "error-streetAddress1", 1, 20);
      isFormValid &= validateField(city, cityPattern, "error-city", 1, 20);
      isFormValid &= validateField(state, statePattern, "error-state", 1, 20);
      isFormValid &= comments.value.trim().length >= 20 ? (document.getElementById("error-comments").style.display = "none", true) : (document.getElementById("error-comments").style.display = "block", false);
  
      let isTitleSelected = Array.from(titleRadio).some(radio => radio.checked);
      document.getElementById("error-title").style.display = isTitleSelected ? "none" : "block";
      isFormValid &= isTitleSelected;
  
      let isSourceSelected = Array.from(sourceCheckbox).some(checkbox => checkbox.checked);
      document.getElementById("error-source").style.display = isSourceSelected ? "none" : "block";
      isFormValid &= isSourceSelected;
  
      if (selectBox.value === 'other') {
        const extraField = document.getElementById("extraField");
        isFormValid &= extraField && extraField.value.trim() !== '';
      }
  
      submitButton.disabled = !isFormValid;
    }
  
    firstName.addEventListener("input", validateForm);
    lastName.addEventListener("input", validateForm);
    emailId.addEventListener("input", validateForm);
    phoneNumber.addEventListener("input", validateForm);
    streetAddress1.addEventListener("input", validateForm);
    city.addEventListener("input", validateForm);
    state.addEventListener("input", validateForm);
    zipcode.addEventListener("input", validateForm);
    comments.addEventListener("input", validateForm);
  
    Array.from(titleRadio).forEach(radio => {
      radio.addEventListener("change", validateForm);
    });
  
    Array.from(sourceCheckbox).forEach(checkbox => {
      checkbox.addEventListener("change", validateForm);
    });
  
    
    selectBox.addEventListener("change", function() {
      dynamicCheckbox.innerHTML = '';  
  
    
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.id = 'additional-info';
      checkbox.name = 'additional-info';
      dynamicCheckbox.appendChild(checkbox);
  
      const label = document.createElement('label');
      label.htmlFor = 'additional-info';
      label.textContent = 'Additional Information';
      dynamicCheckbox.appendChild(label);
  
      
      const textField = document.createElement('textarea');  
      textField.id = 'extraField';
      textField.name = 'extraField';
      textField.placeholder = 'Provide additional info';
      textField.rows = '5';  
      textField.cols = '25';  
      textField.style.display = 'none';  
      dynamicCheckbox.appendChild(textField);
  
    
      const errorField = document.createElement('div');
      errorField.className = 'error';
      errorField.id = 'error-extraField';
      errorField.textContent = 'Please provide additional information.';
      errorField.style.display = 'none';
      dynamicCheckbox.appendChild(errorField);
  
      
      checkbox.addEventListener('change', function() {
        textField.style.display = checkbox.checked ? 'block' : 'none';
        textField.required = checkbox.checked;
        validateForm();
      });
  
      // Add event listener for input change
      textField.addEventListener('input', validateForm);
    });
  
    form.addEventListener("submit", function(event) {
      event.preventDefault();
  
      const table = document.createElement('table');
      table.innerHTML = `
      <tr><th>Title</th><td>${Array.from(titleRadio).find(radio => radio.checked).value}</td></tr>
        <tr><th>First Name</th><td>${firstName.value}</td></tr>
        <tr><th>Last Name</th><td>${lastName.value}</td></tr>
        <tr><th>Email</th><td>${emailId.value}</td></tr>
        <tr><th>Phone Number</th><td>${phoneNumber.value}</td></tr>
        <tr><th>Street Address</th><td>${streetAddress1.value}</td></tr>
        <tr><th>City</th><td>${city.value}</td></tr>
        <tr><th>State</th><td>${state.value}</td></tr>
        <tr><th>Zip Code</th><td>${zipcode.value}</td></tr>
        <tr><th>Comments</th><td>${comments.value}</td></tr>
        <tr><th>How did you hear?</th><td>${Array.from(sourceCheckbox).filter(checkbox => checkbox.checked).map(cb => cb.value).join(', ')}</td></tr>
      `;
      
      resultContainer.appendChild(table);
      form.reset();
  
      resetButton.addEventListener("click", function() {
          document.querySelectorAll(".error").forEach(error => error.style.display = "none");
          resultContainer.innerHTML = '';
          submitButton.disabled = true;
        });
    });
  });