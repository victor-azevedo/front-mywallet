import { useState } from "react";
import CurrencyInput from "react-currency-input-field";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { RollbackOutlined } from "@ant-design/icons";
import buttonStyle from "../assets/styles/buttonStyle";
import inputStyle from "../assets/styles/inputStyle";
import pageStyle from "../assets/styles/pageStyle";
import useApiAuth from "../hooks/useApiAuth-hook";

const AddTransaction = function ({ type }) {
  const apiAuth = useApiAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    value: null,
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
      description: form.description,
      valueInCents: form.value ? Number(form.value.replace(",", "")) : 0,
      type,
      date: new Date().toISOString(),
    };

    apiAuth
      .post("/transactions", body)
      .then((res) => {
        setIsLoading(false);
        setForm({
          value: null,
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
        <Link to="/">
          <RollbackOutlined />
        </Link>
      </Header>
      <Form onSubmit={sendTransaction}>
        <CurrencyInput
          name="value"
          allowNegativeValue={false}
          decimalSeparator=","
          groupSeparator="."
          decimalsLimit={2}
          decimalScale={2}
          placeholder="Valor"
          value={form.value}
          onValueChange={(value) => setForm({ ...form, value })}
          disabled={isLoading}
          required
        ></CurrencyInput>
        <input
          name="description"
          value={form.description}
          onChange={handleForm}
          type="text"
          placeholder="Descrição"
          disabled={isLoading}
          minLength="4"
          maxLength="30"
          required
        ></input>
        <button className="btn" type="submit" disabled={isLoading}>
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
  h2 {
    text-transform: capitalize;
  }
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
