/* eslint-disable consistent-return */
/** @jsxImportSource @emotion/react */
import React, { useEffect, useRef, useState } from "react";
import { css } from "@emotion/react";
import { Button } from "../../Atom/Button";

const containerStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  width: 50%;
  height: 50%;
  border: 1px solid #000000;
  /* margin-top: 10%; */
`;

const ButtonContainerStyle = css`
  margin-top: 5%;
  display: flex;
  justify-content: flex-end;
  margin-right: 10%;
`;
type CanvasProps = {
  width?: number;
  height?: number;
};

interface Coordinate {
  x: number;
  y: number;
}

export default function ChatRoomGame({ width, height }: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePosition, setMousePosition] = useState<Coordinate | null>(null);
  const [isPainting, setIsPainting] = useState(false);

  const getCoordinates = (event: MouseEvent): Coordinate | null => {
    if (!canvasRef.current) {
      return null;
    }

    const canvas: HTMLCanvasElement = canvasRef.current;

    return {
      x: event.pageX - canvas.offsetLeft,
      y: event.pageY - canvas.offsetTop,
    };
  };
  const drawLine = (originalMousePosition: Coordinate, newMousePosition: Coordinate) => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    const context = canvas.getContext("2d");

    if (context) {
      context.strokeStyle = "black";
      context.lineJoin = "round";
      context.lineWidth = 5;

      context.beginPath();
      context.moveTo(originalMousePosition.x, originalMousePosition.y);
      context.lineTo(newMousePosition.x, newMousePosition.y);
      context.closePath();

      context.stroke();
    }
  };

  const startPaint = (event: MouseEvent) => {
    const coordinates = getCoordinates(event);
    if (coordinates) {
      setIsPainting(true);
      setMousePosition(coordinates);
    }
  };

  const paint = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    if (isPainting) {
      const newMousePosition = getCoordinates(event);
      if (mousePosition && newMousePosition) {
        drawLine(mousePosition, newMousePosition);
        setMousePosition(newMousePosition);
      }
    }
  };

  const exitPaint = () => {
    setIsPainting(false);
  };

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;

    canvas.addEventListener("mousedown", startPaint);
    canvas.addEventListener("mousemove", paint);
    canvas.addEventListener("mouseup", exitPaint);
    canvas.addEventListener("mouseleave", exitPaint);

    return () => {
      canvas.removeEventListener("mousedown", startPaint);
      canvas.removeEventListener("mousemove", paint);
      canvas.removeEventListener("mouseup", exitPaint);
      canvas.removeEventListener("mouseleave", exitPaint);
    };
  }, [startPaint, paint, exitPaint]);

  const handleButtonClick = () => {
    if (!canvasRef.current) {
      return;
    }

    const canvas: HTMLCanvasElement = canvasRef.current;
    canvas.getContext("2d")!!.clearRect(0, 0, canvas.width, canvas.height);
  };
  return (
    <>
      <div css={ButtonContainerStyle}>
        <Button onClick={handleButtonClick}>지우기</Button>
      </div>
      <div css={containerStyle}>
        <canvas ref={canvasRef} height={height} width={width} className="canvas" />
      </div>
    </>
  );
}

ChatRoomGame.defaultProps = {
  width: 800,
  height: 600,
};
