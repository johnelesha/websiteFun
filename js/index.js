// Start Search
var searchForm = document.getElementById("searchForm");
var searchInput = document.getElementById("seaicon2");
var searchIcon = document.getElementById("searchIcon");

function searchAbout(query) {
  var found = false;

  var xhr = new XMLHttpRequest();
  xhr.open("GET", "js/database.json", true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      try {
        var data = JSON.parse(xhr.responseText);

        var sections = ["games", "movies", "sports"];
        sections.forEach((section) => {
          if (data[section]) {
            var result = data[section].find((item) =>
              item.name.toLowerCase().includes(query.toLowerCase())
            );

            if (result && !found) {
              found = true;
              location.href = result.url;
            }
          }
        });

        if (!found) {
          alert("No results found for your search.");
        }
      } catch (error) {
        console.error("Error parsing JSON from database.json:", error);
      }
    }
  };
  xhr.send();
}

function searchLook(event) {
  event.preventDefault();
  var query = searchInput.value.trim();

  if (!query) {
    alert("Please enter a valid search name.");
    return;
  }

  searchAbout(query);
}

searchForm.addEventListener("submit", searchLook);
searchIcon.addEventListener("click", searchLook);

// End Search

// Landing page
var quotesForFun = [
  "Almost everything will work again if you unplug it for a few minutes, including you. (Anne Lamott)",
  "Don’t forget to have fun. It’s not all about being productive, it’s about being alive.",
  "Sometimes the most productive thing you can do is relax. (Mark Black)",
  "A little nonsense now and then is cherished by the wisest men. (Roald Dahl)",
  "It’s not just about the work; it’s about the laughter and the breaks in between.",
  "Fun is not a luxury; it’s a necessity for a full life.",
  "Rest is not idleness, and to lie sometimes on the grass under the trees is by no means a waste of time. (John Lubbock)",
  "Life is meant to be enjoyed, not just endured.",
  "Happiness is a day filled with laughter, a little rest, and moments that make your heart smile.",
  "Take a break; you deserve it. The world will wait.",
  "Play is the highest form of research. (Albert Einstein)",
  "There is virtue in work and there is virtue in rest. Use both and overlook neither. (Alan Cohen)",
  "Sometimes you just need to disconnect, relax, and let yourself breathe.",
  "Work hard, play harder. Balance is the key to joy.",
  "Laughter and rest are the vitamins for your soul.",
];

function showRandomQuote() {
  var randomIndex = Math.floor(Math.random() * quotesForFun.length);
  var tipOfTheDay = quotesForFun[randomIndex];
  document.getElementById("quoteFun").innerText = tipOfTheDay;
}

window.onload = showRandomQuote;

// carousel for movies
var gap = 16;

var carousel1 = document.getElementById("carouselMovies"),
  content = document.getElementById("contentMovies"),
  next1 = document.getElementById("next1"),
  prev1 = document.getElementById("prev1");

next1.addEventListener("click", (e) => {
  if (carousel1.scrollLeft + carousel1.offsetWidth >= content.scrollWidth) {
    carousel1.scrollTo(0, 0);
  } else {
    carousel1.scrollBy(width1 + gap, 0);
  }
});

prev1.addEventListener("click", (e) => {
  if (carousel1.scrollLeft <= 0) {
    carousel1.scrollTo(content.scrollWidth, 0);
  } else {
    carousel1.scrollBy(-(width1 + gap), 0);
  }
});

var width1 = carousel1.offsetWidth;
window.addEventListener("resize", (e) => (width1 = carousel1.offsetWidth));

// carousel for sports
class DraggingEvent {
  constructor(target = undefined) {
    this.target = target;
  }

  event(callback) {
    var handler;

    this.target.addEventListener("mousedown", (e) => {
      e.preventDefault();

      handler = callback(e);

      window.addEventListener("mousemove", handler);

      document.addEventListener("mouseleave", clearDraggingEvent);

      window.addEventListener("mouseup", clearDraggingEvent);

      function clearDraggingEvent() {
        window.removeEventListener("mousemove", handler);
        window.removeEventListener("mouseup", clearDraggingEvent);

        document.removeEventListener("mouseleave", clearDraggingEvent);

        handler(null);
      }
    });

    this.target.addEventListener("touchstart", (e) => {
      handler = callback(e);

      window.addEventListener("touchmove", handler);

      window.addEventListener("touchend", clearDraggingEvent);

      document.body.addEventListener("mouseleave", clearDraggingEvent);

      function clearDraggingEvent() {
        window.removeEventListener("touchmove", handler);
        window.removeEventListener("touchend", clearDraggingEvent);

        handler(null);
      }
    });
  }

