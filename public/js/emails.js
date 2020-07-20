let emailForm = document.querySelector('.email-request-form')

emailForm.addEventListener('submit', function(e){
  e.preventDefault();
  fetch('/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: document.getElementById('nameInput').value,
      email: document.getElementById('emailInput').value,
      message: document.getElementById('messageInput').value
    })
  })
  .then((resp) => resp.text())
  .then((data) => console.log(data));
});
