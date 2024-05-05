import { userAtom } from "@/pages/Home";
import { useAtom } from "jotai";
import { Switch } from "./ui/switch";
import { atomWithStorage } from "jotai/utils";
import { useEffect } from "react";

export const darkModeAtom = atomWithStorage("darkMode", false);

const Navbar = () => {
  const [user] = useAtom(userAtom);
  const [darkMode, setDarkMode] = useAtom(darkModeAtom);

  const handelLogout = () => {
    localStorage.removeItem("userInfo");
  };

  const gettheme = () => {
    const darkMoodInLocalStorage: string | null =
      localStorage.getItem("darkMode");

    if (darkMoodInLocalStorage !== null) {
      const theme: boolean | null = JSON.parse(darkMoodInLocalStorage);

      if (theme) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  };

  useEffect(() => {
    gettheme();
  }, [darkMode]);

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
      <div className="flex gap-2">
        <span>chanege mode</span>
        <Switch
          defaultChecked={false}
          onCheckedChange={() => setDarkMode(!darkMode)}
        />
      </div>
    </div>
  );
};

export default Navbar;
