import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { baseColor } from "../../constants/colors";
import { BASE_URL } from "../../constants/urls";

const SignUpPage = function () {
  const navigate = useNavigate();
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
    setIsLoading(true);
    const body = { ...form };
    axios
      .post(`${BASE_URL}/sign-up`, body)
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
        alert(err.response);
        console.log(err.response);
        setIsLoading(false);
      });
  }

  return (
    <SignUpStyled>
      <h1>My Wallet</h1>
      <form onSubmit={register}>
        <input
          name='username'
          value={form.username}
          onChange={handleForm}
          type='username'
          placeholder='Nome'
          disabled={isLoading}
          required
        ></input>
        <input
          name='email'
          value={form.email}
          onChange={handleForm}
          type='email'
          placeholder='E-mail'
          disabled={isLoading}
          required
        ></input>
        <input
          name='password'
          value={form.password}
          onChange={handleForm}
          type='password'
          placeholder='Senha'
          disabled={isLoading}
          required
        ></input>
        <input
          name='passwordConfirm'
          value={form.passwordConfirm}
          onChange={handleForm}
          type='password'
          placeholder='Confirme a senha'
          disabled={isLoading}
          required
        ></input>
        <button className='btn' type='submit' disabled={isLoading}>
          Cadastrar
        </button>
      </form>
      <Link to='/sign-in'>
        <p className='text-accent'>Já tem uma conta? Entre agora!</p>
      </Link>
    </SignUpStyled>
  );
};

export default SignUpPage;

const SignUpStyled = styled.main`
  width: 100vw;
  height: 100vh;
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${baseColor};
  h1 {
    color: #fff;
    font-size: 32px;
    font-family: "Saira Stencil One";
  }
  form {
    width: 80%;
    max-width: 420px;
    margin: 20px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  input {
  }
`;
