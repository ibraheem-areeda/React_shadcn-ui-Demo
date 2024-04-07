import { atom, useAtom, useSetAtom } from "jotai";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export type Todo = {
  name: string;
};

// eslint-disable-next-line react-refresh/only-export-components
export const taskInputAtom = atom("");

// eslint-disable-next-line react-refresh/only-export-components
export const tasksListAtom = atom<Todo[]>([]);

const AddTask = () => {
  const [taskInput, settaskInputAtom] = useAtom(taskInputAtom);
  const settasksListAtom = useSetAtom(tasksListAtom);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    settaskInputAtom(event.target.value);
  };

  const handleAddTask = () => {
    if (taskInput.trim() !== "") {
      // settasksListAtom([...tasksListData, { name: taskInput }]);
      settasksListAtom((prev) => [...prev, { name: taskInput }]);
      settaskInputAtom("");
    }
  };

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
