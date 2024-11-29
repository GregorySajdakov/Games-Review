// Targetting
const buttonAddComment = document.querySelector('.js-addComment');
const userName = document.querySelector('.js-username');
const userComment = document.querySelector('.js-comment');
const commentsContainer = document.querySelector('.js-comments');

// Array
let comments = [];

// Functions

function addDataToArray() {
  const user = userName.value;
  const comment = userComment.value;

  comments.unshift({
    user,
    comment
  })
}

function renderComment() {
  commentsContainer.innerHTML = '';

  comments.forEach((comment, index) => {
    const html = `
    <div>
      <h3>${comment.user}</h3>
      <button data-index="${index}" class="js-delete">Delete</button>
    </div>    
    <p>${comment.comment}</p>
    `;

    commentsContainer.innerHTML += html;
  });

  document.querySelectorAll('.js-delete').forEach(button => {
    button.addEventListener('click', deleteComment);
  });
};

buttonAddComment.addEventListener('click', () => {
  addDataToArray();
  renderComment();

  console.log(comments);
})

function deleteComment() {
  const button = event.target
  const index = button.getAttribute('data-index');

  comments.splice(index, 1);
  renderComment();

  console.log(comments);
}


