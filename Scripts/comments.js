// Targetting
const buttonAddComment = document.querySelector('.js-addComment');
const userName = document.querySelector('.js-username');
const userComment = document.querySelector('.js-comment');
const commentsContainer = document.querySelector('.js-comments');

// Unique ID for each page
const reviewID = `comments-${window.location.pathname}`;

// Main Array
let comments = JSON.parse(localStorage.getItem(reviewID));

// If localStorage is empty make empty array for it
if (comments === null) {
  comments = [];
}

renderExistingComments();

// Render existing comments
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
}

// Checking inputs
function checkInputs() {
  if(userName.value === '' || userComment.value === '') {
    alert('Please fill out both inputs :)');
    return false;
  } else{
    return true;
  }
}

// Adds inputs to array
function addDataToArray() {
  const user = userName.value;
  const comment = userComment.value;

  comments.unshift({
    user,
    comment
  });

  localStorage.setItem(reviewID, JSON.stringify(comments));
};

// Renders Comments
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
};

// Button for adding comments
buttonAddComment.addEventListener('click', () => {
  if (!checkInputs()) return;

  addDataToArray();
  // Clear Inputs after adding it's value to an array
  userName.value = '';
  userComment.value = '';
  renderComment();
})

// Buttons for deleting comments
commentsContainer.addEventListener('click', (event) => {
  if(event.target.classList.contains('js-delete')) {
    const index = event.target.dataset.index;
    deleteComment(index);
  };
});

// Deleting Comments
function deleteComment(index) {
  comments.splice(index, 1);
  localStorage.setItem(reviewID, JSON.stringify(comments));
  renderComment();
};