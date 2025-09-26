// JS dropdown animáció
const menu = document.getElementById('menu');
const dropdown = document.getElementById('dropdown');
let timeout;

menu.removeEventListener('mouseover', () => {});
menu.removeEventListener('mouseleave', () => {});
dropdown.removeEventListener('mouseover', () => {});
dropdown.removeEventListener('mouseleave', () => {});

const mainContent = document.querySelector('main');

document.addEventListener('click', (event) => {
    const isMenuClick = menu.contains(event.target) || dropdown.contains(event.target);
    if (!isMenuClick) {
        dropdown.classList.remove('show'); 
        menu.classList.remove('active'); 
        mainContent.classList.remove('blurred'); 
        mainContent.style.paddingTop = '60px'; 
    }
});

menu.addEventListener('click', () => {
    const isActive = menu.classList.contains('active');
    const dropdownHeight = dropdown.offsetHeight; 
    const dropdownLinks = dropdown.querySelectorAll('a');

    if (isActive) {
        dropdown.classList.remove('show'); 
        menu.classList.remove('active'); 
        mainContent.classList.remove('blurred'); 
        mainContent.style.paddingTop = '60px';
        dropdownLinks.forEach(link => link.setAttribute('tabindex', '-1'));
    } else {
        dropdown.classList.add('show'); 
        menu.classList.add('active'); 
        mainContent.classList.add('blurred'); 
        mainContent.style.paddingTop = `${60 + dropdownHeight}px`; 
        dropdownLinks.forEach(link => link.removeAttribute('tabindex'));
    }
});

const dropdownLinks = dropdown.querySelectorAll('a');
dropdownLinks.forEach(link => link.setAttribute('tabindex', '-1'));

/*<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/
/*<<<<<<<<<<<<<<<<<<<kepnezegeto<<<<<<<<<<<<<<<<<<<<<<*/
/*<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/

function tdnn() {
    const body = document.body;
    const hold = document.getElementsByClassName("hold")[0];
    const tdnn = document.getElementsByClassName("tdnn")[0];
    const headerH1 = document.querySelector("header h1");
    const activeLink = document.querySelector(".dropdown a.active");
    const menuButton = document.querySelector(".menu");

    hold.classList.toggle("napocska");
    tdnn.classList.toggle("nap");

    body.classList.toggle("light");
    body.classList.toggle("dark", !body.classList.contains("light"));
}

/*<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/
/*<<<<<<<<<<<<<<<<<<<kepnezegeto<<<<<<<<<<<<<<<<<<<<<<*/
/*<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/
let slideIndex = 1; 
let slideTimer;

function plusSlides(n) {
  clearTimeout(slideTimer); 
  showSlide(slideIndex += n);
}

function currentSlide(n) {
  clearTimeout(slideTimer); 
  showSlide(slideIndex = n);
}

function showSlide(n) {
  let i;
  const slides = document.getElementsByClassName("ppt-dia");
  if (n > slides.length) { slideIndex = 1; }
  if (n < 1) { slideIndex = slides.length; }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideIndex - 1].style.display = "block";
  slideTimer = setTimeout(() => plusSlides(1), 5000);
}
showSlide(slideIndex);


/*<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/
/*<<<<<<<<<<<<<<<<<<<back to top<<<<<<<<<<<<<<<<<<<<<<*/
/*<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/

let gomb = document.getElementById("felGomb");
window.onscroll = function() {scrollFunction()};
function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    gomb.style.display = "block";
  } else {
    gomb.style.display = "none";
  }
}

gomb.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth" 
  });
});



