import React, { useEffect, useState } from 'react';
import { auth, dataBase, storage } from '../firebase';
import { collection, query, onSnapshot, where, addDoc, Timestamp, orderBy, setDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import User from '../components/User';
import CreateMessage from '../components/CreateMessage';
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage'
import Message from '../components/Message';
import { lock } from '../aes/Encrypt';

const Home = () => {
  const [status, setStatus] = useState();
  const [users, setUsers] = useState([]);
  const [chat, setChat] = useState('');
  const [text, setText] = useState('');
  const [img, setImg] = useState('');
  const [msgs, setMsgs] = useState('');
  const loggedUser = auth.currentUser.uid;

  useEffect(() => {
    const usersCollection = collection(dataBase, "users");
    const q = query(usersCollection, where("uid", "not-in", [loggedUser]));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let users = [];
      querySnapshot.forEach((doc) => {
        users.push(doc.data());
      });
      setUsers(users);
    });
    return () => unsub();
  }, []);
  
  useEffect(() => {
    const usersCollection = collection(dataBase, "users");
    const q = query(usersCollection, where("uid", "in", [loggedUser]));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let status;
      querySnapshot.forEach((doc) => {
        status = doc.data().reveal;
      });
      setStatus(status)
    });
    return () => unsub();
  });

  const selectUser = async (user) => {
    setChat(user)
    const friend = user.uid
    const id = loggedUser > friend ? `${loggedUser+friend}` : `${friend+loggedUser}`
    const msgCollection = collection(dataBase, 'messages', id, 'chat')
    const q = query(msgCollection, orderBy('createdAt', 'asc'))

    onSnapshot(q, querySnapshot => {
      let msgs = []
      querySnapshot.forEach(doc => {
        msgs.push(doc.data())
      })
      setMsgs(msgs)
    });

    const docSnap = await getDoc(doc(dataBase, 'lastMsg', id));
    if (docSnap.data() && docSnap.data().from !== loggedUser){
      await updateDoc(doc(dataBase, 'lastMsg', id), { unread: false });
    }
  };

  const handleSubmit = async e => { 
    e.preventDefault()
    const friend = chat.uid
    const id = loggedUser > friend ? `${loggedUser+friend}` : `${friend+loggedUser}`
    let url
    if (img) {
      const imgRef = ref(storage, `images/${new Date().getTime()} - ${img.name}`);
      const snap = await uploadBytes(imgRef, img);
      const url1 = await getDownloadURL(ref(storage, snap.ref.fullPath))
      url = url1
    }
    await addDoc(collection(dataBase, 'messages', id, 'chat'), {
      text: lock(text),
      // text,
      from: loggedUser,
      to: friend,
      createdAt: Timestamp.fromDate(new Date()),
      media: url || "",
    })
    await setDoc(doc(dataBase, 'lastMsg', id), {
      text: lock(text),
      // text,
      from: loggedUser,
      to: friend,
      createdAt: Timestamp.fromDate(new Date()),
      media: url || "",
      unread: true
    });
    setText('')
  }

  const setReveal = async () => {
    const userSnap = await getDoc(doc(dataBase, 'users', loggedUser));
    if (userSnap.data().reveal) {
      await updateDoc(doc(dataBase, 'users', loggedUser), { reveal: false });
    } else {
      await updateDoc(doc(dataBase, 'users', loggedUser), { reveal: true });
    }
  };


  return (
    <div className='home_container'>
      <div className='users_container'>
        {users.map((user) => (
        <User key={user.uid} user={user} selectUser={selectUser} loggedUser={loggedUser} chat={chat} status={status}/>
        ))}
      </div>
      <div className='messages_container'>
        {chat ? (
        <>
          <div className='messages_user'>
            <h3>{chat.name}</h3>
            {status ? <button className='reveal_btn' onClick={setReveal}>🔓</button> : <button className='reveal_btn' onClick={setReveal}>🔒</button>}
          </div>
          <div className='messages'>
            {msgs.length ? msgs.map((msg, i) => <Message key={i} msg={msg} loggedUser={loggedUser} status={status}/>) : null}
          </div>
          <CreateMessage handleSubmit={handleSubmit} text={text} setText={setText} setImg={setImg}/>
        </> 
        ) : ( 
        <h3 className='no_conv'>select a user to start conversation</h3> 
        )}
      </div>
    </div>
  )
}

export default Home
