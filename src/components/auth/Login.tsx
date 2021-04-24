import { Button, Grid, Paper, Typography } from "@material-ui/core";
import { observer } from "mobx-react";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import styled from "styled-components";
import TextFieldC from "../../componentsReusable/Forms";
import { AuthStoreContext } from "../../stores/AuthStore";
import { mainTheme } from "../../style/config";

const PaperStyled = styled(Paper)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${mainTheme.palette.primary.main};
  padding: 50px;
`;

type TLoginForm = {
  email: string;
  password: string;
};

export interface LoginProps {}

const Login: React.FC<LoginProps> = observer(() => {
  const authStore = useContext(AuthStoreContext);
  const router = useHistory();
  const { register, handleSubmit } = useForm<TLoginForm>();

  const [wrongCredentials, setWrongCredentials] = useState<boolean>(false);

  const onSubmit = async (data: TLoginForm) => {
    await authStore.logIn({
      email: data.email,
      password: data.password,
      failureCallBack: () => {
        setWrongCredentials(true);
      },
    });
  };

  if (authStore.isLoggedIn) {
    router.push("/");
  }

  return (
    <PaperStyled>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container direction="column" spacing={5} alignItems="center">
          <Grid item>
            <TextFieldC
              inputRef={register({
                required: "Email is required",
              })}
              name="email"
              label="email"
            />
          </Grid>
          <Grid item>
            <TextFieldC
              inputRef={register({
                required: "Password is required",
              })}
              name="password"
              type="password"
              label="password"
            />
          </Grid>
          <Grid item>
            <Button variant="outlined" color="secondary" type="submit">
              Login
            </Button>
          </Grid>
          <Grid item>
            <Typography color="error">
              {wrongCredentials ? "Wrong email or password" : "no"}
            </Typography>
          </Grid>
        </Grid>
      </form>
    </PaperStyled>
  );
});

export default Login;
