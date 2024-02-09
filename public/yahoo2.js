import yahooFinance from "yahoo-finance2";

let yf2 = async ([]) => {
  let response = await yahooFinance
    .quoteSummary([])
    .then((data) => {
      return data;
    })
    .catch((e) => {
      console.log(e);
      return e;
    });

  return response;
};

export default yf2;

/**
 *    let percentChangeColor =
      indexContainers[i].children[2].children[1].style.color;
 *  let priceColor = indexContainers[i].children[1].style.color;
    //let pointsChangeText = indexContainers[i].children[2].children[0].innerText;
    let pointsChangeColor =
      indexContainers[i].children[2].children[0].style.color;
 * import { marketStatusCheck, startCountDown, mktStatusNotification } from "./market_clock.js";
import updateIndexData from "./index_pricing.js";
import setTodaysDate from './date.js';


const todaysDateH4 = document.querySelector("#timer_container > #todayDate");
const mktNotification = document.querySelector(
  "body > #mkt_status_notification_container > #mkt_status_notification"
);

const percentChangeIndex = document.querySelectorAll(
  "body > section > .index_container > .img_container> .percent_change"
);
const imgContainer = document.querySelectorAll(
  "section > .index_container > .img_container"
);

const up17 = new URL("../assets/up17.png", import.meta.url);
const down17 = new URL("../assets/down17.png", import.meta.url);


todaysDateH4.innerText = setTodaysDate();
setInterval(() => {
  todaysDateH4.innerText = setTodaysDate();
}, 900);

let mktStatus = marketStatusCheck();
mktStatusNotification(mktStatus, mktNotification);

document.querySelector("body > #timer_container > h5").innerText = `${mktStatus} Bell in:`;
document.querySelector("body>#timer_container>#market_clock").innerText = startCountDown(mktStatus);

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

 setInterval(() => {
    updateIndexData(priceOfIndex, "value");
    updateIndexData(percentChangeIndex, "change");
    updateIndexData(imgContainer, "arrow", up17, down17);
  }, 999);


  //import '../assets/up17.png';
//import '../assets/down17.png';

 if (result.body[0].postMarketPrice === null && result.body[0].preMarketPrice === null) {
                //after.style.display = "none";
            } else {

            }
 */
