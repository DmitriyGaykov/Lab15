const addForm = document.querySelector('.add-form');
addForm?.addEventListener('submit', onAddSubmit);

const redirectAddButton = document.querySelector('.redirect-to-add');
redirectAddButton?.addEventListener('click', onRedirectToAdd);

const cancelButton = document.querySelector('.cancel');
cancelButton?.addEventListener('click', onCancel);

const updateForm = document.querySelector('.update-form');
updateForm?.addEventListener('submit', onUpdateSubmit);

const nameInput = document.querySelector('.name-input');
nameInput?.addEventListener('input', onNameInputChange);

const phoneInput = document.querySelector('.phone-input');
phoneInput?.addEventListener('input', onPhoneInputChange);

const deleteButton = document.querySelector('.delete-button');

function onRedirectToAdd() {
  window.location = '/add';
  alert()
}

async function onCancel() {
  window.location.href = '/';
}

async function onContact(name, phone) {
  window.location.href = `/update?name=${name}&phone=${phone}`;
}

function onAddSubmit(event) {
  const name = event.target[0].value;
  const phone = event.target[1].value;
  
  if (!isNumberValid(phone)) {
    alert('Invalid phone number');
    return event.preventDefault();
  }
  
  if (!isNameValid(name)) {
    alert('Invalid name');
    return event.preventDefault();
  }
}

function onUpdateSubmit(event) {
  if(event.submitter.name === 'delete') {
    updateForm.action = '/delete';
    updateForm.submit();
    return;
  }
  
  const name = event.target[0].value;
  const phone = event.target[1].value;
  
  if (!isNumberValid(phone)) {
    alert('Invalid phone number');
    return event.preventDefault();
  }
  
  if (!isNameValid(name)) {
    alert('Invalid name');
    return event.preventDefault();
  }
}

function onNameInputChange() {
  deleteButton?.remove();
}

function onPhoneInputChange(event) {
  onNameInputChange();
  const input = event.target;
  const value = input.value;
  input.value = formatPhoneNumber(value);
  
  if (!isNumberValid(input.value)) {
    input.style.border = '1px solid red';
  } else {
    input.style.border = '1px solid black';
  }
}

function isNumberValid(phoneNumber) {
  const regex = /^375 \(\d{2}\) \d{3}-\d{2}-\d{2}$/;
  return regex.test(phoneNumber);
}

function isNameValid(name) {
  const regex = /^[a-zA-Zа-яА-Я._ ]+$/;
  return regex.test(name);
}

function formatPhoneNumber(phoneNumber) {
  const regex = /(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})/;
  return phoneNumber.replace(regex, '$1 ($2) $3-$4-$5');
}