import { atom, useAtom, useSetAtom } from "jotai";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export type Todo = {
  id: string;
  name: string;
  status: boolean;
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
      const taskId: string = uuidv4();
      // settasksListAtom([...tasksListData, { name: taskInput }]);
      settasksListAtom((prev) => [
        ...prev,
        { id: taskId, name: taskInput, status: true },
      ]);
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

function uuidv4(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
