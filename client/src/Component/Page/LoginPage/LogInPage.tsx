import React from "react";
import { css } from "@emotion/react";
import { useLocation } from "react-router-dom";
import { useRecoilRefresher_UNSTABLE, useSetRecoilState } from "recoil";
import { getFetch, postLogin } from "@Common/api";
import { errorState } from "@Recoil/Atom";
import { SocialLoginContainer, LoginButtonContainer, LoginMainInput } from "@Molecules/.";
import { useMovePage } from "@Hook/useMovePage";
import { userState } from "@Recoil/UserData";
import { USER_URL } from "@Common/URL";
import { joinChatRoomSelector } from "@Recoil/ChatData";
import { useCheckLoginError } from "./LoginPage.hook";

const containerStyle = css`
  display: flex;
  margin: 0 auto;
  flex-direction: column;
  width: 300px;
  margin-top: 50px;
`;

const LogInPage: React.FC = () => {
  const searchParams = new URLSearchParams(useLocation().search);
  const social = searchParams.get("social") ?? "";

  const setUser = useSetRecoilState(userState);
  const joinChatRoom = useRecoilRefresher_UNSTABLE(joinChatRoomSelector);

  const { idRef, pwRef, checkRefValue } = useCheckLoginError();
  const setErrorValue = useSetRecoilState(errorState);
  const [goMain] = useMovePage("/main");

  const clickLogin = async () => {
    try {
      const { id, pw } = checkRefValue();
      if (id === "" || pw === "") throw new Error();
      await postLogin({ id, pw });
      goMain();
      joinChatRoom();
      getFetch({ url: USER_URL, query: "" }).then((res) => {
        setUser((prev) => ({ ...prev, ...res }));
      });
      sessionStorage.setItem("isLogin", "true");
    } catch (e) {
      setErrorValue({ errorStr: (e as any)?.response?.data || (e as any).message, timeOut: 1000 });
    }
  };

  return (
    <div css={containerStyle}>
      <LoginMainInput idRef={idRef} pwRef={pwRef} />
      <LoginButtonContainer onClick={clickLogin} />
      {!social && <SocialLoginContainer />}
    </div>
  );
};

export default LogInPage;
