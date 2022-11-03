import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const BoardDetail = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [detailData, setDetailData] = useState(null);

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
    <>
      <h1>게시판 상세</h1>
      <button onClick={() => navigate("/")}>목록으로..</button>
      <br />
      <br />
      <table>
        <tbody>
          <tr>
            <td>제목</td>
            <td>{detailData.title}</td>
          </tr>
          <tr>
            <td>내용</td>
            <td>{detailData.content}</td>
          </tr>
          <tr>
            <td>작성자</td>
            <td>{detailData.writer}</td>
          </tr>
          <tr>
            <td>작성일</td>
            <td>{detailData.created_at}</td>
          </tr>
          <tr>
            <td>
              <button>수정</button>
            </td>
            <td>
              <button>삭제</button>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default BoardDetail;
