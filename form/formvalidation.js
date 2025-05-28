document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("volunteerForm");

  // Get all form elements that need validation
  const emailPrimary = document.getElementById("emailPrimary");
  const emailConfirm = document.getElementById("emailConfirm");
  const fullName = document.getElementById("fullName");
  const contactPhone = document.getElementById("contactPhone");
  const age = document.getElementById("age");
  const volunteerYes = document.getElementById("volunteerYes");
  const volunteerNo = document.getElementById("volunteerNo");
  const volunteerDetails = document.getElementById("volunteerDetails");

  const emailPrimaryError = document.getElementById("emailPrimaryError");
  const emailConfirmError = document.getElementById("emailConfirmError");
  const fullNameError = document.getElementById("fullNameError");
  const contactPhoneError = document.getElementById("contactPhoneError");
  const ageError = document.getElementById("ageError");
  const volunteerExperienceError = document.getElementById(
    "volunteerExperienceError"
  );
  const volunteerDetailsError = document.getElementById(
    "volunteerDetailsError"
  );

  function showError(inputElement, errorElement, message) {
    inputElement.classList.add("is-invalid");
    errorElement.textContent = message;
  }

  function clearError(inputElement, errorElement) {
    inputElement.classList.remove("is-invalid");
    errorElement.textContent = "";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function validateEmailPrimary() {
    if (emailPrimary.value.trim() === "") {
      showError(emailPrimary, emailPrimaryError, "Email is required.");
      return false;
    } else if (!emailRegex.test(emailPrimary.value.trim())) {
      showError(
        emailPrimary,
        emailPrimaryError,
        "Please enter a valid email address."
      );
      return false;
    } else {
      clearError(emailPrimary, emailPrimaryError);
      return true;
    }
  }

  function validateEmailConfirm() {
    if (emailConfirm.value.trim() === "") {
      showError(
        emailConfirm,
        emailConfirmError,
        "Email confirmation is required."
      );
      return false;
    } else if (!emailRegex.test(emailConfirm.value.trim())) {
      showError(
        emailConfirm,
        emailConfirmError,
        "Please enter a valid email address."
      );
      return false;
    } else if (emailConfirm.value.trim() !== emailPrimary.value.trim()) {
      showError(emailConfirm, emailConfirmError, "Emails do not match.");
      return false;
    } else {
      clearError(emailConfirm, emailConfirmError);
      return true;
    }
  }

  function validateFullName() {
    if (fullName.value.trim() === "") {
      showError(fullName, fullNameError, "Full name is required.");
      return false;
    } else {
      clearError(fullName, fullNameError);
      return true;
    }
  }

  function validateContactPhone() {
    if (contactPhone.value.trim() === "") {
      showError(contactPhone, contactPhoneError, "Contact phone is required.");
      return false;
    }
    // Optional: Add a more specific phone number regex if needed
    // else if (!/^\+?[0-9\s-()]{7,20}$/.test(contactPhone.value.trim())) {
    //     showError(contactPhone, contactPhoneError, 'Please enter a valid phone number.');
    //     return false;
    // }
    else {
      clearError(contactPhone, contactPhoneError);
      return true;
    }
  }

  function validateAge() {
    if (age.value.trim() === "") {
      clearError(age, ageError);
      return true;
    } else if (
      isNaN(age.value) ||
      parseInt(age.value) < 0 ||
      !Number.isInteger(parseFloat(age.value))
    ) {
      showError(age, ageError, "Please enter a valid whole number for age.");
      return false;
    } else {
      clearError(age, ageError);
      return true;
    }
  }

  function validateVolunteerExperience() {
    const isYesChecked = volunteerYes.checked;
    const isNoChecked = volunteerNo.checked;

    if (!isYesChecked && !isNoChecked) {
      volunteerExperienceError.textContent = "Please select an option.";
      volunteerExperienceError.style.display = "block";
      return false;
    } else {
      volunteerExperienceError.textContent = "";
      volunteerExperienceError.style.display = "none";
      return true;
    }
  }

  function validateVolunteerDetails() {
    if (volunteerYes.checked && volunteerDetails.value.trim() === "") {
      showError(
        volunteerDetails,
        volunteerDetailsError,
        "Please describe your previous experiences."
      );
      return false;
    } else {
      clearError(volunteerDetails, volunteerDetailsError);
      return true;
    }
  }

  emailPrimary.addEventListener("blur", validateEmailPrimary);
  emailConfirm.addEventListener("blur", validateEmailConfirm);
  fullName.addEventListener("blur", validateFullName);
  contactPhone.addEventListener("blur", validateContactPhone);
  age.addEventListener("blur", validateAge);

  volunteerYes.addEventListener("change", () => {
    validateVolunteerExperience();
    validateVolunteerDetails();
  });
  volunteerNo.addEventListener("change", () => {
    validateVolunteerExperience();
    validateVolunteerDetails();
  });

  volunteerDetails.addEventListener("blur", validateVolunteerDetails);

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    // Run all validations
    const isEmailPrimaryValid = validateEmailPrimary();
    const isEmailConfirmValid = validateEmailConfirm();
    const isFullNameValid = validateFullName();
    const isContactPhoneValid = validateContactPhone();
    const isAgeValid = validateAge();
    const isVolunteerExperienceValid = validateVolunteerExperience();
    const isVolunteerDetailsValid = validateVolunteerDetails();

    // Check if all validations passed
    if (
      isEmailPrimaryValid &&
      isEmailConfirmValid &&
      isFullNameValid &&
      isContactPhoneValid &&
      isAgeValid &&
      isVolunteerExperienceValid &&
      isVolunteerDetailsValid
    ) {
      alert("Form submitted successfully!"); // For demonstration
      form.submit(); // Uncomment this line to allow actual form submission
    } else {
      alert("Please correct the errors in the form.");
    }
  });
});
