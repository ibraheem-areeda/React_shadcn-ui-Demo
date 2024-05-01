import { atom, useSetAtom } from "jotai";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import React, { useState } from "react";

export type Todo = {
  id: string;
  name: string;
  status: boolean;
};

// eslint-disable-next-line react-refresh/only-export-components
export const tasksListAtom = atom<Todo[]>([]);

const AddTask = () => {
  const [taskInput, settaskInput] = useState("");
  const settasksListAtom = useSetAtom(tasksListAtom);

  const handleInputChange = (
    value: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    event: React.ChangeEvent<HTMLInputElement> | null = null
  ) => {
    settaskInput(value);
  };

  const handleAddTask = () => {
    if (taskInput.trim() !== "") {
      const taskId: string = uuidv4();
      // settasksListAtom([...tasksListData, { name: taskInput }]);
      settasksListAtom((prev) => [
        ...prev,
        { id: taskId, name: taskInput, status: true },
      ]);
      settaskInput("");
    }
  };

  return (
    <div>
      <h1 className=" text-center my-10 text-3xl">To Do List</h1>
      <Input
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            console.log("okkkkkk");
            handleAddTask();
          }
        }}
        className=" my-5 w-96 mx-auto"
        value={taskInput}
        onChange={(event) => handleInputChange(event.target.value)}
      />
      <div className="flex flex-col items-center">
        <Button onClick={handleAddTask} className="w-40">
          Add task
        </Button>
      </div>
    </div>
  );
};

export default AddTask;

function uuidv4(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
