import { warning,deleteWarning } from "./warning.js";
import { getCurrentTime } from "./getTime.js";

let togglePrev = false;
function togglePreview(event) {
  const button = event.target;
  const allDOM = document.querySelectorAll('.js-preview');
  const mainContainers = document.querySelectorAll('.main-section-container');
  const allPreviews = document.querySelectorAll('.move-container');

  allPreviews.forEach(preview => {
    preview.style.display = 'flex';
  })
  
  if(togglePrev === false) {
    allDOM.forEach((DOM) => {
      DOM.style.display = 'none';
    });
    mainContainers.forEach(container => {
      container.style.borderWidth = '0px';
    })
    button.innerHTML = 'Preview On';
    togglePrev = true;
  } else {
    allDOM.forEach((DOM) => {
      DOM.style.display = 'block';
    });
    mainContainers.forEach(container => {
      container.style.borderWidth = '3px';
    })
    button.innerHTML = 'Preview Off';
    togglePrev = false;
  };
};

let isDropdown = false;
function expandCollapseDropdown(event) {
  const button = event.target;
  const html = `
    <div class="dropdown js-preview">
      <button class="add-element-header">Title/Header</button>
      <button class="add-element-description">Description</button>
      <button class=add-element-img>IMG</button>
    </div>
  `;

  if(isDropdown === false) {
    button.insertAdjacentHTML('afterend', html);
    isDropdown = true;
  } else if (isDropdown === true) {
    button.nextElementSibling.remove();
    isDropdown = false;
  } 
}

function hideOrShowinputs(event) {
  const button = event.target;
  const mainContainer = button.closest('.main-section-container');
  const inputContainer = mainContainer.querySelector('.move-container');

  const currentDisplay = getComputedStyle(inputContainer).display;

  if(currentDisplay === 'flex'){
    inputContainer.style.display = 'none';
  } else {
    inputContainer.style.display = 'flex';
  }
}

function loadIMG(event) {
  const image = event.target.files[0];
  const preview = event.target.nextElementSibling;

  if(!image.type.startsWith('image/')) {
    warning('Please select valid file');
    return;
  }

  const reader = new FileReader();

  reader.onload = function(fileEvent) {
    preview.src = fileEvent.target.result;
    preview.style.width = '65%';
  }

  reader.readAsDataURL(image);
}

function addElementHeader(event) {
  const html = `
  <div class="main-section-container">
    <div class="up-down-container">
      <button class="move-up js-preview">&#x25B2</button>
      <button class="move-down js-preview">&#x25BC</button>
    </div>
    <button class="add-title js-preview">Hide/Show Title/Header</button>
    <div class="title-container move-container">
      <p class="js-preview">Type in your game title</p>
      <input class="title-input js-preview" type="text" placeholder="Game Title or Header">
      <h1 class="title-preview"></h1>
      <button class="delete-element js-preview">Delete This Element</button>
    </div>
  </div>
  `

  const container = event.target.parentElement.parentElement;

  container.insertAdjacentHTML('beforebegin', html);

  if(isDropdown === true) {
    const mainButton = event.target.parentElement;
    mainButton.remove();
    isDropdown = false
  }
}

function addElementDescription(event) {
  const html = `
  <div class="main-section-container">
    <div class="up-down-container">
      <button class="move-up js-preview">&#x25B2</button>
      <button class="move-down js-preview">&#x25BC</button>
    </div>
    <button class="add-description js-preview">Hide/Show Description</button>
    <div class="description-container move-container">
      <p class="js-preview">Give short opinion about the game</p>
      <textarea class="description-input js-preview" rows="5" placeholder="Usually something to describe game in few words" name="" id=""></textarea>
      <p class="description-preview"></p>
      <button class="delete-element js-preview">Delete this element</button>
    </div>
  </div>
  `

  const container = event.target.parentElement.parentElement;

  container.insertAdjacentHTML('beforebegin', html);

  if(isDropdown === true) {
    const mainButton = event.target.parentElement;
    mainButton.remove();
    isDropdown = false
  }
}

function addElementIMG(event) {
  const html = `
    <div class="main-section-container">
      <div class="up-down-container">
        <button class="move-up js-preview">&#x25B2</button>
        <button class="move-down js-preview">&#x25BC</button>
      </div>
        <button class="add-img js-preview">Hide/Show Image</button>
        <div class="img-container move-container">
        <p class="js-preview">Choose first picture to upload to your review</p>
        <input class="img-input js-preview" type="file" accept="image/*">
        <img class="img-preview">
        <button class="delete-element js-preview">Delete this element</button>
      </div>
    </div>
  `

  const container = event.target.parentElement.parentElement;

  container.insertAdjacentHTML('beforebegin', html);

  if(isDropdown === true) {
    const mainButton = event.target.parentElement;
    mainButton.remove();
    isDropdown = false
  }
}

function deleteElement(event) {
  const button = event.target;
  const mainContainer = button.closest('.main-section-container')

  mainContainer.remove();
}

function moveElementUp(event) {
 const button = event.target;
 const mainContainer = button.closest('.main-section-container')
 const containerAbove = mainContainer.previousElementSibling;

 if(containerAbove) {
  containerAbove.parentNode.insertBefore(mainContainer, containerAbove);
 } else {
  warning('This element is already at the top');
 }
}

function moveElementDown(event) {
  const button = event.target;
  const mainContainer = button.closest('.main-section-container');
  const containerBelow = mainContainer.nextElementSibling; 

  if(containerBelow.classList.contains('main-section-container')) {
    containerBelow.parentNode.insertBefore(mainContainer, containerBelow.nextElementSibling);
  } else {
    warning('This element is already at the bottom');
  };
};

document.addEventListener('change', (event) => {
  if(event.target.classList.contains('img-input')) {
    loadIMG(event);
  }
});

document.addEventListener('keyup', (event) => {
  if(event.target.classList.contains('title-input')) {
    const input = event.target;
    input.nextElementSibling.innerHTML = input.value;
  }

  if(event.target.classList.contains('description-input')) {
    const textarea = event.target;
    textarea.nextElementSibling.innerHTML = textarea.value;
  }
})


document.addEventListener('click', (event) => {
  if(event.target.classList.contains('js-close')) {
    deleteWarning(event);
  };

  if(event.target.classList.contains('preview-toggle')) {
    togglePreview(event);
  };

  if(event.target.classList.contains('add-title')) {
    hideOrShowinputs(event);
  }

  if(event.target.classList.contains('add-description')) {
    hideOrShowinputs(event);
  }

  if(event.target.classList.contains('add-img')) {
    hideOrShowinputs(event);
  }

  if(event.target.classList.contains('add-type-of')) {
    expandCollapseDropdown(event);
  }

  if(event.target.classList.contains('add-element-header')) {
    addElementHeader(event);
  }

  if(event.target.classList.contains('add-element-description')) {
    addElementDescription(event);
  }

  if(event.target.classList.contains('add-element-img')) {
    addElementIMG(event);
  }

  if(event.target.classList.contains('delete-element')) {
    deleteElement(event);
  }

  if(event.target.classList.contains('move-up')) {
    moveElementUp(event);
  }

  if(event.target.classList.contains('move-down')) {
    moveElementDown(event);
  }
});