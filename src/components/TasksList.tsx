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
import { Switch } from "@/components/ui/switch";

const TasksList = () => {
  const [tasksListData, settasksListAtom] = useAtom(tasksListAtom);
  const [updateTask, setUpdateTask] = useState<Todo | null>(null);
  const [inputChange, setInputchange] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputchange(event.target.value);

    setUpdateTask((prevState) => {
      if (!prevState) return null;
      return {
        ...prevState,
        name: inputChange,
      };
    });
  };

  const handleDelete = (index: number) => {
    const updatedTasksList = [...tasksListData];
    updatedTasksList.splice(index, 1);
    settasksListAtom(updatedTasksList);
  };

  const saveEdit = () => {
    const index: number = tasksListData.findIndex(
      (todo) => todo.id == updateTask?.id
    );
    if (updateTask) {
      tasksListData.splice(index, 1, updateTask);
      settasksListAtom(tasksListData);
    }
    setUpdateTask(null);
    setInputchange("");
  };

  const handleDiscard = () => {
    setUpdateTask(null);
    setInputchange("");
  };

  const openEditFeild = (task: Todo) => {
    setUpdateTask(task);
    setInputchange(task.name);
  };

  const handelUpdateswitch = () => {
    setUpdateTask((prevState) => {
      if (!prevState) return null;
      return {
        ...prevState,
        status: !prevState.status,
      };
    });
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
                      <p>Change State</p>
                      <Switch
                        checked={updateTask.status}
                        onCheckedChange={handelUpdateswitch}
                      />
                      <span className=" cursor-pointer">
                        <CheckIcon className=" size-5" onClick={saveEdit} />
                      </span>
                      <span className=" cursor-pointer" onClick={handleDiscard}>
                        <XIcon className=" size-5" />
                      </span>
                    </div>
                  </div>
                ) : (
                  <TableCell className="font-medium">
                    <div className="flex gap-2">
                      <div className="flex-1">{task.name}</div>
                      <div className="flex-1">
                        <div className=" inline-block bg-slate-400 py-2 min-w-24 rounded-lg">
                          {task.status ? (
                            <p className=" text-center">Active</p>
                          ) : (
                            <p className=" text-center">Not Active</p>
                          )}
                        </div>
                      </div>
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
