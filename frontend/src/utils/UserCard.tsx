/* eslint-disable @typescript-eslint/no-explicit-any */

const UserCard = ({
  user,
  showOptions = true,
  
}: {
  user: any;
  showOptions: boolean;
}) => {
  return (
    <div className="card bg-base-300 w-96 shadow-xl">
      <figure>
        <img src={user?.photoUrl} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{user?.firstName + " " + user?.lastName}</h2>
        {user?.age && user?.gender && <p>{user?.age + ", " + user?.gender}</p>}
        {user?.about && <p>{user?.about}</p>}
        {showOptions && (
          <div className="card-actions justify-center my-4">
            <button className="btn btn-primary">Ignore</button>
            <button className="btn btn-secondary">Interested</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCard;
