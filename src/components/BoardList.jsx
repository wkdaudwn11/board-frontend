import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "@emotion/styled";
import Moment from "react-moment";

import Button from "./Button";

const Table = styled.div`
  border-top: 1px solid black;
  border-left: 1px solid black;

  tr:nth-of-type(even) {
    background-color: #efefef;
  }

  th,
  td {
    width: auto;
    height: 40px;
    padding: 0 10px;
    text-align: center;
    border-right: 1px solid black;
    border-bottom: 1px solid black;
  }

  th {
    height: 25px;
    background-color: black;
    color: white;
  }

  .title {
    min-width: 200px;
  }

  .date {
    width: 200px;
  }
`;

const ButtonBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 12px;
`;

const BoardList = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [list, setList] = useState([]);

  const navigate = useNavigate();

  const fetchBoardList = async () => {
    try {
      const { data: response } = await axios({
        headers: {
          authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`,
        },
        method: "get",
        url: "http://localhost:4000/board/list",
        data: {
          page: 1,
          limit: 10,
        },
      });

      const { success, message, data } = response;

      if (!success) throw new Error(message);

      setList(data);
    } catch (e) {
      setError(e);
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleClick = (id) => () => {
    navigate(`/detail/${id}`);
  };

  useEffect(() => {
    fetchBoardList();
  }, []);

  if (loading) return <div>loading...</div>;

  if (error) return <div>error</div>;

  if (list.length === 0) return <div>게시글이 없습니다.</div>;

  return (
    <div>
      <h1>게시판 목록</h1>
      <ButtonBox>
        <Button color="skyblue">게시글 등록</Button>
      </ButtonBox>
      <Table>
        <thead>
          <tr>
            <th className="number">No.</th>
            <th className="title">제목</th>
            <th>작성자</th>
            <th className="date">작성일</th>
            <th>비고</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item, idx) => (
            <tr key={item._id}>
              <td className="number">{list.length - idx}</td>
              <td className="title">{item.title}</td>
              <td>{item.writer}</td>
              <td className="date">
                <Moment format="YYYY-MM-DD HH:mm:ss">{item.created_at}</Moment>
              </td>
              <td>
                <button onClick={handleClick(item._id)}>상세</button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default BoardList;
