export default function initScrollSuave() {
  const scrolls = document.querySelectorAll(
    '[data-scroll="suave"] a[href^="#"]',
  );

  function scrollSection(event) {
    event.preventDefault();
    const href = event.currentTarget.getAttribute('href');
    const section = document.querySelector(href);
    section.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }

  scrolls.forEach(scroll => {
    scroll.addEventListener('click', scrollSection);
  });
}
