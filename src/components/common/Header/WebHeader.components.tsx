import {
  HeaderContainer,
  HeaderIMG,
  WebHeaderButton,
  WebButtonWrap,
  SwipeButtonGroup,
} from "./Header.styles";
import HeaderImg from "../../../assets/images/headerimage.png";
import WebHeaderSwitch from "./WebHeaderSwitch/WebHeaderSwitch.components";
import { useNavigate } from "react-router";

// import for recoil
import { IsLoginRecoil, UserAuth, UserState } from "../../../recoil/recoil";
import { useRecoilState, useRecoilValue } from "recoil";
import { useEffect, useState } from "react";
import { useExtractID } from "../../../hooks/useExtractID";

const WebHeader = () => {
  const userid = useRecoilValue(UserState);
  const navigate = useNavigate();
  const [isLogin, SetIsLogin] = useRecoilState(IsLoginRecoil);
  const [userAuth, SetUserAuth] = useRecoilState(UserAuth);
  const [currentID] = useExtractID();

  const handleLogoClick = () => {
    navigate(`/${userid}`);
    window.location.reload();
  };

  const handleLogout = () => {
    // 로그아웃 처리하기

    // isLogin false로 만들기
    SetIsLogin(false);
  };

  const handleMakeAccount = () => {
    // home으로 redirect?
    navigate("/");
  };

  return (
    <HeaderContainer>
      <HeaderIMG src={HeaderImg} alt="header" onClick={handleLogoClick} />
      <WebButtonWrap>
        <SwipeButtonGroup>
          {
            // 로그인이 되어있어야 switch 가능 | 로그인한 auth와 현재 url ID 비교
            isLogin && userAuth.userID === currentID ? (
              <WebHeaderSwitch />
            ) : (
              <></>
            )
          }
        </SwipeButtonGroup>
        {
          // 로그인만 되어있는지만 여부 체크
          isLogin ? (
            <WebHeaderButton onClick={handleLogout}>로그아웃</WebHeaderButton>
          ) : (
            <WebHeaderButton onClick={handleMakeAccount}>
              계정 만들기
            </WebHeaderButton>
          )
        }
      </WebButtonWrap>
    </HeaderContainer>
  );
};

export default WebHeader;