  getDistance(callback) {
    function distanceInit(e1) {
      var startingX, startingY;

      if ("touches" in e1) {
        startingX = e1.touches[0].clientX;
        startingY = e1.touches[0].clientY;
      } else {
        startingX = e1.clientX;
        startingY = e1.clientY;
      }

      return function (e2) {
        if (e2 === null) {
          return callback(null);
        } else {
          if ("touches" in e2) {
            return callback({
              x: e2.touches[0].clientX - startingX,
              y: e2.touches[0].clientY - startingY,
            });
          } else {
            return callback({
              x: e2.clientX - startingX,
              y: e2.clientY - startingY,
            });
          }
        }
      };
    }

    this.event(distanceInit);
  }
}

class CardCarousel extends DraggingEvent {
  constructor(container, controller = undefined) {
    super(container);

    this.container = container;
    this.controllerElement = controller;
    this.cards = container.querySelectorAll(".cardSport");

    this.centerIndex = (this.cards.length - 1) / 2;
    this.cardWidth =
      (this.cards[0].offsetWidth / this.container.offsetWidth) * 100;
    this.xScale = {};

    window.addEventListener("resize", this.updateCardWidth.bind(this));

    if (this.controllerElement) {
      this.controllerElement.addEventListener(
        "keydown",
        this.controller.bind(this)
      );
    }

    this.build();

    super.getDistance(this.moveCards.bind(this));
  }

  updateCardWidth() {
    this.cardWidth =
      (this.cards[0].offsetWidth / this.container.offsetWidth) * 100;

    this.build();
  }

  build(fix = 0) {
    for (var i = 0; i < this.cards.length; i++) {
      var x = i - this.centerIndex;
      var scale = this.calcScale(x);
      var scale2 = this.calcScale2(x);
      var zIndex = -Math.abs(i - this.centerIndex);

      var leftPos = this.calcPos(x, scale2);

      this.xScale[x] = this.cards[i];

      this.updateCards(this.cards[i], {
        x: x,
        scale: scale,
        leftPos: leftPos,
        zIndex: zIndex,
      });
    }
  }

  controller(e) {
    var temp = { ...this.xScale };

    if (e.keyCode === 39) {
      for (var x in this.xScale) {
        var newX =
          parseInt(x) - 1 < -this.centerIndex
            ? this.centerIndex
            : parseInt(x) - 1;

        temp[newX] = this.xScale[x];
      }
    }

    if (e.keyCode == 37) {
      for (var x in this.xScale) {
        var newX =
          parseInt(x) + 1 > this.centerIndex
            ? -this.centerIndex
            : parseInt(x) + 1;

        temp[newX] = this.xScale[x];
      }
    }

    this.xScale = temp;

    for (var x in temp) {
      var scale = this.calcScale(x),
        scale2 = this.calcScale2(x),
        leftPos = this.calcPos(x, scale2),
        zIndex = -Math.abs(x);

      this.updateCards(this.xScale[x], {
        x: x,
        scale: scale,
        leftPos: leftPos,
        zIndex: zIndex,
      });
    }
  }

  calcPos(x, scale) {
    var formula;

    if (x < 0) {
      formula = (scale * 100 - this.cardWidth) / 2;

      return formula;
    } else if (x > 0) {
      formula = 100 - (scale * 100 + this.cardWidth) / 2;

      return formula;
    } else {
      formula = 100 - (scale * 100 + this.cardWidth) / 2;

      return formula;
    }
  }

  updateCards(card, data) {
    if (data.x || data.x == 0) {
      card.setAttribute("data-x", data.x);
    }

    if (data.scale || data.scale == 0) {
      card.style.transform = `scale(${data.scale})`;

      if (data.scale == 0) {
        card.style.opacity = data.scale;
      } else {
        card.style.opacity = 1;
      }
    }

    if (data.leftPos) {
      card.style.left = `${data.leftPos}%`;
    }

    if (data.zIndex || data.zIndex == 0) {
      if (data.zIndex == 0) {
        card.classList.add("highlight");
      } else {
        card.classList.remove("highlight");
      }

      card.style.zIndex = data.zIndex;
    }
  }

