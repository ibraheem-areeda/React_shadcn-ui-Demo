/* eslint-disable @typescript-eslint/no-unused-vars */
import Navbar from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RiDeleteBin5Line } from "react-icons/ri";

type Todo = {
  name: string;
};

const Home = () => {
  const [tasksList, setTasksList] = useState<Todo[]>([]);
  const [taskInput, setTaskInput] = useState("");

  const handleAddTask = () => {
    if (taskInput.trim() !== "") {
      setTasksList([...tasksList, { name: taskInput }]);
      setTaskInput("");
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskInput(event.target.value);
  };

  const handleDelete = (index: number) => {
    const updatedTasksList = [...tasksList];
    updatedTasksList.splice(index, 1);
    setTasksList(updatedTasksList);
  };

  return (
    <>
      <Navbar />
      <h1 className=" text-center my-10 text-3xl">To Do List</h1>
      <Input
        className=" my-5 w-96 mx-auto"
        value={taskInput}
        onChange={handleInputChange}
      />
      <div className="flex flex-col items-center">
        <Button onClick={handleAddTask} className="w-40">
          Add task
        </Button>
      </div>
      {/* -------------- */}
      <Table className=" w-1/3 mx-auto">
        <TableCaption>A list of your tasks</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Task</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasksList.map((task, index) => (
            <>
              <TableRow>
                <TableCell className="font-medium">
                  {task.name}
                  <span
                    className=" float-right cursor-pointer"
                    onClick={() => handleDelete(index)}
                  >
                    <RiDeleteBin5Line />
                  </span>
                </TableCell>
              </TableRow>
            </>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default Home;
