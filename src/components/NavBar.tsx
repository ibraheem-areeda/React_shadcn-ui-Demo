import { userAtom } from "@/pages/Home";
import { useAtom } from "jotai";

const Navbar = () => {
  const [user] = useAtom(userAtom);

  const handelLogout = () => {
    localStorage.removeItem("userInfo");
  };

  return (
    <div className="h-12 text-red-500 p-4 flex items-center justify-between border-b-red-500 uppercase md:h-24 lg:px-10 xl:px-20 bg-slate-700">
      <div className=" hidden md:flex gap-4">
        <a href="/">Home Page</a>
        <a href="/about_us">Contact Us</a>
        {user ? <a>Welcome {user["name"]}</a> : <a>Please login</a>}
        <a href="/" onClick={handelLogout}>
          logout
        </a>
      </div>
      <div className=" text-xl md:font-bold flex-1 md:text-center"></div>
      <div className=" hidden md:flex gap-4 justify-end flex-1"></div>
    </div>
  );
};

export default Navbar;
