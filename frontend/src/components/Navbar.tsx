import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/index";
import { UserType } from "../../../shared/validations";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../store/userSlice";

const Navbar = () => {
  const userData: null | Record<"user", UserType> = useSelector(
    (store: RootState) => store.user
  );
  const dispatch = useDispatch()
  const handleLogout = async () => {
    try {
      await axios.get(BASE_URL + "/auth/logout",{withCredentials:true});
      dispatch(removeUser())
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="navbar bg-base-300">
      <div className="flex-1">
        <span className="w-10">
          <img src={logo} alt="logo" />
        </span>
        <a className="btn btn-ghost text-xl">Swag Coder</a>
      </div>
      <div>
        Welcome,&nbsp;
        <span className="text-white">{userData?.user?.firstName}</span>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end mx-5">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img alt="user-avatar" src={userData?.user?.photoUrl} />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-200 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link className="justify-between" to={"/profile"}>
                Profile
                <span className="badge">New</span>
              </Link>
            </li>
            <li>
              <a>
                Chat
                <span className="badge">Coming Soon</span>
              </a>
            </li>
            <li onClick={handleLogout}>
              <Link to={"/login"}>Logout</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
