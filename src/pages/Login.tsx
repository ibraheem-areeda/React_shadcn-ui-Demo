import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { userAtom } from "./Home";
import { useSetAtom } from "jotai";
import { User } from "@/types/User";

const Login = () => {
  const setUser = useSetAtom(userAtom);

  const handelUserChange = (userData: User) => {
    setUser(userData);
  };

  const formSchema = z.object({
    username: z.string().min(2).max(50),
    Password: z.string().min(6),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      Password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);

    try {
      const response = await axios.post("http://127.0.0.1:8000/auth/login", {
        username: values.username,
        password: values.Password,
      });

      handelUserChange(response.data);
    } catch (error) {
      console.error("Authentication failed:", error);
      localStorage.removeItem("token");
    }
  }

  return (
    <>
      <h1 className=" text-center text-6xl mt-40">Login</h1>
      <div className=" w-1/3 mx-auto mt-20">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Your Username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="Password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Your Password"
                      {...field}
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </>
  );
};

export default Login;
