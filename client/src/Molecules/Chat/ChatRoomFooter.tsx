/** @jsxImportSource @emotion/react */
import React, { useRef, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { css } from "@emotion/react";
import VideoSupport from "./VideoSupport";
import { Button } from "../../Atom/Button";
import useDropDownCloseEvent from "../../Hook/useDropDownCloseEvent";
import LargeModal from "../../Organism/Core/LargeModal";
import { gameDatas, getGameDatas } from "../../util/constant";
import LinkButton from "../Core/LinkButton";
import oneGame from "../../assets/게임/0.jpeg";
import twoGame from "../../assets/게임/1.gif";
import threeGame from "../../assets/게임/2.png";

const gameImages = [oneGame, twoGame, threeGame];

const footerStyle = css`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0 50px;
  position: absolute;
  bottom: 10%;
  right: 5%;
`;

const gameTitleStype = ({ color }: { color: string }) => css`
  text-align: center;
  font-family: Georgia, Serif;
  margin-bottom: 10px;
  font-size: 22px;
  color: ${color};
`;

export default function ChatRoomFooter() {
  const [openGame, setOpenGame] = useState<boolean>(false);
  const [index, setIndex] = useState<number>(0);
  const [datas, setDatas] = useState<any>(null);

  const searchParams = new URLSearchParams(useLocation().search);
  const chatRoomID = Number(searchParams.get("chatRoomId"));

  const gameURL = `/ChatRoom/Game?index=${index + 1}&chatRoomId=${chatRoomID}`;

  const handleGameButtonClick = () => {
    setOpenGame(true);
  };

  const handleCloseButtonClick = () => {
    setOpenGame(false);
    setIndex(0);
  };
  const inCreaseIndex = (): void => {
    if (index === gameDatas.length - 1) return;
    setIndex((prev) => prev + 1);
  };

  const decreaseIndex = (): void => {
    if (index === 0) return;
    setIndex((prev) => prev - 1);
  };

  useEffect(() => {
    setDatas(getGameDatas(index));
  }, [index]);

  const modalGameRef = useRef<HTMLDivElement>(null);
  useDropDownCloseEvent(modalGameRef, () => setOpenGame(false));

  return (
    <div css={footerStyle}>
      <VideoSupport type="basic" />
      <div style={{ display: "flex" }}>
        <div ref={modalGameRef}>
          <Button type="Small" onClick={handleGameButtonClick}>
            게임하기
          </Button>
          {openGame && (
            <LargeModal index={index} length={datas?.length ?? 0} inCreaseIndex={inCreaseIndex} decreaseIndex={decreaseIndex}>
              <div>
                <div css={gameTitleStype({ color: datas.color })}>{datas.title}</div>
                <img alt="game" src={gameImages[index]} width="200px" height="200px" />
              </div>
              <LinkButton url={gameURL} type="Large" onClick={handleCloseButtonClick} content="게임 시작하기" />
            </LargeModal>
          )}
        </div>
      </div>
    </div>
  );
}
