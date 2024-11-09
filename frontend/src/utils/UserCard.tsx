/* eslint-disable @typescript-eslint/no-explicit-any */

import axios from "axios";
import { BASE_URL } from "./constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../store/feedSlice";

const UserCard = ({
  user,
  showOptions = true,
}: {
  user: any;
  showOptions?: boolean;
}) => {
  const dispatch = useDispatch();
  const handleStatus = async (status: string, _id: string) => {
    try {
      await axios.get(`${BASE_URL}/requests/send/${status}/${_id}`, {
        withCredentials: true,
      });
      dispatch(removeUserFromFeed(_id));
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="card bg-base-300 w-96 shadow-xl">
      <figure>
        <img
          src={user?.photoUrl}
          alt="profile"
          className="h-[45vh] bg-no-repeat bg-center bg-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{user?.firstName + " " + user?.lastName}</h2>
        {user?.age && user?.gender && <p>{user?.age + ", " + user?.gender}</p>}
        {user?.about && <p>{user?.about}</p>}
        {showOptions && (
          <div className="card-actions justify-center my-4">
            <button
              className="btn btn-primary"
              onClick={() => handleStatus("ignored", user._id)}
            >
              Ignore
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => handleStatus("interested", user._id)}
            >
              Interested
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCard;
