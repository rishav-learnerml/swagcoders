/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux"
import EditProfile from "../components/EditProfile"
import { RootState } from "../store"

const Profile = () => {
    const user:any = useSelector((store:RootState)=>store.user)
    if(!user)return;
  return (
    <div><EditProfile user={user.user}/></div>
  )
}

export default Profile