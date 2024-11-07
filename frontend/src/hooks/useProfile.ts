/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../store/userSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useProfile = () => {
  const user = useSelector((store: RootState) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchUser = async () => {
    if (user) return;
    try {
      const response = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(response.data));
    } catch (error: any) {
      if (error.status === 401) {
        navigate("/login");
      }
      console.log(error);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);
};

export default useProfile;
