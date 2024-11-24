// Targetting
const buttonAddComment = document.querySelector('.js-addComment');
const userName = document.querySelector('.js-username');
const userComment = document.querySelector('.js-comment');
const commentsContainer = document.querySelector('.js-comments');

// Array
let comments = [];

// Functions

function addCommentToArray(comment) {
  comments += comment; 
}

buttonAddComment.addEventListener('click', () => {
  htmlComment = `
      <div>
        <h3>${userName.value}</h3>
        <button class="js-delete">Delete</button>
      </div>    
      <p>${userComment.value}</p>
  `;

  addCommentToArray(htmlComment);

  commentsContainer.innerHTML = comments;

  console.log(comments);
})