  calcScale2(x) {
    var formula;

    if (x <= 0) {
      formula = 1 - (-1 / 5) * x;

      return formula;
    } else if (x > 0) {
      formula = 1 - (1 / 5) * x;

      return formula;
    }
  }

  calcScale(x) {
    var formula = 1 - (1 / 5) * Math.pow(x, 2);

    if (formula <= 0) {
      return 0;
    } else {
      return formula;
    }
  }

  checkOrdering(card, x, xDist) {
    var original = parseInt(card.dataset.x);
    var rounded = Math.round(xDist);
    var newX = x;

    if (x !== x + rounded) {
      if (x + rounded > original) {
        if (x + rounded > this.centerIndex) {
          newX =
            x + rounded - 1 - this.centerIndex - rounded + -this.centerIndex;
        }
      } else if (x + rounded < original) {
        if (x + rounded < -this.centerIndex) {
          newX =
            x + rounded + 1 + this.centerIndex - rounded + this.centerIndex;
        }
      }

      this.xScale[newX + rounded] = card;
    }

    var temp = -Math.abs(newX + rounded);

    this.updateCards(card, { zIndex: temp });

    return newX;
  }

  moveCards(data) {
    var xDist;

    if (data != null) {
      this.container.classList.remove("smooth-return");
      xDist = data.x / 250;
    } else {
      this.container.classList.add("smooth-return");
      xDist = 0;

      for (var x in this.xScale) {
        this.updateCards(this.xScale[x], {
          x: x,
          zIndex: Math.abs(Math.abs(x) - this.centerIndex),
        });
      }
    }

    for (var i = 0; i < this.cards.length; i++) {
      var x = this.checkOrdering(
          this.cards[i],
          parseInt(this.cards[i].dataset.x),
          xDist
        ),
        scale = this.calcScale(x + xDist),
        scale2 = this.calcScale2(x + xDist),
        leftPos = this.calcPos(x + xDist, scale2);

      this.updateCards(this.cards[i], {
        scale: scale,
        leftPos: leftPos,
      });
    }
  }
}

// carousel for games
class Carousel {
  constructor(element, images) {
    this.board = element;
    this.images = images;
    this.imageIndex = 0;

    this.push();
    this.push();

    this.handle();
  }

  handle() {
    this.cards = this.board.querySelectorAll(".cardGame");
    this.topCard = this.cards[this.cards.length - 1];
    this.nextCard = this.cards[this.cards.length - 2];

    if (this.cards.length > 0) {
      this.topCard.style.transform =
        "translateX(-50%) translateY(-50%) rotate(0deg) rotateY(0deg) scale(1)";

      if (this.hammer) this.hammer.destroy();

      this.hammer = new Hammer(this.topCard);
      this.hammer.add(new Hammer.Tap());
      this.hammer.add(
        new Hammer.Pan({ position: Hammer.position_ALL, threshold: 0 })
      );

      this.hammer.on("tap", (e) => this.onTap(e));
      this.hammer.on("pan", (e) => this.onPan(e));
    }
  }

  onTap(e) {
    var url = this.topCard.getAttribute("data-url");
    if (url) {
      //window.open(url, '_blank');
      window.location.href = url;
    }
  }

