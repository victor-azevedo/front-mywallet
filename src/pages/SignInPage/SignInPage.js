import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import buttonStyle from "../../assets/styles/buttonStyle";
import formStyle from "../../assets/styles/formStyle";
import inputStyle from "../../assets/styles/inputStyle";
import pageStyle from "../../assets/styles/pageStyle";
import { BASE_URL } from "../../constants/urls";

const SignInPage = function ({ setUserData }) {
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
        console.log(res.data);
        const resData = {
          id: res.data._id,
          username: res.data.username,
          email: res.data.email,
          requestConfig: {
            headers: {
              Authorization: `Bearer ${res.data.token}`,
            },
          },
        };
        setUserData(resData);
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
          minLength='6'
          maxLength='16'
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
