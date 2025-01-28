import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button, Form, FormSection, InputField } from "@/components/ui";
import { cn } from "@/lib";
import { AxiosError } from "axios";
import { Fragment, useState } from "react";
import { useLogin } from "../../api";
import { Login, loginSchema } from "../../schema";

export const LoginForm = () => {
  const [errMessage, setErrMessage] = useState("");
  const { mutate: login } = useLogin({
    onError: (error: unknown) => {
      const axiosError = error as AxiosError;
      return setErrMessage(
        (axiosError?.response?.data as { message: string })?.message
      );
    },
  });

  const form = useForm<Login>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = form.handleSubmit((data) => {
    login(data);
  });

  return (
    <Fragment>
      <Form {...form}>
        <form onSubmit={handleSubmit}>
          <FormSection
            title="ავტორიზაცია"
            className="flex-col place-content-center gap-2"
          >
            <InputField
              form={form}
              label="ელ.ფოსტა"
              type="email"
              name="email"
            />
            <InputField
              form={form}
              label="პაროლი"
              type="password"
              name="password"
            />
          </FormSection>
          <Button className="w-full" type="submit">
            ავტორიზაცია
          </Button>
        </form>
      </Form>

      <div
        className={cn(
          " w-full h-10 rounded-md mt-4 px-4 flex items-center",
          errMessage ? "bg-red-100" : ""
        )}
      >
        <span className="text-red-700 text-sm">{errMessage}</span>
      </div>
    </Fragment>
  );
};
