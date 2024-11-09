/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import useRequests from "../hooks/useRequests";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeRequest } from "../store/requestSlice";

const Requests = () => {
  const requests: any = useRequests();
  const dispatch = useDispatch()

  const reviewRequest = async (status:string, _id:string) => {
    try {
      await axios.post(
        BASE_URL + "/requests/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (err) {
      console.log(err)
    }
  };

  if (!requests) return;

  if (!requests.length)
    return (
      <div className="font-semibold text-2xl my-10 text-center">
        No requests Found!
      </div>
    );
  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-white text-3xl">Connection Requests</h1>

      {requests.map((request:any) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about } =
          request.fromUserId;

        return (
          <div
            key={_id}
            className="w-2/6 flex justify-between items-center m-4 p-4 rounded-lg bg-base-300  mx-auto"
          >
            <div>
              <img
                alt="photo"
                className="w-20 h-20 rounded-full"
                src={photoUrl}
              />
            </div>
            <div className="text-left mx-4 ">
              <h2 className="font-bold text-xl">
                {firstName + " " + lastName}
              </h2>
              {age && gender && <p>{age + ", " + gender}</p>}
              <p>{about}</p>
            </div>
            <div className="flex">
              <button
                className="btn btn-primary mx-2"
                onClick={() => reviewRequest("rejected", request._id)}
              >
                Reject
              </button>
              <button
                className="btn btn-secondary mx-2"
                onClick={() => reviewRequest("accepted", request._id)}
              >
                Accept
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
