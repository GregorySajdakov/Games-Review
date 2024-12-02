// Targetting
const buttonAddComment = document.querySelector('.js-addComment');
const userName = document.querySelector('.js-username');
const userComment = document.querySelector('.js-comment');
const commentsContainer = document.querySelector('.js-comments');

// Array
let comments = JSON.parse(localStorage.getItem('comments'));

if (comments === null) {
  comments = [];
}

renderExistingComments();

// Functions

function renderExistingComments() {
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
}

function checkInputs() {
  if(userName.value === '' || userComment.value === '') {
    alert('Please fill out both inputs :)');
    return false;
  } else{
    return true;
  }
}

function addDataToArray() {
  const user = userName.value;
  const comment = userComment.value;

  comments.unshift({
    user,
    comment
  });

  localStorage.setItem('comments', JSON.stringify(comments));
};

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
  if (!checkInputs()) return;

  addDataToArray();
  userName.value = '';
  userComment.value = '';
  renderComment();
})

function deleteComment() {
  const button = event.target;
  const index = button.getAttribute('data-index');

  comments.splice(index, 1);
  localStorage.setItem('comments', JSON.stringify(comments));
  renderComment();
}


