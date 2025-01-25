import { warning, deleteWarning } from "./warning.js";
import { getCurrentTime } from "./getTime.js";


// Targetting
const buttonAddComment = document.querySelector('.js-add-comment');
const userName = document.querySelector('.js-username');
const userComment = document.querySelector('.js-comment');
const commentsContainer = document.querySelector('.js-comments');

// Unique ID for each page
const commentID = `comments-${window.location.pathname}`;
const responseID = `response-${window.location.pathname}`

// Arrays
let comments = JSON.parse(localStorage.getItem(commentID)) || [];
let responses = JSON.parse(localStorage.getItem(responseID)) || []; 

renderComments();
renderExistingReponses();
checkButton();

function addCommentToArray() {

  const user = userName.value.trim();
  const comment = userComment.value;
  const date = getCurrentTime();

  if(!user || !comment) {
    warning('Please fill both inputs');
    return false;
  }else if(user.length > 20) {
    warning('Max user length is 20 characters');
    return false;
  };

  comments.push({
    user,
    comment,
    date
  });

  localStorage.setItem(commentID, JSON.stringify(comments));

  return true;
};

function renderComments() {
  commentsContainer.innerHTML = '';
  
  comments.forEach((comment, index) => {
    const html = `
      <div data-index="${index}" data-response="${index}" class="comment">
        <div>
          <h3>${comment.user}</h3>
          <button class="js-delete">Delete</button>
          <button class="js-edit">Edit</button>
        </div>    
        <p>${comment.comment}</p>
        <p class="current-date">${comment.date}</p>
        <button class="answer">Answer</button>
      </div>
    `;

    commentsContainer.insertAdjacentHTML('beforeend', html);
  });
};

function deleteComment(index) {
  comments.splice(index, 1);
  responses = responses.filter(response => response.commentIndex !== index);

  responses = responses.map(response => {
    if(response.commentIndex > index) {
      response.commentIndex = String(response.commentIndex - 1);
    };
    return response;
  });
  
  localStorage.setItem(commentID, JSON.stringify(comments));
  localStorage.setItem(responseID,JSON.stringify(responses));
  renderComments();
};

function addRespondToArray(event) {
  const input = document.querySelector('.js-username-response').value.trim();
  const textarea = document.querySelector('.js-comment-response').value;
  const commentIndex = event.target.parentElement.parentElement.getAttribute('data-index');
  const date = getCurrentTime();

  if(!input || !textarea) {
    warning('Fill out both inputs :)');
    return false;
  } else if(input.length > 20) {
    warning('Max user length is 20 characters');
    return false;
  };
  
  responses.push({
    input,
    textarea,
    date,
    commentIndex
  });

  localStorage.setItem(responseID,JSON.stringify(responses));

  return true;
};

function renderResponses(event) {
  const targettedComment = event.target.parentElement.parentElement;
  const indexOfTargettedComment = targettedComment.getAttribute('data-index');
  const newArray = responses.filter(response => response.commentIndex === indexOfTargettedComment);

  targettedComment.querySelectorAll('.comment-response-container').forEach(element => {
    element.remove();
  });

  newArray.forEach((response) => {
    const originalIndex = responses.findIndex(ogRespon => ogRespon.input === response.input 
      && ogRespon.textarea === response.textarea);
    
    const html = `
    <div data-index="${originalIndex}" class="comment-response-container">
      <div>
        <h3>${response.input}</h3>
        <button class="js-delete-response">Delete</button>
        <button class="js-edit">Edit</button>
      </div>
      <p>${response.textarea}</p>
      <p class="current-date">${response.date}</p>
    </div>
    `;
    targettedComment.insertAdjacentHTML('beforeend', html);
  });

    const inputEl = document.querySelector('.js-username-response');
    const textareaEl = document.querySelector('.js-comment-response');
    const buttonEl = document.querySelector('.js-respond');
    const buttonElDel = document.querySelector('.js-delete-inputs');
    const parentDiv = buttonEl.parentElement; 
    

    if(!inputEl.value || !textareaEl.value) {
      return;
    } else {
    if(inputEl) inputEl.remove(); 
    if(textareaEl) textareaEl.remove();
    if(buttonEl) buttonEl.remove();
    if(buttonElDel) buttonElDel.remove();
    if(parentDiv) parentDiv.remove();
    };

    targettedComment.querySelector('.answer').style.display = 'block';
};

