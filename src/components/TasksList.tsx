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
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const TasksList = () => {
  const [tasksListData, settasksListAtom] = useAtom(tasksListAtom);
  const [updateTask, setUpdateTask] = useState<Todo | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUpdateTask((prevState) => {
      if (!prevState) return null;
      return {
        ...prevState,
        name: event.target.value,
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
  };

  const handleDiscard = () => {
    setUpdateTask(null);
  };

  const openEditFeild = (task: Todo) => {
    setUpdateTask(task);
  };

  const handleSelectChange = (value: "Pending" | "Active" | "Not active") => {
    setUpdateTask((prevState) => {
      if (!prevState) return null;
      return {
        ...prevState,
        status: value,
      };
    });
  };

  // SHALOW COPY

  // const handleStateChange = (task: Todo) => {
  //   task.status = !task.status;
  //   const index: number = tasksListData.findIndex(
  //     (todo) => todo.id == task?.id
  //   );
  //   if (task) {
  //     settasksListAtom((prev) => {
  //       const prevCopy = [...prev];
  //       prevCopy[index] = task;
  //       return prevCopy;
  //     });
  //   }
  //   console.log(tasksListData);
  // };

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

  const getBadgetVariant = (status: "Pending" | "Active" | "Not active") => {
    switch (status) {
      case "Pending":
        return "pending";

      case "Active":
        return "active";

      case "Not active":
        return "notActive";

      default:
        return "default";
    }
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
                      value={updateTask.name}
                      onChange={(e) => handleInputChange(e)}
                    />

                    <div className="flex gap-2 items-center">
                      <Select
                        value={updateTask.status}
                        onValueChange={(
                          value: "Pending" | "Active" | "Not active"
                        ) => handleSelectChange(value)}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select value" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Pending">Pending</SelectItem>
                          <SelectItem value="Active">Active</SelectItem>
                          <SelectItem value="Not active">Not active</SelectItem>
                        </SelectContent>
                      </Select>
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
                        <Badge variant={getBadgetVariant(task.status)}>
                          {task.status}
                        </Badge>
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
