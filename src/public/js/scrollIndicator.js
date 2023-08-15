const handleScroll = () => {
  const winScroll =
    document.body.scrollTop || document.documentElement.scrollTop;
  const height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  document.getElementById('myBar').style.width = scrolled + '%';
};

function updateUrlFragment(sectionId) {
  if (history.replaceState) {
    history.replaceState(null, null, `#${sectionId}`);
  } else {
    window.location.hash = sectionId;
  }
}

function getCurrentSection() {
  const sections = document.querySelectorAll('section');
  let currentSection = null;

  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    if (
      rect.top <= window.innerHeight / 2 &&
      rect.bottom >= window.innerHeight / 2
    ) {
      currentSection = section.id;
    }
  });

  return currentSection;
}

function handleScrollIndicator() {
  const currentSection = getCurrentSection();
  if (currentSection) {
    updateUrlFragment(currentSection);
  }
}

window.onscroll = () => {
  handleScroll();
  handleScrollIndicator();
};
