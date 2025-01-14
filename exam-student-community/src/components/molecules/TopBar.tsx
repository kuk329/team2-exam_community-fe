import {
  TopBarBtns,
  TopContainer,
  TopBarMenu,
  TopBarMain,
  TopBarContainer,
} from "./atoms/styled";
import { IconBar } from "./atoms/icons";
import { Link } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { loginState, user } from "../../store/atoms";
import { useState, useEffect } from "react";
import Dropdown from "./Dropdown";
import SearchBar from "./SearchBar";

interface ITopBarProps {
  mainService: string | undefined;
  needWrite: boolean;
  needSearch: boolean;
  id: number | undefined;
}

function TopBar({ mainService, needWrite, needSearch, id }: ITopBarProps) {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen((current) => !current);
  const onClickLogOut = () => setIsLoggedIn(false);
  return (
    <TopBarContainer>
      <TopContainer>
        <TopBarMenu>
          <IconBar onClick={toggle} className="iconBar" />
        </TopBarMenu>
        <TopBarMain>
          <Link to="/">{mainService}</Link>
        </TopBarMain>
        {isLoggedIn ? (
          <TopBarBtns onClick={onClickLogOut}>
            {needWrite ? (
              <Link to="/posts/write" state={{ id }}>
                글쓰기
              </Link>
            ) : null}
            <Link to="/">로그아웃</Link>
          </TopBarBtns>
        ) : (
          <TopBarBtns>
            <Link to="/login">로그인</Link>
          </TopBarBtns>
        )}
      </TopContainer>
      {needSearch ? <SearchBar placeholder={"검색하시오."} /> : null}
      {isOpen ? <Dropdown /> : null}
    </TopBarContainer>
  );
}

export default TopBar;
