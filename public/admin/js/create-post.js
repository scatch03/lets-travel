let createPostForm = document.querySelector('.create-post-form');

let title = document.getElementById('create-title');
let country = document.getElementById('create-country');
let imageUrl = document.getElementById('create-image-url');
let imageFile = document.getElementById('create-image-file');
let text = document.getElementById('create-text');

createPostForm.addEventListener('submit', function(event) {
  event.preventDefault();

  let form = new FormData();
  form.append('title', title.value);
  form.append('description', text.value.substring(0, text.value.indexOf('.') + 1));
  form.append('text', text.value);
  form.append('country', country.value);
  form.append('imageUrl', imageUrl.value);
  form.append('imageFile', imageFile.files[0]);

  fetch('/posts', {
    method: 'POST',
    body: form
  })
  .then((resp) => window.history.go());
});

function exclusive(input1, input2) {
  input2.disabled = !!input1.value;
}

imageUrl.addEventListener('change', function(){ exclusive(this, imageFile)});
imageFile.addEventListener('change', function(){ exclusive(this, imageUrl)});
