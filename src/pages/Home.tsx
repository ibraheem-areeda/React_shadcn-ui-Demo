/* eslint-disable @typescript-eslint/no-unused-vars */
import Navbar from "@/components/NavBar";
import { useState } from "react";
import AddTask from "@/components/AddTask";
import TasksList from "@/components/TasksList";

// import { atom, useAtom } from 'jotai';

// const counter = atom(0);

export type Todo = {
  name: string;
};

const Home = () => {
  const [tasksListData, setTasksList] = useState<Todo[]>([]);
  const [taskInput, setTaskInput] = useState("");

  const handleAddTask = () => {
    if (taskInput.trim() !== "") {
      setTasksList([...tasksListData, { name: taskInput }]);
      setTaskInput("");
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskInput(event.target.value);
  };

  const handleDelete = (index: number) => {
    const updatedTasksList = [...tasksListData];
    updatedTasksList.splice(index, 1);
    setTasksList(updatedTasksList);
  };

  return (
    <>
      <Navbar />
      <AddTask
        taskInput={taskInput}
        handleInputChange={handleInputChange}
        handleAddTask={handleAddTask}
      />
      <TasksList tasksListData={tasksListData} handleDelete={handleDelete} />
    </>
  );
};

export default Home;
