/* eslint-disable @typescript-eslint/no-unused-vars */
import Navbar from "@/components/NavBar";
import AddTask from "@/components/AddTask";
import TasksList from "@/components/TasksList";
import { atom, useAtom } from "jotai";

const tasksListAtom = atom<Todo[]>([]);
const taskInputAtom = atom("");

export type Todo = {
  name: string;
};

const Home = () => {
  const [tasksListData, settasksListAtom] = useAtom(tasksListAtom);
  const [taskInput, settaskInputAtom] = useAtom(taskInputAtom);

  const handleAddTask = () => {
    if (taskInput.trim() !== "") {
      settasksListAtom([...tasksListData, { name: taskInput }]);
      settaskInputAtom("");
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    settaskInputAtom(event.target.value);
  };

  const handleDelete = (index: number) => {
    const updatedTasksList = [...tasksListData];
    updatedTasksList.splice(index, 1);
    settasksListAtom(updatedTasksList);
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
