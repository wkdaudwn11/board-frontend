import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
    <>
      <h1>게시판 목록</h1>
      <br />
      <br />
      <table>
        <thead>
          <tr>
            <th>제목</th>
            <th>작성자</th>
            <th>작성일</th>
            <th>비고</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item) => (
            <tr key={item._id}>
              <td>{item.title}</td>
              <td>{item.writer}</td>
              <td>{item.created_at}</td>
              <td>
                <button onClick={handleClick(item._id)}>상세</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default BoardList;
