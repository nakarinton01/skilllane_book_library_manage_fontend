import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Row } from "antd";
import TextError from "components/TextError";
import { useForm } from "react-hook-form";
import { useAuth } from "src/hook/useLogin";
import useAuthorization from "store/AuthStore";
import z from "zod";

const loginValidateSchema = z.object({
  username: z.string().nonempty({ message: "username is invalid" }),
  password: z.string().nonempty({ message: "Password is required" }),
});

type LoginForm = z.infer<typeof loginValidateSchema>;

export default function LoginPage() {
  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginValidateSchema),
  });

  const setAuthToken = useAuthorization((state) => state.setAuth);

  const { submitLogin } = useAuth();

  const login = async (form: LoginForm) => {
    const response = await submitLogin(form);
    setAuthToken({
      accessToken: response.accessToken,
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(login)}>
        <Row style={{ marginBottom: "24px" }}>
          <h4>Username</h4>
          <Input
            placeholder="username"
            onChange={(e) => {
              setValue("username", e.target.value);
            }}
          />

          <TextError message={errors.username?.message} />
        </Row>
        <Row style={{ marginBottom: "24px" }}>
          <h4>password</h4>
          <Input
            type="password"
            placeholder="password"
            onChange={(e) => {
              setValue("password", e.target.value);
            }}
          />
          <TextError message={errors.password?.message} />
        </Row>
        <Row style={{ marginTop: "36px" }}>
          <Button type="primary" htmlType="submit">
            Update
          </Button>
        </Row>
      </form>
    </>
  );
}
