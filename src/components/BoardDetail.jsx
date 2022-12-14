import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import styled from "@emotion/styled";
import Moment from "react-moment";

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

  button + button {
    margin-left: 12px;
  }
`;

const BoardDetail = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [detailData, setDetailData] = useState(null);

  const [updateLoading, setUpdateLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [inputs, setInputs] = useState({
    title: "",
    content: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();

  const fetchBoardDetail = useCallback(async () => {
    try {
      const { data: response } = await axios({
        headers: {
          authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`,
        },
        method: "get",
        url: `http://localhost:4000/board/${id}`,
        data: {
          page: 1,
          limit: 10,
        },
      });

      const { success, message, data } = response;

      if (!success) throw new Error(message);

      setDetailData(data);
      setInputs({
        title: data.title,
        content: data.content,
      });
    } catch (e) {
      setError(e);
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [id]);

  const handleChange = (e) => {
    console.log(e.target);
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async (id) => {
    try {
      if (!id) throw new Error("id is required");

      setUpdateLoading(true);

      const { title, content } = inputs;

      if (title === detailData.title && content === detailData.content) {
        alert("??????????????? ????????????.");
        return;
      }

      if (!title) {
        alert("????????? ??????????????????.");
        return;
      }

      if (!content) {
        alert("????????? ??????????????????.");
        return;
      }

      const { data: response } = await axios({
        headers: {
          authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`,
        },
        method: "patch",
        url: `http://localhost:4000/board`,
        data: {
          id,
          title,
          content,
        },
      });

      const { success, message } = response;

      if (!success) throw new Error(message);

      alert("??????????????? ?????????????????????.");
    } catch (e) {
      alert(e.message);
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      if (!id) throw new Error("id is required");

      if (!window.confirm("????????? ?????????????????????????")) return;

      setDeleteLoading(true);

      const { data: response } = await axios({
        headers: {
          authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`,
        },
        method: "delete",
        url: `http://localhost:4000/board`,
        data: {
          id,
        },
      });

      const { success, message } = response;

      if (!success) throw new Error(message);

      alert("??????????????? ?????????????????????.");
      navigate("/");
    } catch (e) {
      alert(e.message);
    } finally {
      setDeleteLoading(false);
    }
  };

  useEffect(() => {
    if (!id) {
      navigate("/");
      return;
    }

    fetchBoardDetail();
  }, [id, navigate, fetchBoardDetail]);

  if (!id) return;

  if (loading) return <div>loading...</div>;

  if (error) return <div>error</div>;

  if (!detailData) return <div>???????????? ????????????.</div>;

  return (
    <div>
      <Link to="/">????????????</Link>
      <h1>????????? ??????</h1>

      <Label>?????????</Label>
      <InputBox>{detailData.writer}</InputBox>

      <Label>?????????</Label>
      <InputBox>
        <Moment format="YYYY-MM-DD HH:mm:ss">{detailData.created_at}</Moment>
      </InputBox>

      <Label>??????</Label>
      <Input
        type="text"
        name="title"
        value={inputs.title}
        onChange={handleChange}
      />

      <Label>??????</Label>
      <Textarea name="content" value={inputs.content} onChange={handleChange} />

      {detailData.isMyBoard && (
        <ButtonGroup>
          <Button
            color="green"
            handleClick={() => handleUpdate(detailData._id)}
          >
            {updateLoading ? "loading.." : "??????"}
          </Button>
          <Button color="red" handleClick={() => handleDelete(detailData._id)}>
            {deleteLoading ? "loading.." : "??????"}
          </Button>
        </ButtonGroup>
      )}
    </div>
  );
};

export default BoardDetail;
