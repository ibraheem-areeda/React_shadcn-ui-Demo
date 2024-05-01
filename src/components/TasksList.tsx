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
import { Badge } from "@/components/ui/badge";

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
    console.log(tasksListData);
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
  const handleStateChangeFromSwitch = () => {
    setUpdateTask((prev: Todo | null) => {
      if (prev) {
        return { ...prev, status: !prev.status };
      } else {
        return null; // Return null if prev is null
      }
    });
  };

  // SHALOW COPY
  const handleStateChange = (task: Todo) => {
    task.status = !task.status;
    const index: number = tasksListData.findIndex(
      (todo) => todo.id == task?.id
    );
    if (task) {
      // tasksListData.splice(index, 1, task);
      settasksListAtom((prev) => {
        const prevCopy = [...prev];
        prevCopy[index] = task;
        return prevCopy;
      });
    }
    console.log(tasksListData);
  };
  // DEEP COPY
  // const handleStateChange = (task: Todo) => {
  //   task.status = !task.status;
  //   const index: number = tasksListData.findIndex(
  //     (todo) => todo.id == task?.id
  //   );
  //   if (task) {
  //     // tasksListData.splice(index, 1, task);
  //     settasksListAtom((prev) => {
  //       const prevCopy = JSON.parse(JSON.stringify(prev));
  //       prevCopy[index] = task;
  //       return prevCopy;
  //     });
  //   }
  // };

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
                        onCheckedChange={() => handleStateChangeFromSwitch()}
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
                        <span
                          className=" cursor-pointer"
                          onClick={() => handleStateChange(task)}
                        >
                          {task.status ? (
                            <Badge
                              variant="outline"
                              className=" bg-green-500 text-white min-w-24 justify-center"
                            >
                              Active
                            </Badge>
                          ) : (
                            <Badge
                              variant="outline"
                              className=" bg-red-600 text-white  min-w-24 justify-center"
                            >
                              Not Active
                            </Badge>
                          )}
                        </span>
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
