import axios from "axios";
import dayjs from "dayjs";
import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import buttonStyle from "../assets/styles/buttonStyle";
import inputStyle from "../assets/styles/inputStyle";
import pageStyle from "../assets/styles/pageStyle";
import { BASE_URL } from "../constants/urls";

const AddTransaction = function ({ userData, type }) {
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    value: "",
    description: "",
  });

  function handleForm(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  function sendTransaction(e) {
    e.preventDefault();
    setIsLoading(true);
    const body = {
      ...form,
      value: Number(form.value),
      type,
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
        if (err.response.data.message) {
          alert(err.response.data.message);
        } else {
          alert(err.response.data);
        }
        setIsLoading(false);
      });
  }

  const renderTypeText = function () {
    if (type === "incoming") {
      return "entrada";
    }
    if (type === "outgoing") {
      return "saída";
    }
  };

  return (
    <AddTransactionStyled>
      <Header>
        <h2>Nova {renderTypeText()}</h2>
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
          minLength='4'
          maxLength='30'
          required
        ></input>
        <button className='btn' type='submit' disabled={isLoading}>
          Salvar {renderTypeText()}
        </button>
      </Form>
    </AddTransactionStyled>
  );
};

export default AddTransaction;

const AddTransactionStyled = styled.main`
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
    text-transform: capitalize;
    width: 100%;
    margin: 15px 0;
  }
`;
