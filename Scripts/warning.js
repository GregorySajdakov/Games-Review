export function warning(warning) {
  const html = `
  <div class="warning-background">
    <div class="warning">
      <div>
        <button class="js-close">X</button>
        <p>WARNING</p>
      </div>
      <p>${warning}</p>
    </div>
  </div>
  `;

  document.body.insertAdjacentHTML('afterbegin', html);
};

export function deleteWarning(event) {
  event.target.parentElement.parentElement.parentElement.remove();
};