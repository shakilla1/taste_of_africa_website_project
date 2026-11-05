const themeButton = document.getElementById('theme-toggle');

function updateThemeLabel() {
  themeButton.textContent = document.body.classList.contains('dark') ? 'Light mode' : 'Dark mode';
}

if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark');
}
updateThemeLabel();

themeButton.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
  updateThemeLabel();
});

const filterButtons = document.querySelectorAll('.filter-btn');
const recipeCards = document.querySelectorAll('.recipe-card');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const region = button.dataset.region;
    filterButtons.forEach(b => b.classList.remove('active'));
    button.classList.add('active');
    recipeCards.forEach(card => {
      const show = region === 'all' || card.dataset.region === region;
      card.classList.toggle('hidden', !show);
    });
  });
});

const favoriteButtons = document.querySelectorAll('.fav');
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

favoriteButtons.forEach(button => {
  const id = button.dataset.id;
  if (favorites.includes(id)) {
    button.classList.add('active');
  }
  button.addEventListener('click', () => {
    if (favorites.includes(id)) {
      favorites = favorites.filter(item => item !== id);
    } else {
      favorites.push(id);
    }
    button.classList.toggle('active');
    localStorage.setItem('favorites', JSON.stringify(favorites));
  });
});

const servingsInput = document.getElementById('servings');

if (servingsInput) {
  const amounts = document.querySelectorAll('.amount');
  servingsInput.addEventListener('input', () => {
    const factor = servingsInput.value / servingsInput.dataset.base;
    if (!factor || factor < 0) return;
    amounts.forEach(span => {
      const scaled = span.dataset.base * factor;
      span.textContent = Math.round(scaled * 100) / 100;
    });
  });
}


const contactForm = document.getElementById('contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', event => {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const messageError = document.getElementById('message-error');

    nameError.textContent = name ? '' : 'Please enter your name.';
    emailError.textContent = emailPattern.test(email) ? '' : 'Please enter a valid email, like name@example.com.';
    messageError.textContent = message.length > 20 ? '' : 'Your message needs to be more than 20 characters.';

    if (nameError.textContent || emailError.textContent || messageError.textContent) {
      return;
    }

    contactForm.classList.add('hidden');
    const confirmation = document.getElementById('confirmation');
    confirmation.textContent = `Thank you, ${name}! We've received your message.`;
    confirmation.classList.remove('hidden');
  });
}

const newsletterForm = document.getElementById('newsletter-form');

newsletterForm.addEventListener('submit', event => {
  event.preventDefault();
  newsletterForm.innerHTML = '<p>Thanks for subscribing.</p>';
});
