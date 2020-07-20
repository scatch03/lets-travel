{
  let articlesBlock = document.querySelector('.articles');
  let title = document.getElementById('update-title');
  let text  = document.getElementById('update-text');

  articlesBlock.addEventListener('click', async function(e) {
    if (e.target.classList.contains('btn-edit-post')){
      let id = e.target.parentNode.parentNode.querySelector('.id').value;
      let postData = await fetch('/posts/' + id)
        .then((resp) => resp.json())
        .then((data) => data);

        title.value = postData.title;
        text.value = postData.text;

        let articlesTab = document.getElementById('v-pills-articles');
        articlesTab.classList.remove('show');
        articlesTab.classList.remove('active');

        let editArticleForm = document.getElementById('v-pills-update-post');
        editArticleForm.classList.add('show');
        editArticleForm.classList.add('active');
    }
  });

  let updateForm = document.querySelector('.update-post-form');
  updateForm.addEventListener('submit', function(e) {
    e.preventDefault();
    let id = e.target.parentNode.parentNode.querySelector('.id').value;
    fetch('/posts/' + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: title.value,
        text: text.value,
        description: text.value.substring(0, text.value.indexOf('.') + 1)
      })
    })
    .then((resp) => resp.text())
    .then((data) => {
      window.history.go();
      console.log(data);
    });
  });
}
