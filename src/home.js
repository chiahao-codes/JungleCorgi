import {marketStatusCheck,startCountDown,mktStatusNotification,} from "./market_clock.js" ;
import updateIndexData from "./index_pricing.js";

const h2Box = document.querySelector("header>h2");
const mktNotification = document.querySelector(
  "body > #mkt_status_notification_container > #mkt_status_notification"
);
const priceOfIndex = document.querySelectorAll(
  "body > section > .index_container > .price"
);
const percentChangeIndex = document.querySelectorAll(
  "body > section > .index_container > .img_container> .percent_change"
);
const imgContainer = document.querySelectorAll(
  "section > .index_container > .img_container"
);

const up17 = "../public/assets/up17.png"
const down17 = "../public/assets/down17.png";
const regExp = /[a-zA-Z]/;
let mktStatus = marketStatusCheck();

document.querySelector( "body > #timer_container > h5"
).innerText = `${mktStatus} Bell in:`;
document.querySelector("body>#timer_container>#market_clock").innerText =
  startCountDown(mktStatus);

mktStatusNotification(mktStatus, mktNotification);
const clockImgInterval = () => {
  setInterval(() => {
    mktStatus = marketStatusCheck();
    document.querySelector(
      "body > #timer_container > h5"
    ).innerText = `${mktStatus} Bell in:`;
    document.querySelector("body>#timer_container>#market_clock").innerText =
      startCountDown(mktStatus);
    mktStatusNotification(mktStatus, mktNotification);
  }, 1000);

  setInterval(() => {
    updateIndexData(priceOfIndex, "value");
    updateIndexData(percentChangeIndex, "change");
    updateIndexData(imgContainer, "arrow", up17, down17);
  }, 5000);
};

updateIndexData(priceOfIndex, "value")
  .then(() => {
    updateIndexData(percentChangeIndex, "change");
  })
    .then(() => {
    updateIndexData(imgContainer, "arrow", up17, down17);
  })
  .then(() => {
    clockImgInterval();
  })
  .catch((e) => {
    console.log(e);
    return;
  });

h2Box.addEventListener("click", () => {
  const h2ChildNodes = h2Box.childNodes;
  const selection = window.getSelection();
  if (h2Box.innerText === "Enter ticker...") {
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

h2Box.addEventListener("focus", () => {
  const h2ChildNodes = h2Box.childNodes;
  const selection = window.getSelection();
  if (h2Box.innerText === "Enter ticker...") {
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


h2Box.addEventListener("keydown", (e) => {
  let textString = h2Box.innerText;
  if (textString.length >= 5 && e.key !== "Backspace" && e.key !== "Enter") {
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
      let url = window.location.href;
      let tickerSearch = `${url}ticker/${textString}`;
      //
      window.location.href = tickerSearch;
      
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

