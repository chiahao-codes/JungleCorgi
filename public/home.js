const h2Box = document.querySelector("header>h2");
const todaysDateH4 = document.querySelector("#timer_container > #todayDate");
const nycTimeZone = "America/New_York";
const mktNotification = document.querySelector(
  "body > #mkt_status_notification_container > #mkt_status_notification"
);

const symbols = [
  "^GSPC",
  "^IXIC",
  "^DJI",
  "^N225",
  "^HSI",
  "^FTSE",
  "BTC-USD",
  "^VVIX",
  "GC=F",
  "CL=F",
  "NG=F",
  "^TNX",
  "JPY=X",
  "EURUSD=X",
  "^RUT",
];

const indexContainers2 = document.querySelectorAll(
  "body > section > .index_container"
);

const setTodaysDate = () => {
  const todaysDate = new Date();
  const dateFormat = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
  });

  const todaysDateFormat = dateFormat.format(todaysDate);
  return todaysDateFormat;
};

const mktStatusNotification = (mktstatus, mktnotify) => {
  if (mktstatus === "Opening") {
    mktnotify.innerText = `U.S. markets closed`;
  } else {
    mktnotify.innerText = `U.S. markets open`;
  }
};

const marketStatusCheck = () => {
  let localDate = new Date();
  let localDayOfWeek = localDate.getDay();
  let localHour = localDate.getHours();

  let localMins = localDate.getMinutes();

  let currFullNycDate = new Date().toLocaleString("en-US", {
    timeZone: nycTimeZone,
  });
  currFullNycDate = new Date(currFullNycDate);

  let currNycHour = currFullNycDate.getHours();

  let closingHour = 16,
    hourDiff,
    nyc10Am = 10,
    nyc9Am = 9;

  //check time differences;
  if (localHour <= currNycHour) {
    hourDiff = currNycHour - localHour;
    nyc9Am = nyc9Am - hourDiff;
    closingHour = closingHour - hourDiff;
    nyc10Am = nyc10Am - hourDiff;
  } else {
    hourDiff = localHour - currNycHour;
    nyc9Am = nyc9Am + hourDiff;
    nyc10Am = nyc10Am + hourDiff;
    closingHour = closingHour + hourDiff;
  }

  let status = "Opening";

  //monday to friday would have closing:
  if (0 < localDayOfWeek && localDayOfWeek < 6) {
    if (
      (localHour === nyc9Am && localMins >= 30) ||
      (localHour < closingHour && localHour >= nyc10Am)
    ) {
      //market is open:
      status = "Closing";
    }
  }

  return status;
};

