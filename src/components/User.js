import React, { useEffect, useState } from 'react'
import Img from '../pages/pfp.jpeg'
import { dataBase } from '../firebase';
import { onSnapshot, doc } from 'firebase/firestore';
import { unlock } from '../aes/Decrypt';

const User = ({ loggedUser, user, selectUser, chat, status }) => {
  const other = user?.uid;
  const [data, setData] = useState('');
  useEffect(() => {
    const id = loggedUser > other ? `${loggedUser+other}` : `${other+loggedUser}`
    let unsub = onSnapshot(doc(dataBase, 'lastMsg', id), doc => {
      setData(doc.data());
    });
    return () => unsub();
  }, []);

  return (
    <>
      <div className={`user_wrapper ${chat.name === user.name && "selected_user"}`} 
      onClick={() => selectUser(user)}
        >
        <div className='user_info'>
          <div className='user_detail'>
              <img src={Img} alt='avatar' className='avatar' />
              <h4>{user.name}</h4>
              {data?.from !== loggedUser && data?.unread && 
              <small className='unread'>New</small>}
          </div>
          <div 
          className={`user_status ${user.isOnline ? 'online' : 'offline'}`}>
          </div>
        </div>
        {data &&(
          <p className='shorten'>
            <strong>{data.from===loggedUser ? 'me:' : null}</strong>
            {status ? unlock(data.text) : data.text}
          </p>
        )}
      </div>
      <div 
        onClick={() => selectUser(user)} 
        className={`sm_container ${chat.name === user.name && "selected_user"}`}
      >
        <img src={Img} alt="avatar" className="avatar sm_screen"/>
      </div>
    </>
  )
}

export default User