function renderExistingReponses() {
  document.querySelectorAll('.comment').forEach((comment) => {
    comment.querySelectorAll('.comment-response-container').forEach((element) => {
      element.remove();
    });
  });

  responses.forEach((response, index) => {
    const comment = document.querySelector(`.comment[data-index="${response.commentIndex}"]`);

    if(comment) {
      const html = `
      <div data-index="${index}" class="comment-response-container">
        <div>
          <h3>${response.input}</h3>
          <button class="js-delete-response">Delete</button>
          <button class="js-edit">Edit</button>
        </div>
        <p>${response.textarea}</p>
        <p>${response.date}</p>
      </div>
      `;
      comment.insertAdjacentHTML('beforeend', html);
    };
  })
};

function deleteResponse(event) {
  const indexComment = event.target.parentElement.parentElement.getAttribute('data-index');

  responses.splice(indexComment, 1);
  localStorage.setItem(responseID, JSON.stringify(responses));
};

function deleteResponseInputs(event) {
  const buttonElDel = event.target;
  const parentDiv = buttonElDel.parentElement.parentElement;
  const inputEl = parentDiv.querySelector('.js-username-response');
  const textareaEl = parentDiv.querySelector('.js-comment-response');
  const buttonEl = parentDiv.querySelector('.js-respond');

  parentDiv.querySelector('.answer').style.display = 'block';

  if(buttonElDel) buttonElDel.remove();
  if(inputEl) inputEl.remove();
  if(textareaEl) textareaEl.remove();
  if(buttonEl) buttonEl.remove();
};

let isEditOn = false;
function editCommentOrResponse(event) {
  if(isEditOn) {
    warning('Fill or cancel already existing edit');
    return;
  };

  const existingInputEdit = commentsContainer.querySelector('input');
  const existingTextareaEdit = commentsContainer.querySelector('textarea');

  if(existingInputEdit || existingTextareaEdit) {
    warning('Please complete or cancel existing inputs');
    return
  }

  const container = event.target.parentElement.parentElement;

  const defaultUser = container.querySelector('h3');
  const defaultCommentOrResponse = container.querySelector('p');

  const deleteBtn = container.querySelector('.js-delete, .js-delete-response');
  const editBtn = event.target;

  const originalUser = defaultUser.textContent;
  const originalText = defaultCommentOrResponse.textContent;

  container.setAttribute('data-originalUser', originalUser);
  container.setAttribute('data-originalText', originalText);
  
  const acceptBtn = document.createElement('button');
  acceptBtn.innerHTML = 'Accept';
  acceptBtn.classList = 'js-accept';

  deleteBtn.innerHTML = 'Cancel';
  deleteBtn.classList = 'js-cancel';

  const input = document.createElement('input');
  input.value = defaultUser.textContent;

  const textarea = document.createElement('textarea');
  textarea.value = defaultCommentOrResponse.textContent;
  textarea.rows = 4;
  
  editBtn.replaceWith(acceptBtn);
  defaultUser.replaceWith(input);
  defaultCommentOrResponse.replaceWith(textarea);

  isEditOn = true;
};

function cancelEdit(event) {
  const container = event.target.parentElement.parentElement;
  const input = container.querySelector('input');
  const textarea = container.querySelector('textarea');
  const acceptBtn = container.querySelector('.js-accept');
  const cancelBtn = container.querySelector('.js-cancel');

  if(container.querySelector('.answer')) {
    const answerBtn = container.querySelector('.answer');
    answerBtn.style.display = 'block';
  };

  if(container.classList.contains('comment-response-container')) {
    cancelBtn.classList = 'js-delete-response';
    cancelBtn.innerHTML = 'Delete';
  } else {
    cancelBtn.classList = 'js-delete';
    cancelBtn.innerHTML = 'Delete';
  };
  
  const h3 = document.createElement('h3');
  const p = document.createElement('p');

  h3.innerHTML = container.getAttribute('data-originalUser');
  p.innerHTML = container.getAttribute('data-originalText');
  acceptBtn.classList = 'js-edit';
  acceptBtn.innerHTML = 'Edit';

  input.replaceWith(h3);
  textarea.replaceWith(p);

  container.removeAttribute('data-originalUser');
  container.removeAttribute('data-originalText');

  isEditOn = false;
};

