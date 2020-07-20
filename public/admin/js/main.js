document.addEventListener('DOMContentLoaded', async function() {
  addPosts();
  addCallbacks();
  addEmails();
});

async function addPosts() {
  let posts = await getPosts();
  let articles = document.querySelector('.articles');

  articles.innerHTML = '';

  let i = 1;
  posts.forEach((post) => {
    let postHTML = `
      <article class="d-flex justify-content-between align-items-center">
        <div class="num w5">${i++}</div>
        <input class="id" type="hidden" value="${post.id}"/>
        <div class="name w30">${post.title}</div>
        <div class="date w30">${post.date}</div>
        <div class="country w20">${post.country}</div>
        <div class="edit w10"><button class="btn btn-link btn-edit-post">Edit</button></div>
        <div class="remove w5"><button class="btn btn-link btn-remove">X</button></div>
      </article>`;
      articles.insertAdjacentHTML('beforeend', postHTML);
  });
}

async function addCallbacks() {
  let callbackRequests = await getCallbackRequests();
  let requestBlock = document.querySelector('#v-pills-callback');

  requestBlock.innerHTML = '';

  let i = 1;
  callbackRequests.forEach((cbReq) => {
    let cbHTML = `
      <article class="d-flex justify-content-between align-items-center">
        <div class="num w5">${i++}</div>
        <input class="id" type="hidden" value="${cbReq.id}"/>
        <div class="name w60">${cbReq.phoneNumber}</div>
        <div class="date w30">${cbReq.date}</div>
        <div class="remove w5"><button class="btn btn-link btn-remove">X</button></div>
      </article>`;
      requestBlock.insertAdjacentHTML('beforeend', cbHTML);
  });
}

async function addEmails() {
  let emails = await getEmails();
  if (!emails || emails.length === 0) {
    return;
  }
  let emailsBlock = document.querySelector('#v-pills-mails');

  emailsBlock.innerHTML = '';

  let i = 1;
  emails.forEach((email) => {
    let emailHTML = `
      <article class="d-flex justify-content-between align-items-center article-inline">
        <div class="num w5">${i++}</div>
        <input class="id" type="hidden" value="${email.id}"/>
        <div class="name w30">${email.name}</div>
        <div class="email w30">${email.email}</div>
        <div class="date w30">${email.date}</div>
        <div class="remove w5"><button class="btn btn-link btn-remove">X</button></div>
        <div class="text w100">${email.message}</div>
      </article>`;
      emailsBlock.insertAdjacentHTML('beforeend', emailHTML);
  });
}

let addPostBtn = document.querySelector('.add-post-btn');
addPostBtn.addEventListener('click', function(){
  let articlesTab = document.getElementById('v-pills-articles');
  articlesTab.classList.remove('show');
  articlesTab.classList.remove('active');

  let addArticleForm = document.getElementById('v-pills-create-post');
  addArticleForm.classList.add('show');
  addArticleForm.classList.add('active');
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

let logoutBtn = document.querySelector('.log-out-btn');
logoutBtn.addEventListener('click', function() {
  document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
  window.location.href = "/";
});
