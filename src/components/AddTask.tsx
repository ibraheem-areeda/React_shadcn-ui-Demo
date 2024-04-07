import { Button } from "./ui/button";
import { Input } from "./ui/input";

type TaskProps = {
  taskInput: string;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleAddTask: () => void;
};

const AddTask = ({
  taskInput,
  handleInputChange,
  handleAddTask,
}: TaskProps) => {
  return (
    <div>
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
    </div>
  );
};

export default AddTask;
