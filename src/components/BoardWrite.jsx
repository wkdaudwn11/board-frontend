import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import styled from "@emotion/styled";

import Button from "./Button";

const Label = styled.div`
  font-size: 12px;
  color: red;
  margin-top: 12px;
`;

const Input = styled.input`
  width: 400px;
  height: 30px;
  font-size: 12px;
  padding: 0 4px;
`;

const InputBox = styled.div`
  display: flex;
  align-items: center;
  width: 400px;
  height: 30px;
  font-size: 12px;
  padding: 0 4px;
  background-color: lightgray;
  cursor: not-allowed;
  border: 1px solid black;
`;

const Textarea = styled.textarea`
  width: 400px;
  min-height: 100px;
  margin: 0;
  padding: 4px;
  overflow-y: auto;
  font-size: 12px;
  border: 1px solid black;
`;

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 12px;
`;

const BoardWrite = () => {
  const [writeLoading, setWriteLoading] = useState(false);
  const [inputs, setInputs] = useState({
    title: "",
    content: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    console.log(e.target);
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      setWriteLoading(true);

      const { title, content } = inputs;

      if (!title) {
        alert("제목을 입력해주세요.");
        return;
      }

      if (!content) {
        alert("내용을 입력해주세요.");
        return;
      }

      const { data: response } = await axios({
        headers: {
          authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`,
        },
        method: "post",
        url: `http://localhost:4000/board`,
        data: {
          title,
          content,
        },
      });

      const { success, message } = response;

      if (!success) throw new Error(message);

      alert("성공적으로 등록되었습니다.");
      navigate("/");
    } catch (e) {
      alert(e.message);
    } finally {
      setWriteLoading(false);
    }
  };

  return (
    <div>
      <Link to="/">목록으로</Link>
      <h1>게시판 상세</h1>

      <Label>제목</Label>
      <Input
        type="text"
        name="title"
        value={inputs.title}
        onChange={handleChange}
      />

      <Label>내용</Label>
      <Textarea name="content" value={inputs.content} onChange={handleChange} />

      <ButtonGroup>
        <Button color="green" handleClick={handleSubmit}>
          {writeLoading ? "loading.." : "등록"}
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default BoardWrite;
