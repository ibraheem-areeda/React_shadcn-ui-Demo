import { userAtom } from "@/pages/Home";
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { newPicture } from "@/pages/Settings";

export const themeModeAtom = atomWithStorage("themeMode", "");

const Navbar = () => {
  const [user] = useAtom(userAtom);
  const [themeMode, setthemeMode] = useAtom(themeModeAtom);
  const [picture] = useAtom(newPicture);

  const handelLogout = () => {
    localStorage.removeItem("userInfo");
    window.location.reload();
  };

  const gettheme = () => {
    const darkMoodInLocalStorage: string | null =
      localStorage.getItem("themeMode");

    if (darkMoodInLocalStorage !== null) {
      const theme: string | null = JSON.parse(darkMoodInLocalStorage);

      switch (theme) {
        case "dark":
          return document.documentElement.classList.add("dark");
        case "light":
          return document.documentElement.classList.remove("dark");
        case "system":
          if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            return document.documentElement.classList.add("dark");
          }
          if (window.matchMedia("(prefers-color-scheme: light)").matches) {
            return document.documentElement.classList.remove("dark");
          }
          break;
        default:
          return document.documentElement.classList.remove("dark");
      }
    }
  };

  useEffect(() => {
    gettheme();
  }, [themeMode]);

  return (
    <div className="h-12 text-red-500 p-4 flex items-center justify-between border-b-red-500 uppercase md:h-24 lg:px-10 xl:px-20 bg-slate-700 dark:bg-slate-50">
      <div className=" hidden md:flex gap-4">
        <a href="/">Home Page</a>
        <a href="/about_us">Contact Us</a>
        {user ? <a>Welcome {user["name"]}</a> : <a>Please login</a>}
        <a href="/" onClick={handelLogout}>
          logout
        </a>
      </div>
      <div className="flex gap-5 items-center">
        <span>chanege mode</span>
        <Select
          value={themeMode}
          onValueChange={(value) => setthemeMode(value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select value" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>

        <Menubar>
          <MenubarMenu>
            <MenubarTrigger className=" border-none bg-none p-0 cursor-pointer">
              <img
                src={picture ? picture : user?.profile_image?.urls.thumb}
                alt="profile pic"
                className="w-10 h-10 p-0  rounded-sm"
              />
            </MenubarTrigger>
            <MenubarContent>
              <MenubarItem className=" hover:bg-none hover:cursor-text">
                <div className="flex flex-col">
                  <p className="text-slate-400">Signed in as</p>
                  <p>{user?.name}</p>
                  <p className="text-slate-400">{user?.email}</p>
                </div>
              </MenubarItem>
              <MenubarSeparator />

              <a href="/settings">
                <MenubarItem className="cursor-pointer">settings</MenubarItem>
              </a>

              <MenubarSeparator />
              <a onClick={handelLogout}>
                <MenubarItem className="cursor-pointer">sign out</MenubarItem>
              </a>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>
    </div>
  );
};

export default Navbar;
