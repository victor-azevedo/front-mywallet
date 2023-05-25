import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

import formStyle from "../../assets/styles/formStyle";
import pageStyle from "../../assets/styles/pageStyle";
import Button from "../../components/Button";
import Input from "../../components/Input";
import noAuthPageWrapper from "../../hoc/noAuthPageWrapper-hoc";
import useAuth from "../../hooks/useAuth-hook";
import { api } from "../../services/api-service";

const SignInPage = function () {
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  function handleForm(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  function login(e) {
    e.preventDefault();
    setIsLoading(true);
    const body = { ...form };
    api
      .post("/auth/sign-in", body)
      .then((res) => {
        signIn(res.data.token);
        setForm({
          email: "",
          password: "",
        });
        setIsLoading(false);
        navigate("/");
      })
      .catch((err) => {
        if (err.response.data.message) {
          alert(err.response.data.message);
        } else {
          alert(err.response.data);
        }
        setIsLoading(false);
      });
  }

  return (
    <SignInStyled>
      <h1>My Wallet</h1>
      <form onSubmit={login}>
        <Input
          name="email"
          value={form.email}
          onChange={handleForm}
          type="email"
          label="E-mail"
          placeholder="E-mail"
          disabled={isLoading}
          required
        />
        <Input
          name="password"
          value={form.password}
          onChange={handleForm}
          type="password"
          label="Senha"
          placeholder="Senha"
          disabled={isLoading}
          minLength="6"
          maxLength="12"
          required
        />
        <Button className="btn" type="submit" disabled={isLoading}>
          Entrar
        </Button>
      </form>
      <Link to="/sign-up">
        <p className="text-accent">Primeira vez? Cadastre-se!</p>
      </Link>
    </SignInStyled>
  );
};

export default noAuthPageWrapper(SignInPage);

const SignInStyled = styled.main`
  ${pageStyle};
  h1 {
    color: #fff;
    font-size: 32px;
    font-family: "Saira Stencil One";
  }
  form {
    ${formStyle};
  }
  p {
    color: #fff;
    margin-top: 20px;
    font-family: "Raleway";
    font-weight: 700;
    font-size: 15px;
    line-height: 18px;
  }
`;
