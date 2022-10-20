import React, { useState, useEffect } from "react";
import moment from "moment";

const AutionTimeBid = ({ data }) => {
  const [newTime, setNewTime] = useState(0);

  let now = moment(new Date(), "DD/MM/YYYY HH:mm:ss");

  let timerdate = moment(data, "DD/MM/YYYY HH:mm:ss").diff(
    moment(now, "DD/MM/YYYY HH:mm:ss"),
    "s"
  );

  function secondsToHms(d) {
    d = Number(d);
    let h = Math.floor(d / 3600);
    let m = Math.floor((d % 3600) / 60);
    let s = Math.floor((d % 3600) % 60);
    let hDisplay = h > 0 ? h + (h == 1 ? ":" : ":") : "00";
    let mDisplay = m > 0 ? m + (m == 1 ? ":" : ":") : "00";
    let sDisplay = s > 0 ? s + (s == 1 ? "" : "") : "00";
    return hDisplay + mDisplay + sDisplay;
  }

  function getTimeZone() {
    let offset = new Date().getTimezoneOffset(),
      o = Math.abs(offset);
    return (
      (offset < 0 ? "+" : "-") +
      ("00" + Math.floor(o / 60)).slice(-2) +
      ":" +
      ("00" + (o % 60)).slice(-2)
    );
  }

  let timeCounter = now > moment(data, "DD/MM/YYYY HH:mm:ss");

  useEffect(() => {
    setTimeout(() => setNewTime(timerdate), 1000);
  }, [newTime]);

  return (
    <span className="exp-desc">
      {timeCounter ? (
        " Auction Expired"
      ) : (
        <>
          (GMT {getTimeZone()}) {secondsToHms(timerdate)}
        </>
      )}
      <br />
      {data}
    </span>
  );
};

export default AutionTimeBid;
