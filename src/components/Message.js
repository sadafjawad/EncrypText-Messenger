import React, { useRef, useEffect } from "react";
import Moment from "react-moment";
import { unlock } from '../aes/Decrypt'; 


const Message = ({ msg, loggedUser, status }) => {
  const scrollRef = useRef(); 

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msg]);
  return (
    <div
      className={`message_wrapper ${msg.from === loggedUser ? "own" : ""}`}
      ref={scrollRef}
    >
      <p className={msg.from === loggedUser ? "mes" : "other"}>
        {msg.media ? <img src={msg.media} alt={msg.text} /> : null}
        {status ? unlock(msg.text) : msg.text}
        <br />
        <small>
          <Moment fromNow>{msg.createdAt.toDate()}</Moment>
        </small>
      </p>
    </div>
  );
};

export default Message;
