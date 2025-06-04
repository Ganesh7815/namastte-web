import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { removeUser } from '../utils/userSlice';
import BASE_URL from '../utils/constant';

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const nav = useNavigate();

  useEffect(() => {
    if (user) {
    }
  }, [user]);

  const logouthandler = async () => {
    await axios.post(BASE_URL+"/logout", {}, { withCredentials: true });
    dispatch(removeUser());
    nav("/login");
  };

  return (
    <div className="navbar bg-base-300 p-4 rounded-xl">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">Dev Match👩‍💻</Link>
      </div>
      <div className="flex gap-2">
        {user && (
          <div className="dropdown dropdown-end mx-6">
            <div className="flex items-center justify-between gap-8">
              <div>Welcome {user.firstName}</div>
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Profile"
                    src={user.photoUrl}
                  />
                </div>
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="justify-between">Profile</Link>
              </li>
              <li>
                <Link to="/Connections">Connections</Link>
              </li>
               <li>
                <Link to="/requests">Requests</Link>
              </li>
              <li>
                <a onClick={logouthandler}>Logout</a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
