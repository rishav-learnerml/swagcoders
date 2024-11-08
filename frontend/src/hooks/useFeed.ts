/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addFeed } from "../store/feedSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const useFeed = () => {
  const [feedData, setFeedData] = useState(null);
  const feed = useSelector((store: RootState) => store.feed);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchFeed = async () => {
    if (feed) {
      setFeedData(feed);
      return;
    }
    try {
      const response = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(response.data.users));
      setFeedData(response.data.users);
    } catch (error: any) {
      if (error.status === 401) {
        navigate("/login");
        setFeedData(null);
      }
      console.log(error);
    }
  };
  useEffect(() => {
    (async () => {
      await fetchFeed();
      return feedData;
    })();
  }, []);
};

export default useFeed;
