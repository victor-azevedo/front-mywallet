import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import formStyle from "../../assets/styles/formStyle";
import pageStyle from "../../assets/styles/pageStyle";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Redirect from "../../components/Redirect";
import noAuthPageWrapper from "../../hoc/noAuthPageWrapper-hoc";
import { api } from "../../services/api-service";

const SignUpPage = function () {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  function handleForm(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  function register(e) {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("As senhas devem ser iguais");
      return;
    }
    setIsLoading(true);
    const body = { ...form };
    api
      .post("/auth/sign-up", body)
      .then((res) => {
        setForm({
          email: "",
          name: "",
          image: "",
          password: "",
        });
        setIsLoading(false);
        navigate("/sign-in");
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
    <SignUpStyled>
      <h1>My Wallet</h1>
      <form onSubmit={register}>
        <Input
          name="username"
          label="Nome"
          value={form.username}
          onChange={handleForm}
          type="username"
          minLength={3}
          maxLength={20}
          placeholder="Nome"
          disabled={isLoading}
          required
        />
        <Input
          name="email"
          label="E-mail"
          value={form.email}
          onChange={handleForm}
          type="email"
          placeholder="E-mail"
          disabled={isLoading}
          required
        />
        <Input
          name="password"
          label="Senha"
          value={form.password}
          onChange={handleForm}
          type="password"
          minLength={6}
          maxLength={12}
          placeholder="Senha"
          disabled={isLoading}
          required
        />
        <Input
          name="confirmPassword"
          label="Confirme sua senha"
          value={form.confirmPassword}
          onChange={handleForm}
          type="password"
          minLength={6}
          maxLength={12}
          placeholder="Confirme a senha"
          disabled={isLoading}
          required
        />
        <Button type="submit" disabled={isLoading}>
          Cadastrar
        </Button>
      </form>
      <Redirect
        message="Já tem uma conta?"
        linkMessage="Entre agora!"
        to="/sign-in"
      />
    </SignUpStyled>
  );
};

export default noAuthPageWrapper(SignUpPage);

const SignUpStyled = styled.main`
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
