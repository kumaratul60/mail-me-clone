import React, { useEffect, useState } from "react";
import { Checkbox, IconButton } from "@material-ui/core";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import RedoIcon from "@material-ui/icons/Redo";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import KeyboardHideIcon from "@material-ui/icons/KeyboardHide";
import SettingsIcon from "@material-ui/icons/Settings";
import InboxIcon from "@material-ui/icons/Inbox";
import PeopleIcon from "@material-ui/icons/People";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";

import "./EmailList.css";
import Section from "../Section/Section";
import EmailRow from "../EmailRow/EmailRow";
import { db } from "../../firebase";

function EmailList() {
  const [emails, setEmails] = useState([]);

  // // every time when email componnets load it runs/rerenders.
  // useEffect(()=>{

  // })

  // When email componnets load it runs only once.
  useEffect(() => {
    // onSanpshot is a real time Listner, when any time , any thing changes in firbase database fileds  then essentually it will get update that peace of code and fire off again.

    //  when any changes happen in db side then setEmail peace of code fire off again.
    db.collection("emails")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setEmails(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  }, []);

  return (
    <div className="emailList">
      <div className="emailList__setting">
        <div className="emailList__settingLeft">
          <IconButton>
            <Checkbox />
          </IconButton>
          <IconButton>
            <ArrowDropDownIcon />
          </IconButton>
          <IconButton>
            <RedoIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
        <div className="emailList__settingRight">
          <IconButton>
            <ChevronLeftIcon />
          </IconButton>
          <IconButton>
            <ChevronRightIcon />
          </IconButton>
          <IconButton>
            <KeyboardHideIcon />
          </IconButton>
          <IconButton>
            <SettingsIcon />
          </IconButton>
        </div>
      </div>

      <div className="emailList__section">
        <Section Icon={InboxIcon} title="Primary" color="#D53026" selected />
        <Section Icon={PeopleIcon} title="Social" color="#1B72E4" />
        <Section Icon={LocalOfferIcon} title="Promotions" color="#197F38" />
      </div>
      <div className="emailList__list">
        {/* deep destructuring */}
        {emails.map(({ id, data: { to, subject, message, timestamp } }) => (
          <EmailRow
            id={id}
            key={id}
            title={to}
            subject={subject}
            description={message}
            // time = {new Date(timestamp?.seconds*1000).toUTCString()}
            time={new Date(timestamp?.seconds * 1000).toLocaleString("en-US", {
              timeZone: "Asia/Kolkata",
            })}
          />
        ))}
        {/* <EmailRow
          title="Roc8 🚀"
          subject="selected in Best value 🔥"
          description="welcom in our new valable scope 🥇"
          time="time ⏲️"
        /> */}
      </div>
    </div>
  );
}

export default EmailList;
