import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { baseColor } from "../../constants/colors";
import { BASE_URL } from "../../constants/urls";

const SignInPage = function () {
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
    axios
      .post(`${BASE_URL}/sign-in`, body)
      .then((res) => {
        const respData = {
          id: res.data._id,
          username: res.data.username,
          email: res.data.email,
          requestConfig: {
            headers: {
              Authorization: `Bearer ${res.data.token}`,
            },
          },
        };
        console.log(respData);
        setForm({
          email: "",
          password: "",
        });
        setIsLoading(false);
        navigate("/");
      })
      .catch((err) => {
        alert(err.response.data);
        console.log(err.response);
        setIsLoading(false);
      });
  }

  return (
    <SignInStyled>
      <h1>My Wallet</h1>
      <form onSubmit={login}>
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
        <button className='btn' type='submit' disabled={isLoading}>
          Entrar
        </button>
      </form>
      <Link to='/sign-up'>
        <p className='text-accent'>Primeira vez? Cadastre-se!</p>
      </Link>
    </SignInStyled>
  );
};

export default SignInPage;

const SignInStyled = styled.main`
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
  p {
    color: #fff;
    margin-top: 20px;
    font-family: "Raleway";
    font-weight: 700;
    font-size: 15px;
    line-height: 18px;
  }
`;