  onPan(e) {
    if (!this.isPanning) {
      this.isPanning = true;

      this.topCard.style.transition = null;
      if (this.nextCard) this.nextCard.style.transition = null;

      var style = window.getComputedStyle(this.topCard);
      var mx = style.transform.match(/^matrix\((.+)\)$/);
      this.startPosX = mx ? parseFloat(mx[1].split(", ")[4]) : 0;
      this.startPosY = mx ? parseFloat(mx[1].split(", ")[5]) : 0;

      var bounds = this.topCard.getBoundingClientRect();

      this.isDraggingFrom =
        e.center.y - bounds.top > this.topCard.clientHeight / 2 ? -1 : 1;
    }

    var posX = e.deltaX + this.startPosX;
    var posY = e.deltaY + this.startPosY;

    var propX = e.deltaX / this.board.clientWidth;
    var propY = e.deltaY / this.board.clientHeight;

    var dirX = e.deltaX < 0 ? -1 : 1;

    var deg = this.isDraggingFrom * dirX * Math.abs(propX) * 45;

    var scale = (95 + 5 * Math.abs(propX)) / 100;

    this.topCard.style.transform =
      "translateX(" +
      posX +
      "px) translateY(" +
      posY +
      "px) rotate(" +
      deg +
      "deg) rotateY(0deg) scale(1)";

    if (this.nextCard)
      this.nextCard.style.transform =
        "translateX(-50%) translateY(-50%) rotate(0deg) rotateY(0deg) scale(" +
        scale +
        ")";

    if (e.isFinal) {
      this.isPanning = false;

      var successful = false;

      this.topCard.style.transition = "transform 200ms ease-out";
      if (this.nextCard)
        this.nextCard.style.transition = "transform 100ms linear";

      if (propX > 0.25 && e.direction == Hammer.DIRECTION_RIGHT) {
        successful = true;
        posX = this.board.clientWidth;
      } else if (propX < -0.25 && e.direction == Hammer.DIRECTION_LEFT) {
        successful = true;
        posX = -(this.board.clientWidth + this.topCard.clientWidth);
      } else if (propY < -0.25 && e.direction == Hammer.DIRECTION_UP) {
        successful = true;
        posY = -(this.board.clientHeight + this.topCard.clientHeight);
      }

      if (successful) {
        this.topCard.style.transform =
          "translateX(" +
          posX +
          "px) translateY(" +
          posY +
          "px) rotate(" +
          deg +
          "deg)";

        setTimeout(() => {
          this.board.removeChild(this.topCard);
          this.push();
          this.handle();
        }, 200);
      } else {
        this.topCard.style.transform =
          "translateX(-50%) translateY(-50%) rotate(0deg) rotateY(0deg) scale(1)";
        if (this.nextCard)
          this.nextCard.style.transform =
            "translateX(-50%) translateY(-50%) rotate(0deg) rotateY(0deg) scale(0.95)";
      }
    }
  }

  push() {
    if (this.imageIndex >= this.images.length) {
      this.imageIndex = 0;
    }

    var image = this.images[this.imageIndex];
    var card = document.createElement("div");
    card.classList.add("cardGame");
    card.style.backgroundImage = `url('${image.src}')`;
    card.setAttribute("data-url", image.url);
    card.setAttribute("title", image.name);

    this.board.insertBefore(card, this.board.firstChild);
    this.imageIndex++;
  }
}

// Meter Data
document.addEventListener("DOMContentLoaded", () => {
  var circleMeters = document.querySelectorAll(".circle-meter");

  circleMeters.forEach((meter) => {
    var percentage = meter.getAttribute("data-percentage");
    meter.style.background = `conic-gradient(#0077b6 0% ${percentage}%, rgb(115, 115, 115) ${percentage}%, rgb(210, 210, 210) 100%)`;
  });
});

// Get Data From Database.json file
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
  if (xhr.readyState == 4 && xhr.status == 200) {
    var database = JSON.parse(xhr.responseText);

    // MOVIES SECTION
    if (content && database.movies) {
      database.movies.slice(0, 20).forEach((item) => {
        var link = document.createElement("a");
        link.href = item.url;

        var img = document.createElement("img");
        img.src = item.src;
        img.alt = item.name;
        img.title = item.name;
        img.className = "item";

        link.appendChild(img);
        content.appendChild(link);
      });
    }

    // SPORTS SECTION
    var cardCarousel = document.querySelector(".card-carousel-sport");
    if (cardCarousel && database.sports) {
      database.sports.slice(0, 21).forEach((item) => {
        var card = document.createElement("div");
        card.className = "cardSport";
        card.id = item.id;
        card.innerHTML = `
          <div class="image-container" style="background-image: url('${item.src}')"></div>
          <h4>${item.name}</h4>
          <p>${item.description}</p>
        `;
        var linkElement = document.createElement("a");
        linkElement.href = item.url;
        linkElement.style.textDecoration = "none";
        linkElement.style.color = "inherit";

        while (card.firstChild) {
          linkElement.appendChild(card.firstChild);
        }
        card.appendChild(linkElement);
        cardCarousel.appendChild(card);
      });

      new CardCarousel(cardCarousel);
    }

    // GAMES SECTION
    var board = document.querySelector("#board");
    if (board && database.games) {
      var gamesObj = database.games.slice(0, 20);
      new Carousel(board, gamesObj);
    }
  }
};

xhr.open("GET", "js/database.json");
xhr.send();
