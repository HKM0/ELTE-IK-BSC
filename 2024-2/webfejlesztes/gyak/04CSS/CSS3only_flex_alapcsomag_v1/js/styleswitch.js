// Cross browser addEvent function by John Resig
// http://ejohn.org/blog/flexible-javascript-events/
// https://codepen.io/SitePoint/pen/GpzrPG

function addEvent(obj, type, fn) {
  if (obj.attachEvent) {
    obj['e' + type + fn] = fn;
    obj[type + fn] = function () {
      obj['e' + type + fn](window.event);
    };
    obj.attachEvent('on' + type, obj[type + fn]);
  } else obj.addEventListener(type, fn, false);
}

// Cookie beállítása (név, érték, napok)
function setCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + value + "; path=/" + expires;
}

// Cookie lekérése
function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

function switchStyles() {
  var selectedOption = this.options[this.selectedIndex];
  var className = selectedOption.value;

  // Stílus beállítása a body-ra
  document.body.className = className;

  // Cookie mentése 30 napra
  setCookie("selectedStyle", className, 30);
}

// Az oldal betöltésekor visszaállítja az elmentett stílust
window.onload = function () {
  var savedStyle = getCookie("selectedStyle");
  if (savedStyle) {
    document.body.className = savedStyle;
    
    // Ha van styleSwitcher elem, állítsuk be a kiválasztott értéket
    var styleSwitcher = document.getElementById("styleSwitcher");
    if (styleSwitcher) {
      for (var i = 0; i < styleSwitcher.options.length; i++) {
        if (styleSwitcher.options[i].value === savedStyle) {
          styleSwitcher.selectedIndex = i;
          break;
        }
      }
    }
  }
};

// Eseménykezelő hozzáadása
var styleSwitcher = document.getElementById("styleSwitcher");
if (styleSwitcher) {
  addEvent(styleSwitcher, "change", switchStyles);
}
