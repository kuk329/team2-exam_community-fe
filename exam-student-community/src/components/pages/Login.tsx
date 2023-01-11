import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { LoginForm } from "../molecules/atoms/styled";
import { useNavigate } from "react-router-dom";
import TopBar from "../molecules/TopBar";
import Dropdown from "../molecules/Dropdown";
import { loginCheck } from "../../api";

interface IForm {
  id: string;
  password: string;
}

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IForm>();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  function onSubmit(data: IForm) {
    //  axios.post 해서 isLoggedIn false 받았다고 가정
    // 일단 localStorage 로 해놓음.
    // 추후 api 에서 LoginCheck api 따오기.

    console.log("로그인 성공");
    // loginCheck(data.id, data.password);
    // localStorage.setItem("isLoggedIn", JSON.stringify(true));
    navigate("/");
  }

  return (
    <>
      <TopBar
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        toggle={toggle}
      />
      {isOpen && <Dropdown isLoggedIn={isLoggedIn} />}
      <LoginForm onSubmit={handleSubmit(onSubmit)}>
        <label>아이디</label>
        <input
          {...register("id", {
            required: "아이디를 입력해주세요",
          })}
          name="id"
          type="id"
        />
        <span className="errorMessage">{errors?.id?.message}</span>

        <br />
        <label>비밀번호</label>
        <input
          {...register("password", {
            required: "비밀번호를 입력해주세요",
          })}
          type="password"
          name="password"
        />
        <span className="errorMessage">{errors?.password?.message}</span>
        <br />
        <button type="submit">로그인</button>
        <div className="signUpBox">
          <Link to="/register">아이디 찾기</Link>
          <Link to="/register">비밀번호 찾기</Link>
          <Link to="/register">회원가입</Link>
        </div>
      </LoginForm>
    </>
  );
}

export default Login;
