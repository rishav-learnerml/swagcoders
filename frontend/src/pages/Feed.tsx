/* eslint-disable @typescript-eslint/no-explicit-any */
import useFeed from "../hooks/useFeed";
import UserCard from "../utils/UserCard";

const Feed = () => {
  const feed: any = useFeed();
  if(!feed)return;
  return (
    <div className="flex justify-center my-5 overflow-auto max-h-screen">
      {feed.map((item: any) => (
        <UserCard user={item} />
      ))}
    </div>
  );
};

export default Feed;
