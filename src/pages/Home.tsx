/* eslint-disable @typescript-eslint/no-unused-vars */
import Navbar from "@/components/NavBar";
import AddTask from "@/components/AddTask";
import TasksList from "@/components/TasksList";
import { axiosJWT } from "@/axiosClient";
import { User } from "@/types/User";
import { atomWithStorage } from "jotai/utils";
import { useEffect, useState } from "react";
import { useAtom, useSetAtom } from "jotai";

const userLocalstorage = localStorage.getItem("userInfo");

export const userAtom = atomWithStorage<User | undefined>(
  "userInfo",
  userLocalstorage ? JSON.parse(userLocalstorage) : undefined
);

const Home = () => {
  const [user, setUser] = useAtom(userAtom);
  const localStorageData: User = userLocalstorage
    ? JSON.parse(userLocalstorage)
    : undefined;

  const [isLoading, setIsLoading] = useState<boolean>();

  const currentUser = async () => {
    try {
      const response = await axiosJWT.get(
        "http://127.0.0.1:8000/auth/currentUser"
      );
      if (localStorageData?.access_token && localStorageData.refresh_token) {
        setUser({
          ...response.data,
          access_token: localStorageData.access_token,
          refresh_token: localStorageData.refresh_token,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getAllTasks = async () => {
    try {
      const responce = await axiosJWT.get("http://127.0.0.1:8000/task/all");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    currentUser();
    getAllTasks();
  }, []);

  return (
    <>
      <Navbar />
      <AddTask />
      <TasksList />
    </>
  );
};

export default Home;
