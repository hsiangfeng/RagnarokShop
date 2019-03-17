const loginLogoId = document.getElementById('login-logo');
function getPosition(event) {
  loginLogoId.style.left = `${event.clientX}px`;
  loginLogoId.style.top = `${event.clientY}px`;
}
function positionOver(event) {
  loginLogoId.style.left = `${event.clientX}px`;
  loginLogoId.style.top = `${event.clientY}px`;
}
loginLogoId.addEventListener('drag', getPosition, false);
loginLogoId.addEventListener('dragend', positionOver, false);
