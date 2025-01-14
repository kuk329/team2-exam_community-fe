import { useState } from "react";
import { DropdownBox, Menu } from "./atoms/styled";
import { IconRarr, IconLock, IconPower } from "./atoms/icons";
import { useRecoilState, useRecoilValue } from "recoil";
import { loginState, user } from "../../store/atoms";
import { Link } from "react-router-dom";
const options = ["기능1", "기능2", "기능3"];
function Dropdown() {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);
  const userName = useRecoilValue(user);
  console.log(userName);
  if (!isLoggedIn) {
    return (
      <DropdownBox>
        <div className="title">
          <span>
            <IconPower />
          </span>
          <span>로그인해주세요</span>
        </div>
        <ul>
          {options.map((option, index) => (
            <Menu style={{ color: "gray" }} key={index}>
              <span>{option}</span>
              <span>
                <IconLock />
              </span>
            </Menu>
          ))}
        </ul>
      </DropdownBox>
    );
  }
  return (
    <DropdownBox>
      <h1 className="title">
        <span>{userName}님 환영합니다</span>
      </h1>
      <ul>
        <Link to="/myposts">
          <Menu>
            <span>{`내가 쓴 글`}</span>
          </Menu>
        </Link>
        <Link to="/mycommentposts">
          <Menu>
            <span>{`댓글단 글`}</span>
          </Menu>
        </Link>
        <Link to="/myscrapposts">
          <Menu>
            <span>{`스크랩한 글`}</span>
          </Menu>
        </Link>
      </ul>
    </DropdownBox>
  );
}

export default Dropdown;
