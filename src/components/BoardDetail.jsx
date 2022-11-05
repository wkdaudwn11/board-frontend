import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import styled from "@emotion/styled";
import Moment from "react-moment";

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

const Pre = styled.pre`
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

  button {
    width: 100px;
    height: 30px;
    transition: 0.2s all;
    font-weight: 700;
    cursor: pointer;

    &:hover {
      border-radius: 12px;
    }
  }

  button.update-btn {
    border: 1px solid green;
    background-color: green;
    color: white;
  }

  button.delete-btn {
    border: 1px solid red;
    background-color: red;
    color: white;
  }

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
    } catch (e) {
      setError(e);
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [id]);

  const handleUpdate = async (id) => {
    try {
      if (!id) throw new Error("id is required");

      setUpdateLoading(true);
      alert(id);
    } catch (e) {
      alert(e.message);
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      if (!id) throw new Error("id is required");

      if (!window.confirm("정말로 삭제하시겠습니까?")) return;

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

      alert("성공적으로 삭제되었습니다.");
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

  if (!detailData) return <div>게시글이 없습니다.</div>;

  return (
    <div>
      <Link to="/">목록으로</Link>
      <h1>게시판 상세</h1>

      <Label>작성자</Label>
      <InputBox>{detailData.writer}</InputBox>

      <Label>작성일</Label>
      <InputBox>
        <Moment format="YYYY-MM-DD HH:mm:ss">{detailData.created_at}</Moment>
      </InputBox>

      <Label>제목</Label>
      <Input type="text" name="title" value={detailData.title} />

      <Label>내용</Label>
      <Pre>{detailData.content}</Pre>

      <ButtonGroup>
        <button
          className="update-btn"
          onClick={() => handleUpdate(detailData._id)}
        >
          {updateLoading ? "loading.." : "수정"}
        </button>
        <button
          className="delete-btn"
          onClick={() => handleDelete(detailData._id)}
        >
          {deleteLoading ? "loading.." : "삭제"}
        </button>
      </ButtonGroup>
    </div>
  );
};

export default BoardDetail;
