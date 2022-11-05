import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      if (!inputs.email) {
        alert("이메일을 입력해주세요");
        return;
      }
      if (!inputs.password) {
        alert("비밀번호를 입력해주세요");
        return;
      }

      const { data: response } = await axios({
        method: "post",
        url: "http://localhost:4000/user/login",
        data: inputs,
      });

      const { success, message, data } = response;

      if (!success) {
        alert(message);
        return;
      }

      sessionStorage.setItem("ACCESS_TOKEN", data.accessToken);
      navigate("/");
    } catch (e) {
      alert("Error! console 확인");
      console.error(e);
    }
  };

  return (
    <div>
      <Link to="/join">회원가입 페이지로 이동</Link>
      <h1>로그인</h1>
      <div>
        이메일:{" "}
        <input
          type="text"
          name="email"
          value={inputs.email}
          onChange={handleChange}
        />
      </div>
      <div>
        비밀번호:{" "}
        <input
          type="password"
          name="password"
          value={inputs.password}
          onChange={handleChange}
        />
      </div>
      <br />
      <div>
        <button onClick={handleSubmit}>로그인하기</button>
      </div>
    </div>
  );
};

export default Login;
