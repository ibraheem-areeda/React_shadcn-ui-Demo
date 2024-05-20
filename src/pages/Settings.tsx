import Navbar from "@/components/NavBar";
import { userAtom } from "./Home";
import { atom, useAtom } from "jotai";
import { axiosJWT } from "@/axiosClient";

export const newPicture = atom(null);

const Settings = () => {
  const [user] = useAtom(userAtom);

  const [picture, setPicture] = useAtom(newPicture);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPicture(URL.createObjectURL(e.target.files[0]));
    const data = new FormData();
    data.append("image", e.target.files[0]);
    console.log(data);
    try {
      const responce = axiosJWT.post(
        `https://dev.api.portal.psi-crm.com/users/uploadUserProfileImage/${user?.id}`,
        data
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Navbar />
      <h1 className=" text-center pt-14 text-3xl">Profile Details</h1>
      <div className="flex justify-between mt-20 border-4 w-[40rem] mx-auto p-4">
        <div>
          <img
            src={picture ? picture : user?.profile_image?.urls.preview}
            className="w-72 h-72"
          />
          <input type="file" onChange={(e) => handleChange(e)} />
        </div>
        <div>
          <p>Name : {user?.name}</p>
          <p>Email : {user?.email}</p>
          <p>Phone : {user?.phone}</p>
          <p>Time Zone : {user?.timezone}</p>
          <p>Roles : {user?.name}</p>
          <p>Status : {user?.name}</p>
        </div>
      </div>
    </div>
  );
};

export default Settings;
