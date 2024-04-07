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
import { Todo } from "@/pages/Home";

type TaskListProps = {
  handleDelete: (index: number) => void;
  tasksListData: Todo[];
};

const TasksList = ({ handleDelete, tasksListData }: TaskListProps) => {
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
          {tasksListData.map((task, index) => (
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
    </div>
  );
};

export default TasksList;
