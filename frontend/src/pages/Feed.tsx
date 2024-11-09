/* eslint-disable @typescript-eslint/no-explicit-any */
import useFeed from "../hooks/useFeed";
import UserCard from "../utils/UserCard";

const Feed = () => {
  const feed: any = useFeed();
  console.log(feed, "feed");
  if (!feed) return;
  if (feed.length <= 0)
    return (
      <div className="font-semibold text-2xl mx-auto text-center flex justify-center my-10">
        No new users found!
      </div>
    );
  return (
    <div className="flex justify-center my-5 overflow-auto max-h-screen">
        <UserCard user={feed[0]} />
    </div>
  );
};

export default Feed;
