import React, { useEffect, useState } from "react";
import Img from "./pfp.jpeg";
import { auth, dataBase } from "../firebase";
import { getDoc, doc } from "firebase/firestore";


const Account = () => { 
    const [user, setUser] = useState();
    useEffect(() => {
        getDoc(doc(dataBase, "users", auth.currentUser.uid)).then((docSnap) => {
          if (docSnap.exists) {
            setUser(docSnap.data());
          }
        });
      });
    return user ? (
        <section>
        <div className="profile_container">
            <div className="img_container">
            <img src={Img} alt="avatar" />
            </div>
            <div className="text_container">
            <h3>{user.name}</h3>
            <p>{user.email}</p>
            <hr />
            </div>
        </div>
        </section>
    ) : null
};

export default Account;
