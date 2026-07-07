// contact.js — Contact form validation (empty fields, email format, digits-only phone)

document.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('contact-form');
  if (!form) return;

  var status = document.getElementById('form-status');

  var fields = {
    name: document.getElementById('field-name'),
    email: document.getElementById('field-email'),
    phone: document.getElementById('field-phone'),
    message: document.getElementById('field-message')
  };

  function setError(fieldWrapper, message) {
    fieldWrapper.classList.add('invalid');
    var errorEl = fieldWrapper.querySelector('.field-error');
    if (errorEl) errorEl.textContent = message;
  }

  function clearError(fieldWrapper) {
    fieldWrapper.classList.remove('invalid');
  }

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function isDigitsOnly(value) {
    return /^[0-9]+$/.test(value);
  }

  function validate() {
    var valid = true;

    Object.keys(fields).forEach(function (key) {
      var wrapper = fields[key].closest('.field');
      var value = fields[key].value.trim();

      if (value === '') {
        setError(wrapper, 'This field cannot be empty.');
        valid = false;
        return;
      }
      clearError(wrapper);

      if (key === 'email' && !isValidEmail(value)) {
        setError(wrapper, 'Enter a valid email address, e.g. name@example.com.');
        valid = false;
      }

      if (key === 'phone' && !isDigitsOnly(value)) {
        setError(wrapper, 'Phone number must contain digits only.');
        valid = false;
      }
    });

    return valid;
  }

  // Clear individual field error as the user types
  Object.keys(fields).forEach(function (key) {
    fields[key].addEventListener('input', function () {
      clearError(fields[key].closest('.field'));
    });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    status.classList.remove('show', 'success', 'error');

    if (validate()) {
      status.textContent = 'Message sent. Thanks for reaching out — I\'ll reply within 48 hours.';
      status.classList.add('show', 'success');
      form.reset();
    } else {
      status.textContent = 'Transmission blocked: please fix the highlighted fields.';
      status.classList.add('show', 'error');
    }
  });
});
