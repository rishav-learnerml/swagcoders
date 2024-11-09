/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addConnections, removeConnections } from "../store/connectionSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useConnections = () => {
  const connections = useSelector((store: RootState) => store.connections);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchConnections = async () => {
    try {
      const response = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(response.data.data));
      
    } catch (error: any) {
      if (error.response?.status === 401) {
      
        dispatch(removeConnections());
        navigate("/login");
      }
      console.log(error);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  return connections;
};

export default useConnections;
