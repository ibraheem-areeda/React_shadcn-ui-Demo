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
import { Todo, tasksListAtom } from "./AddTask";
import { useAtom } from "jotai";
import React, { Children, useState } from "react";
import { Input } from "./ui/input";
import { CheckIcon, PenIcon, XIcon } from "lucide-react";

const TasksList = () => {
  const [tasksListData, settasksListAtom] = useAtom(tasksListAtom);
  const [updateTask, setUpdateTask] = useState<Todo | null>(null);
  const [inputChange, setInputchange] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputchange(event.target.value);
  };

  const handleDelete = (index: number) => {
    const updatedTasksList = [...tasksListData];
    updatedTasksList.splice(index, 1);
    settasksListAtom(updatedTasksList);
  };

  const handledit = (Value: Todo) => {
    const index: number = tasksListData.findIndex(
      (todo) => todo.id == Value.id
    );
    console.log(index);
    Value.name = inputChange;
    tasksListData.splice(index, 1, Value);
    () => {
      settasksListAtom(tasksListData);
    };
    console.log(77777777, inputChange);
    setUpdateTask(null);
    setInputchange("");
  };
  console.log(tasksListData);

  const handleDiscard = (task: Todo) => {
    setUpdateTask(null);
    setInputchange("");
    console.log(8888888888, task.name);
  };

  const openEditFeild = (task: Todo) => {
    setUpdateTask(task);
    setInputchange(task.name);
  };

  return (
    <div>
      <Table className=" w-1/3 mx-auto">
        <TableCaption>A list of your tasks</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Task</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Children.toArray(
            tasksListData.map((task, index) => (
              <TableRow>
                {updateTask?.id == task.id ? (
                  <div className=" flex flex-row gap-2">
                    <Input
                      value={inputChange}
                      onChange={(e) => handleInputChange(e)}
                    />
                    <div className="flex gap-2 items-center">
                      <span className=" cursor-pointer">
                        <CheckIcon
                          className=" size-5"
                          onClick={() => handledit(task)}
                        />
                      </span>
                      <span
                        className=" cursor-pointer"
                        onClick={() => handleDiscard(task)}
                      >
                        <XIcon className=" size-5" />
                      </span>
                    </div>
                  </div>
                ) : (
                  <TableCell className="font-medium">
                    <div className="flex gap-2">
                      <div className="flex-1">{task.name}</div>
                      <div className="flex gap-2">
                        <span
                          className="cursor-pointer"
                          onClick={() => handleDelete(index)}
                        >
                          <RiDeleteBin5Line />
                        </span>

                        <span
                          className=" cursor-pointer"
                          onClick={() => openEditFeild(task)}
                        >
                          <PenIcon className="h-4 w-4" />
                        </span>
                      </div>
                    </div>
                  </TableCell>
                )}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default TasksList;
