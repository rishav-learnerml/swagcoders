/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addRequests, removeRequests } from "../store/requestSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useRequests = () => {
  const requests = useSelector((store: RootState) => store.requests);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchRequests = async () => {
    try {
      const response = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(response.data.data));
    } catch (error: any) {
      if (error.response?.status === 401) {
        dispatch(removeRequests());
        navigate("/login");
      }
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return requests;
};

export default useRequests;
