import { RollbackOutlined } from "@ant-design/icons";
import { useRef, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";

import pageStyle from "../assets/styles/pageStyle";
import useApiAuth from "../hooks/useApiAuth-hook";
import Button from "./Button";
import Input from "./Input";

const AddOrEditTransaction = function ({ type }) {
  const apiAuth = useApiAuth();

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const isTransactionEdition = useRef(searchParams.get("edit"));

  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    value: searchParams.get("valueInCents") / 100 || null,
    description: searchParams.get("description") || "",
  });

  function handleForm(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  function handleRequestPostOrPatch() {
    const httpMethod = isTransactionEdition.current ? "patch" : "post";

    const urlParam = isTransactionEdition.current
      ? searchParams.get("_id")
      : "";

    const bodyPost = {
      description: form.description,
      valueInCents: form.value ? Number(form.value.replace(",", "")) : 0,
      type,
      date: new Date().toISOString(),
    };
    const bodyPatch = {
      description: form.description,
      valueInCents: form.value ? Number(form.value.replace(",", "")) : 0,
    };
    const body = isTransactionEdition.current ? bodyPatch : bodyPost;

    return { httpMethod, urlParam, body };
  }

  function sendTransaction(e) {
    e.preventDefault();
    setIsLoading(true);

    const { httpMethod, urlParam, body } = handleRequestPostOrPatch();

    apiAuth[httpMethod](`/transactions/${urlParam}`, body)
      .then((res) => {
        setIsLoading(false);
        setForm({
          value: null,
          description: "",
        });
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
        <h2>
          {isTransactionEdition.current ? "Editar" : "Nova"} {renderTypeText()}
        </h2>
        <Link to="/">
          <RollbackOutlined />
        </Link>
      </Header>
      <Form onSubmit={sendTransaction}>
        <Input
          name="value"
          allowNegativeValue={false}
          decimalSeparator=","
          groupSeparator="."
          decimalsLimit={2}
          decimalScale={2}
          label="Valor"
          placeholder="Valor"
          value={form.value}
          onValueChange={(value) => setForm({ ...form, value })}
          disabled={isLoading}
          required
          isCurrency
        />
        <Input
          name="description"
          value={form.description}
          onChange={handleForm}
          type="text"
          label="Descrição"
          placeholder="Descrição"
          disabled={isLoading}
          minLength="4"
          maxLength="30"
          required
        />
        <Button type="submit" disabled={isLoading}>
          Salvar {renderTypeText()}
        </Button>
      </Form>
    </AddTransactionStyled>
  );
};

export default AddOrEditTransaction;

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
`;
