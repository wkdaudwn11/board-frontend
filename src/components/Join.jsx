import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Join = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
    name: "",
    age: "",
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
      if (!inputs.passwordConfirm) {
        alert("비밀번호 확인을 입력해주세요");
        return;
      }
      if (inputs.password !== inputs.passwordConfirm) {
        alert("비밀번호가 서로 다릅니다.");
        return;
      }
      if (!inputs.name) {
        alert("이름을 입력해주세요");
        return;
      }
      if (!inputs.age) {
        alert("나이를 입력해주세요");
        return;
      }

      const { data: response } = await axios({
        method: "post",
        url: "http://localhost:4000/user/join",
        data: inputs,
      });

      const { success, message } = response;

      if (!success) {
        alert(message);
        return;
      }

      alert("회원가입 완료");
      navigate("/login");
    } catch (e) {
      alert("Error! console 확인");
      console.error(e);
    }
  };

  return (
    <div>
      <h1>회원가입</h1>
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
      <div>
        비밀번호 확인:{" "}
        <input
          type="password"
          name="passwordConfirm"
          value={inputs.passwordConfirm}
          onChange={handleChange}
        />
      </div>
      <div>
        이름:{" "}
        <input
          type="text"
          name="name"
          value={inputs.name}
          onChange={handleChange}
        />
      </div>
      <div>
        나이:{" "}
        <input
          type="text"
          name="age"
          value={inputs.age}
          onChange={handleChange}
        />
      </div>
      <div>
        <button onClick={handleSubmit}>회원가입하기</button>
      </div>
    </div>
  );
};

export default Join;
