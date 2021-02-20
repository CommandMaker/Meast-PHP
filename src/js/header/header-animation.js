let resButton = document.querySelector('.header__res-button > input');

resButton.addEventListener('change', () => {
    let navbar = document.querySelector('nav.header__res__navbar');
    if (resButton.checked) {
        navbar.classList.add('header__res__navbar__visible');
    } else {
        navbar.classList.remove('header__res__navbar__visible');
    }
});