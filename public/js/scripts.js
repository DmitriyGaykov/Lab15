const redirectAddButton = document.querySelector('.redirect-to-add');
redirectAddButton?.addEventListener('click', onRedirectToAdd);

//const addForm = document.querySelector('.add-form');
//addForm?.addEventListener('submit', onAddSubmit);

const cancelButton = document.querySelector('.cancel');
cancelButton?.addEventListener('click', onCancel);

const updateForm = document.querySelector('.update-form');
updateForm?.addEventListener('submit', onUpdateSubmit);

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

async function onUpdateSubmit(event) {
  // Если кнопка ubmit с именем "update" то отправляем запрос на обновление
  if (event.submitter.name === 'update') {
    return;
  }
  
  updateForm.action = '/delete';
  updateForm.submit();
}
