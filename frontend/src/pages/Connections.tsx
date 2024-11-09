/* eslint-disable @typescript-eslint/no-explicit-any */
import useConnections from "../hooks/useConnections";

const Connections = () => {
  const connections: any = useConnections();

  if (!connections) return;

  if (!connections.length)
    return (
      <div className="font-semibold text-2xl my-10 text-center">
        No Connections Found!
      </div>
    );
  return (
    <div className="flex flex-col justify-center my-10">
      <div className="font-semibold text-2xl text-center">connections</div>
      <div>

      {connections.map((connection: any) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about } =
          connection;

        return (
          <div
            key={_id}
            className=" flex m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto"
          >
            <div>
              <img
                alt="photo"
                className="w-20 h-20 rounded-full object-cover"
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
          </div>
        );
      })}
      </div>
    </div>
  );
};

export default Connections;
