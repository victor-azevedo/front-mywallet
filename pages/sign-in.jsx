import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";

import Link from "next/link";
import useAuth from "../src/hooks/useAuth-hook";
import { api } from "../src/services/api-service";
import buttonStyle from "../src/styles/buttonStyle";
import formStyle from "../src/styles/formStyle";
import inputStyle from "../src/styles/inputStyle";
import pageStyle from "../src/styles/pageStyle";

const SignInPage = function () {
  const { signIn } = useAuth();
  const router = useRouter();
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
      .post("/sign-in", body)
      .then((res) => {
        signIn(res.data.token);
        setForm({
          email: "",
          password: "",
        });
        setIsLoading(false);
        router.push("/");
      })
      .catch((err) => {
        if (err.response) {
          alert(err.response);
        } else {
          alert(err.response);
        }
        setIsLoading(false);
      });
  }

  return (
    <SignInStyled>
      <h1>My Wallet</h1>
      <form onSubmit={login}>
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
          placeholder="Senha"
          disabled={isLoading}
          minLength="6"
          maxLength="12"
          required
        ></input>
        <button className="btn" type="submit" disabled={isLoading}>
          Entrar
        </button>
      </form>
      <Link href="/sign-up">
        <p className="text-accent">Primeira vez? Cadastre-se!</p>
      </Link>
    </SignInStyled>
  );
};

export default SignInPage;

const SignInStyled = styled.main`
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
    .btn {
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
