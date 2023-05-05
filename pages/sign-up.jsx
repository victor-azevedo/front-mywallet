import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";

import buttonStyle from "../src/styles/buttonStyle";
import formStyle from "../src/styles/formStyle";
import inputStyle from "../src/styles/inputStyle";
import pageStyle from "../src/styles/pageStyle";

const SignUpPage = function () {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  function handleForm(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  function register(e) {
    e.preventDefault();
    if (form.password !== form.passwordConfirm) {
      alert("As senhas devem ser iguais");
      return;
    }
    setIsLoading(true);
    const body = { ...form };
    axios
      .post(`${process.env.NEXT_PUBLIC_BASE_URL}/sign-up`, body)
      .then((res) => {
        setForm({
          email: "",
          name: "",
          image: "",
          password: "",
        });
        setIsLoading(false);
        router.push("/sign-in");
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
        <input
          name="username"
          value={form.username}
          onChange={handleForm}
          type="username"
          minLength={3}
          maxLength={20}
          placeholder="Nome"
          disabled={isLoading}
          required
        ></input>
        <input
          name="email"
          value={form.email}
          onChange={handleForm}
          type="email"
          placeholder="E-mail"
          disabled={isLoading}
          required
        ></input>
        <input
          name="password"
          value={form.password}
          onChange={handleForm}
          type="password"
          minLength={6}
          maxLength={12}
          placeholder="Senha"
          disabled={isLoading}
          required
        ></input>
        <input
          name="passwordConfirm"
          value={form.passwordConfirm}
          onChange={handleForm}
          type="password"
          minLength={6}
          maxLength={12}
          placeholder="Confirme a senha"
          disabled={isLoading}
          required
        ></input>
        <button className="btn" type="submit" disabled={isLoading}>
          Cadastrar
        </button>
      </form>
      <Link href="/sign-in">
        <p className="text-accent">Já tem uma conta? Entre agora!</p>
      </Link>
    </SignUpStyled>
  );
};

export default SignUpPage;

const SignUpStyled = styled.main`
  ${pageStyle};
  h1 {
    color: #fff;
    font-size: 32px;
    font-family: "Saira Stencil One";
  }
  form {
    ${formStyle};
    input {
      ${inputStyle};
      width: 100%;
    }
    button {
      ${buttonStyle};
      width: 100%;
    }
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
