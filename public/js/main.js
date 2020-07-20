document.addEventListener('DOMContentLoaded', async function() {
  let posts = await getPosts();
  let articles = document.querySelector('.articles');

  articles.innerHTML = '';

  posts.forEach((post) => {
    let postHTML = `
          <div class="col-4">
            <div class="card">
              <img src="${post.imageURL}" alt="${post.title}" class="card-image-top" />
              <div class="card-body">
                <h4 class="card-title">${post.title}</h4>
                <p class="card-text">${post.description}</p>
                <a href="/sight?id=${post.id}" class="btn btn-primary">Details</a>
              </div>
            </div>
          </div>`;
      articles.insertAdjacentHTML('beforeend', postHTML);
  });
});

let callMeForm = document.querySelector('.call-me-form');
callMeForm.addEventListener('submit', function(e) {
  e.preventDefault();
  let phone = document.querySelector('.call-me-phone').value;
  fetch('/callback-requests', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      phoneNumber: phone
    })
  })
  .then((resp) => resp.text())
  .then((data) => alert('We will call You back as soon as possible!'))
  .then((data) => callMeForm.reset());
});
