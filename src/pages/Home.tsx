/* eslint-disable @typescript-eslint/no-unused-vars */
import Navbar from "@/components/NavBar";
import AddTask from "@/components/AddTask";
import TasksList from "@/components/TasksList";

const Home = () => {
  return (
    <>
      <Navbar />
      <AddTask />
      <TasksList />
    </>
  );
};

export default Home;
