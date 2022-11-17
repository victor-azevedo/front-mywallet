import axios from "axios";
import dayjs from "dayjs";
import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import buttonStyle from "../../assets/styles/buttonStyle";
import inputStyle from "../../assets/styles/inputStyle";
import pageStyle from "../../assets/styles/pageStyle";
import { BASE_URL } from "../../constants/urls";

const IncomingPage = function () {
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    value: "",
    description: "",
  });
  const userData = {
    requestConfig: {
      headers: {
        Authorization: `Bearer 93543150-38ee-49b0-b815-3e4731044503`,
      },
    },
  };

  function handleForm(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  function sendTransaction(e) {
    e.preventDefault();
    setIsLoading(true);
    const body = {
      ...form,
      type: "incoming",
      date: dayjs().format("YYYY-MM-DD"),
    };
    axios
      .post(`${BASE_URL}/transactions`, body, userData.requestConfig)
      .then((res) => {
        setIsLoading(false);
        setForm({
          value: "",
          description: "",
        });
      })
      .catch((err) => {
        alert(err.response.data);
        console.log(err.response);
        setIsLoading(false);
      });
  }
  return (
    <IncomingPageStyled>
      <Header>
        <h2>Nova entrada</h2>
        <Link to='/'>
          <span>back</span>
        </Link>
      </Header>
      <Form onSubmit={sendTransaction}>
        <input
          name='value'
          value={form.value}
          onChange={handleForm}
          type='number'
          step='0.01'
          min='0'
          placeholder='Valor'
          disabled={isLoading}
          required
        ></input>
        <input
          name='description'
          value={form.description}
          onChange={handleForm}
          type='text'
          placeholder='Descrição'
          disabled={isLoading}
          minLength='3'
          maxLength='30'
          required
        ></input>
        <button className='btn' type='submit' disabled={isLoading}>
          Salvar Entrada
        </button>
      </Form>
    </IncomingPageStyled>
  );
};

export default IncomingPage;

const IncomingPageStyled = styled.main`
  ${pageStyle};
  justify-content: flex-start;
`;
const Header = styled.header`
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Form = styled.form`
  width: 100%;
  input {
    ${inputStyle}
    width: 100%;
    margin: 15px 0;
  }
  .btn {
    ${buttonStyle}
    width: 100%;
    margin: 15px 0;
  }
`;