function acceptEdit(event) {
  const container = event.target.parentElement.parentElement;
  const acceptBtn = event.target;
  const input = container.querySelector('input');
  const textarea = container.querySelector('textarea');
  const index = container.getAttribute('data-index');
  const cancelBtn = container.querySelector('.js-cancel');
  const currentDate = container.querySelector('.current-date');

  if(input.value.length > 20) {
    warning('Max user length is 20 characters');
    return;
  } else if(input.value === '' || textarea.value === '') {
    warning('Both fields must be complete');
    return;
  }

  if(container.querySelector('.answer')) {
    const answerBtn = container.querySelector('.answer');
    answerBtn.style.display = 'block';
  };

  if(container.classList.contains('comment')) {
    comments[index].user = input.value;
    comments[index].comment = textarea.value;

    input.outerHTML = `<h3>${input.value}</h3>`;
    textarea.outerHTML = `<p>${textarea.value}</p>`;

    acceptBtn.innerHTML = 'Edit';
    acceptBtn.classList = 'js-edit';

    localStorage.setItem(commentID, JSON.stringify(comments));
  };

  if(container.classList.contains('comment-response-container')) {
    responses[index].input = input.value;
    responses[index].textarea = textarea.value;

    input.outerHTML = `<h3>${input.value}</h3>`;
    textarea.outerHTML = `<p>${textarea.value}</p>`;

    acceptBtn.innerHTML = 'Edit';
    acceptBtn.classList = 'js-edit';
    
    localStorage.setItem(responseID, JSON.stringify(responses));
  };

  if(container.classList.contains('comment-response-container')) {
    cancelBtn.classList = 'js-delete-response';
    cancelBtn.innerHTML = 'Delete';
  } else {
    cancelBtn.classList = 'js-delete';
    cancelBtn.innerHTML = 'Delete';
  };
  
  isEditOn = false;
};

function checkButton() {  // If there is more than 1 response, move button
  commentsContainer.querySelectorAll('.comment').forEach(comment => {
    const response = comment.querySelectorAll('.comment-response-container');
    const button = comment.querySelector('.answer');

    if(button.style.display = 'none') {
      button.style.display = 'block';
    }

    if(response.length >= 1) {
      button.style.marginTop = '2em';
      button.innerHTML = 'Continue Thread';
      comment.appendChild(button);
    } else if(response.length < 1) {
    button.style.marginTop = '0';
    button.innerHTML = 'Answer';
    };

  });
};

buttonAddComment.addEventListener('click', () => {
    if(!addCommentToArray()) {
      return;
    };
    userName.value = '';
    userComment.value = '';
    renderComments();
    renderExistingReponses();

    checkButton();
});

commentsContainer.addEventListener('click', event => {
  if(event.target.classList.contains('js-delete')) {
    const index = event.target.closest('.comment').dataset.index;
    deleteComment(index);
    renderComments();
    renderExistingReponses();
    checkButton();

    isEditOn = false;
  };

  if(event.target.classList.contains('answer')) {
    const existingInput = document.querySelector('.js-username-response');
    const existingTextarea = document.querySelector('.js-comment-response');
    const existingButton = document.querySelector('.js-answer');

    if(existingInput || existingTextarea || existingButton) {
      warning('Please complete or cancel existing inputs');
      return;
    };

    const existingInputEdit = commentsContainer.querySelector('input');
    const existingTextareaEdit = commentsContainer.querySelector('textarea');

    if(existingInputEdit || existingTextareaEdit) {
      warning('Please complete or cancel existing inputs');
      return;
    }
    
    const button = event.target;
    const html = `
    <input type="text" placeholder="Your username" class="js-username-response">
    <textarea rows="3" name="Comment" id="Comment-area" placeholder="Write your answer..." class="js-comment-response"></textarea>
    <div>
    <button class="js-respond">Respond</button>
    <button class="js-delete-inputs">Cancel</button>
    </div>
    `

    button.insertAdjacentHTML('afterend', html );

    button.style.display = 'none';
  };
  
  if(event.target.classList.contains('js-respond')) {
    if(!addRespondToArray(event)) {
      return;
    };
    renderResponses(event);
    checkButton();
  };

  if(event.target.classList.contains('js-delete-inputs')) {
    deleteResponseInputs(event);
  };

  if(event.target.classList.contains('js-delete-response')) {
    deleteResponse(event);
    renderExistingReponses();
    checkButton();

    event.target.parentElement.parentElement.querySelector('input')?.remove();
    event.target.parentElement.parentElement.querySelector('textarea')?.remove();
    event.target.parentElement.parentElement.querySelector('.js-respond')?.remove();
    event.target.parentElement.parentElement.querySelector('.js-delete-inputs')?.remove();

    isEditOn = false;
  };

  if(event.target.classList.contains('js-edit')) {
    editCommentOrResponse(event);
  };

  if(event.target.classList.contains('js-cancel')) {
    cancelEdit(event);
    checkButton();
  };

  if(event.target.classList.contains('js-accept')) {
    acceptEdit(event);
    checkButton();
  }
});

document.querySelector('body').addEventListener('click', event => {
  if(event.target.classList.contains('js-close')) {
    deleteWarning(event);
  };
});

                  // localStorage.clear();