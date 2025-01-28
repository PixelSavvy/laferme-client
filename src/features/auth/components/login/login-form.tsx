import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button, Form, FormSection, InputField } from "@/components/ui";
import { useLogin } from "../../api";
import { Login, loginSchema } from "../../schema";

export const LoginForm = () => {
  const { mutate: login } = useLogin();
  const form = useForm<Login>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const submitHandler = form.handleSubmit((data) => {
    login(data);
  });

  return (
    <Form {...form}>
      <form onSubmit={submitHandler}>
        <FormSection
          title="ავტორიზაცია"
          className="flex-col place-content-center gap-2"
        >
          <InputField form={form} label="ელ.ფოსტა" type="email" name="email" />
          <InputField
            form={form}
            label="პაროლი"
            type="password"
            name="password"
          />
          <Button className="w-full" type="submit">
            ავტორიზაცია
          </Button>
        </FormSection>
      </form>
    </Form>
  );
};
