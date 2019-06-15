/**
* Execute a function given a delay time
* https://ourcodeworld.com/articles/read/16/what-is-the-debounce-method-and-how-to-use-it-in-javascript
*/
var debounce = function (func, wait, immediate) {
     var timeout;
     return function() {
         var context = this, args = arguments;
         var later = function() {
                 timeout = null;
                 if (!immediate) func.apply(context, args);
         };
         var callNow = immediate && !timeout;
         clearTimeout(timeout);
         timeout = setTimeout(later, wait);
         if (callNow) func.apply(context, args);
     };
};

function fixCards() {
  console.log("fix cards");
  var min_width_640 = window.matchMedia("(min-width: 640px)");
  var min_width_960 = window.matchMedia("(min-width: 960px)");

  var cards = document.getElementsByClassName("card");
  var cols = 1, widthPercentage = 100;

  if(min_width_640.matches == true) {
    widthPercentage = 50;
    cols = 2;
  }

  if(min_width_960.matches == true) {
    widthPercentage = 33.3333333333;
    cols = 3;
  }

  for(var i = 0; i < cards.length; i++) {
    var cardLeft = (i % cols) * widthPercentage;  // In percentage
    var cardTop = 0;  // in pixel

    // if card is in second row or higher
    if(i >= cols) {
      cardTop = parseFloat(cards[i - cols].style.top) +
      cards[i - cols].offsetHeight +
      ((cols == 1) ? 20 : 0);  // margin-bottom if cols == 1
    }

    cards[i].style.top = cardTop + "px";
    cards[i].style.left = cardLeft + "%";
  }

  var cardContainer = document.getElementById("card-container");
  // Index of first element of last row.
  var idx = cards.length - ((cards.length % cols) || cols);
  var cardContHeight = 0;

  // Find the column that has maximum height.
  for(var i = idx; i < cards.length; i++) {
    cardContHeight = Math.max(
      cardContHeight,
      parseFloat(cards[i].style.top) + cards[i].offsetHeight
    );
  }

  var padding_bottom = 30;
  cardContainer.style.height = (cardContHeight + padding_bottom) + "px";

  // Remove border of last card
  cards[cards.length - 1].style.border = "none";
}

// In order to prevent content jumping, change opacity to 0.
document.body.style.opacity = "0";

window.addEventListener('load', function() {
  // Fix cards when page is loaded
  fixCards();

  // Page is loaded, change opacity to 1.
  document.body.style.opacity = "1";
});

// Fix cards when page resized add 100ms timeout for efficiency
window.onresize = debounce(fixCards, 100);

// Scroll page to top when refreshed.
window.onbeforeunload = function(){ window.scrollTo(0,0); }
