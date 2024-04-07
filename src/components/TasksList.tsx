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
import { tasksListAtom } from "./AddTask";
import { useAtom } from "jotai";
import React, { Children } from "react";

const TasksList = () => {
  const [tasksListData, settasksListAtom] = useAtom(tasksListAtom);

  const handleDelete = (index: number) => {
    const updatedTasksList = [...tasksListData];
    updatedTasksList.splice(index, 1);
    settasksListAtom(updatedTasksList);
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
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default TasksList;