const startCountDown = (mkt) => {
  //later: simulate "Sunday night"
  let currFullNycDate = new Date().toLocaleString("en-US", {
    timeZone: nycTimeZone,
  });
  let currHourNyc = new Date(currFullNycDate);
  currHourNyc = currHourNyc.getHours();
  let local = new Date();
  let localDate = local.getDate();
  let localNextDate = localDate + 1;
  let localDay = local.getDay();
  let localYear = local.getFullYear();
  let localHour = local.getHours();
  let localMonth = local.getMonth();
  let hourDifference,
    openingMktHour = 9,
    closingMktHour = 16;

  //adjust for nyc time;
  if (localHour <= currHourNyc) {
    hourDifference = currHourNyc - localHour;
    openingMktHour = openingMktHour - hourDifference;

    closingMktHour = closingMktHour - hourDifference;
  }

  if (localHour > currHourNyc) {
    hourDifference = localHour - currHourNyc;
    openingMktHour = openingMktHour + hourDifference;
    closingMktHour = closingMktHour + hourDifference;
  }

  let now = Date.now();

  //dayOfWeekNyc, nextDay, currNycDate, currHourNyc, currNycYear, currNycMonth
  let openingBellCountdown = () => {
    //if Friday-Sunday:
    if (localDay === 5) {
      localNextDate = localDate + 3;
    }
    if (localDay === 6) localNextDate = localDate + 2;
    if (localDay === 0) localNextDate = localDate + 1;

    //pre-mkt hours
    if (localHour >= 0 && localHour <= openingMktHour) {
      localNextDate = localDate;
    }

    //bank holidays:
    if (localMonth === 11 && localNextDate === 25)
      localNextDate = localNextDate + 1; //xmas
    if (localMonth === 11 && localNextDate === 32)
      localNextDate = localNextDate + 1; //nye
    if (localMonth === 0 && localNextDate === 15)
      localNextDate = localNextDate + 1; //mlk
    if (localMonth === 1 && localNextDate === 19)
      localNextDate = localNextDate + 1; //president's day
    if (localMonth === 4 && localNextDate === 27)
      localNextDate = localNextDate + 1; //memorial day
    if (localMonth === 5 && localNextDate === 19)
      localNextDate = localNextDate + 1; //Juneteenth
    if (localMonth === 6 && localNextDate === 4)
      localNextDate = localNextDate + 1; //July4

    let openingBell = new Date(
      localYear,
      localMonth,
      localNextDate,
      openingMktHour,
      30,
      0,
      0
    ).getTime();

    let timeUntilOpening = openingBell - now;

    let days = Math.floor(timeUntilOpening / (1000 * 60 * 60 * 24));

    let hours = Math.floor(
      (timeUntilOpening % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    let minutes = Math.floor(
      (timeUntilOpening % (1000 * 60 * 60)) / (1000 * 60)
    );
    let seconds = Math.floor((timeUntilOpening % (1000 * 60)) / 1000);

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  let closingBellCountdown = () => {
    let closingBell = new Date(
      localYear,
      localMonth,
      localDate,
      closingMktHour,
      0,
      0
    ).getTime();

    let timeUntilClosing = closingBell - now;

    let hours = Math.floor(
      (timeUntilClosing % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    let minutes = Math.floor(
      (timeUntilClosing % (1000 * 60 * 60)) / (1000 * 60)
    );
    let seconds = Math.floor((timeUntilClosing % (1000 * 60)) / 1000);

    return `${hours}h ${minutes}m ${seconds}s`;
  };

  let counter;

  if (mkt === "Opening") {
    counter = openingBellCountdown();
  }

  if (mkt === "Closing") {
    counter = closingBellCountdown();
  }

  return counter;
};

const tickrUrl = window.location.href;
localStorage.setItem("url", tickrUrl);

const indexContainerEvents = (symbol) => {
  for (let i = 0; i < indexContainers2.length; i++) {
    indexContainers2[i].addEventListener("mouseup", () => {
      console.log("symbol", symbol[i]);
      let stockSym = symbol[i];
      window.location.href = tickrUrl + stockSym;
    });
  }
};
const regExp = /[a-zA-Z.^]/;

indexContainerEvents(symbols);
todaysDateH4.innerText = setTodaysDate();
setInterval(() => {
  todaysDateH4.innerText = setTodaysDate();
}, 899);

let mktStatus = marketStatusCheck();
mktStatusNotification(mktStatus, mktNotification);

document.querySelector(
  "body > #timer_container > h5"
).innerText = `${mktStatus} Bell in:`;
document.querySelector("body>#timer_container>#market_clock").innerText =
  startCountDown(mktStatus);

setInterval(() => {
  mktStatus = marketStatusCheck();
  document.querySelector(
    "body > #timer_container > h5"
  ).innerText = `${mktStatus} Bell in:`;
  document.querySelector("body>#timer_container>#market_clock").innerText =
    startCountDown(mktStatus);
  mktStatusNotification(mktStatus, mktNotification);
}, 900);

h2Box.addEventListener("focus", () => {
  const h2ChildNodes = h2Box.childNodes;
  const selection = window.getSelection();
  if (h2Box.innerText === "Enter ticker or company...") {
    h2Box.innerText = "";
  }
  //set caret position after text node
  if (h2ChildNodes.length > 0) {
    selection.setPosition(h2ChildNodes[0], h2ChildNodes[0].length);
  } else {
    selection.setPosition(h2Box, 0);
  }

  return;
});

h2Box.addEventListener("focusout", () => {
  if (h2Box.innerText === "") h2Box.innerText = "Enter ticker or company...";
  if (h2Box.style.backgroundColor === "#15192f") {
    h2Box.style.backgroundColor = "#012c12";
  }
});

h2Box.addEventListener("keydown", (e) => {
  const textString = h2Box.innerText;
  if (textString.length >= 20 && e.key !== "Backspace" && e.key !== "Enter") {
    e.preventDefault();
    alert("Character amount exceeded");
  }
  //prevent navigation keys;
  //enter ticker into url param;
  if (textString.length > 0) {
    let navKeys = [
      "ArrowLeft",
      "ArrowRight",
      "ArrowDown",
      "ArrowUp",
      "Left",
      "Right",
      "Up",
      "Down",
      "Home",
      "End",
      "Del",
      "Delete",
      "PageUp",
      "PageDown",
      "Insert",
    ];

    for (const ele of navKeys) {
      if (e.key === ele) {
        e.preventDefault();
        alert("Invalid entry");
      }
    }

    if (textString === "" && e.key === "Enter") {
      e.preventDefault();
      alert("enter a valid ticker");
    }

    if (e.key === "Enter" && textString !== "") {
      //enter the ticker string into the url parameter
      //grab the URL;
      const url = window.location.href;
      const tickerPage = `${url}${textString}`;
      //check ticker string
      window.location.href = tickerPage;
    }
  }
  //prevent non-letters
  //Allow Backspace, Enter keys;
  //Note: navigation keys are failing the regexp test;
  if (regExp.test(e.key) === false) {
    if (e.key !== "Backspace" && e.key !== "Enter") {
      e.preventDefault();
      alert("Invalid entry");
    }
  }
});

h2Box.addEventListener("keyup", (e) => {
  //needed for removing auto-generated divs in mozilla vs. chrome;
  let divBr = document.querySelector("h2 div");
  let brList = document.querySelectorAll("h2 br");
  if (e.key === "Backspace" || e.key === "Enter") {
    if (brList && brList.length > 0) {
      for (br of brList) {
        if (br) br.remove();
      }
    }
    if (divBr) {
      divBr.remove();
    }
  }
  return;
});
