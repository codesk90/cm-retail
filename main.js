const data = {
  cities: [
    {
      section: "cupertino",
      label: "Cupertino",
    },
    {
      section: "new-york-city",
      label: "New York City",
    },
    {
      section: "london",
      label: "London",
    },
    {
      section: "amsterdam",
      label: "Amsterdam",
    },
    {
      section: "tokyo",
      label: "Tokyo",
    },
    {
      section: "hong-kong",
      label: "Hong Kong",
    },
    {
      section: "sydney",
      label: "Sydney",
    },
  ],
};

let navList = document.querySelector(".nav-list");
let clock = document.getElementById("clock");
let slideIndicator = document.querySelector(".slider-indicator");
let isFirstClick = true;
let currentCity, currentTime;

data.cities.forEach((city, index) => {
  const listItem = document.createElement("li");
  listItem.setAttribute("id", `nav-${index}`);
  listItem.setAttribute("data-section", city.section);
  listItem.setAttribute("class", "nav-item");
  listItem.textContent = city.label;
  navList.appendChild(listItem);
});

navList.addEventListener("click", (e) => {
  if (e.target && e.target.tagName == "LI") {
    removeActive();
    e.target.classList.add("active");
    updateSlider(e.target);
    currentCity = e.target.getAttribute("data-section");
    clock.style.display = "flex";
  }
});

function getCityTime() {
  switch (currentCity) {
    case "cupertino":
      currentTime = new Date().toLocaleTimeString("en-GB", {
        timeZone: "America/Los_Angeles",
      });
      break;
    case "new-york-city":
      currentTime = new Date().toLocaleTimeString("en-GB", {
        timeZone: "America/New_York",
      });
      break;
    case "london":
      currentTime = new Date().toLocaleTimeString("en-GB", {
        timeZone: "Europe/London",
      });
      break;
    case "amsterdam":
      currentTime = new Date().toLocaleTimeString("en-GB", {
        timeZone: "Europe/Amsterdam",
      });
      break;
    case "tokyo":
      currentTime = new Date().toLocaleTimeString("en-GB", {
        timeZone: "Asia/Tokyo",
      });
      break;
    case "hong-kong":
      currentTime = new Date().toLocaleTimeString("en-GB", {
        timeZone: "Asia/Hong_Kong",
      });
      break;
    case "sydney":
      currentTime = new Date().toLocaleTimeString("en-GB", {
        timeZone: "Australia/Sydney",
      });
      break;
  }
  return currentTime;
}

let removeActive = () => {
  let cityLength = navList.getElementsByTagName("li").length;
  for (let i = 0; i < cityLength; i++) {
    navList.getElementsByTagName("li")[i].classList.remove("active");
  }
};

function updateSlider(e) {
  let rect = e.getBoundingClientRect();
  let parentRect = e.parentElement.getBoundingClientRect();

  var width = rect.width;
  var left = rect.left - parentRect.left;

  slideIndicator.style.setProperty("--width", width + "px");
  slideIndicator.style.setProperty("--left", left + "px");

  if (isFirstClick) {
    setTimeout(function () {
      slideIndicator.classList.add("active");
    }, 25);
    isFirstClick = false;
  }
}

const segments = [
  // Define segment positions for each number (0-9)
  [1, 1, 1, 1, 1, 1, 0], // 0
  [0, 1, 1, 0, 0, 0, 0], // 1
  [1, 1, 0, 1, 1, 0, 1], // 2
  [1, 1, 1, 1, 0, 0, 1], // 3
  [0, 1, 1, 0, 0, 1, 1], // 4
  [1, 0, 1, 1, 0, 1, 1], // 5
  [1, 0, 1, 1, 1, 1, 1], // 6
  [1, 1, 1, 0, 0, 0, 0], // 7
  [1, 1, 1, 1, 1, 1, 1], // 8
  [1, 1, 1, 1, 0, 1, 1], // 9
];

function setTime() {
  const cityTime = getCityTime().split(":");

  const hours = cityTime[0].padStart(2, "0");
  const minutes = cityTime[1].padStart(2, "0");
  const seconds = cityTime[2].padStart(2, "0");

  updateDisplay(hours[0], document.getElementById("hour1"));
  updateDisplay(hours[1], document.getElementById("hour2"));
  updateDisplay(minutes[0], document.getElementById("minute1"));
  updateDisplay(minutes[1], document.getElementById("minute2"));
  updateDisplay(seconds[0], document.getElementById("second1"));
  updateDisplay(seconds[1], document.getElementById("second2"));
}

function updateDisplay(number, digitElement) {
  const segs = digitElement.querySelectorAll(".segment");
  segments[number].forEach((on, index) => {
    segs[index].classList.toggle("on", on === 1);
    segs[index].classList.toggle("off", on === 0);
  });
}

setInterval(setTime, 1000);

window.addEventListener("resize", function () {
  const activeItem = document.querySelector(".nav-item.active");
  if (activeItem) {
    updateSlider(activeItem);
  }
});
