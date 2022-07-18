import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { auth, dataBase } from '../firebase';
import { signOut } from 'firebase/auth'
import { updateDoc, doc } from 'firebase/firestore';
import { AuthData } from '../context/auth'
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthData);
    const performSignOut = async () => {
        await updateDoc(doc(dataBase, 'users', auth.currentUser.uid), {
            isOnline: false,
        });
        await signOut(auth);
        navigate("/login");
    };
  return (
    <nav>
        <h3>
            <Link to="/">EncrypText Messenger 🔐</Link>
        </h3>
        <div>
            {user ? (
              <>
                <Link to="/account">My account</Link>
                <button className="btn" onClick={performSignOut}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/register">Register</Link>
                <Link to="/login">Login</Link>
              </>
            )}
        </div>
    </nav>
  )
}

export default Navbar