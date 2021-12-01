/* eslint-disable no-nested-ternary */
/** @jsxImportSource @emotion/react */
// import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { useEffect, useRef, useState } from "react";
import character1 from "../assets/캐릭터/1.png";
import character2 from "../assets/캐릭터/2.png";
import Header from "../Organism/Core/Header";
import { drawHeart, moveCharacter } from "../util/canvas";
import ProjectWordContainer from "../Organism/ProjectWordContainer";

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 400;
const ONE_STEP = 45;

const Container = css`
  height: 9000px;
  display: flex;
  justify-content: center;
`;
const CanvasContainer = css`
  position: fixed;
  top: 30%;
`;

const HeaderContainer = css`
  position: fixed;
`;

export default function Project() {
  const [work, setWork] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const image1 = new Image();
  const image2 = new Image();
  image1.src = character1;
  image2.src = character2;

  const handleScrollEvent = () => {
    const { scrollTop } = document.documentElement;
    if (scrollTop > 1950) drawHeart(canvasRef, scrollTop);
    setWork(Math.floor(scrollTop / ONE_STEP));
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScrollEvent);
    moveCharacter(image1, image2, canvasRef, work);
    drawHeart(canvasRef, work * ONE_STEP);
    return () => {
      window.removeEventListener("scroll", handleScrollEvent);
    };
  }, [work]);

  return (
    <div css={Container}>
      <div css={HeaderContainer}>
        <Header />
      </div>
      <div css={CanvasContainer}>
        <canvas ref={canvasRef} width={`${CANVAS_WIDTH}px`} height={`${CANVAS_HEIGHT}px`} />
      </div>
      <ProjectWordContainer work={work} />
    </div>
  );
}
