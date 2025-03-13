export default function initHeader() {
  const btn_mobile = document.getElementById('mobile_btn');
  const menu = document.querySelector('#mobile_btn');

  function handleClick() {
    const mobile_menu = document.getElementById('mobile_menu');
    mobile_menu.classList.toggle('active');
    menu.classList.toggle('active');
  }

  btn_mobile.addEventListener('click', handleClick);
}
