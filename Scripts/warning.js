export function warning(warning) {
  const html = `
  <div class="warning-background">
    <div class="warning">
      <button class="js-close">X</button>
      <p>WARNING</p>
      <p>${warning}</p>
    </div>
  </div>
  `;

  document.body.insertAdjacentHTML('afterbegin', html);
};

export function deleteWarning(event) {
  event.target.parentElement.parentElement.remove();
};