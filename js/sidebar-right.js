const navLinks = document.querySelectorAll('.sidebar-right a');
const sections = Array.from(document.querySelectorAll('main section[id]'));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const id = entry.target.getAttribute('id');
      const link = document.querySelector(`.sidebar-right a[href="#${id}"]`);
      if (link) {
        if (entry.isIntersecting) {
          navLinks.forEach((l) => l.classList.remove('active'));
          link.classList.add('active');
        }
      }
    });
  },
  {
    root: null,
    threshold: 0.3,
  },
);
sections.forEach((section) => observer.observe(section));
