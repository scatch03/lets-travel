async function getPosts() {
  return await fetch('/posts')
                  .then(resp => resp.json())
                  .then((data) => data);
}
