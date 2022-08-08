import React, { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

const GameStyle = css`
  top: -10%;
  width: 150px;
  height: 150px;
`;

const GatherStyle = css`
  width: 150px;
  height: 150px;
`;

const containerStyle = (props: { type: string }) => css`
  width: 240px;
  height: 240px;
  border: 1px solid #000000;
  ${props.type === "Game" && GameStyle}
  ${props.type === "Gather" && GatherStyle}
`;

const VideoContainer = styled.video`
  width: 100%;
  height: 100%;
  background-color: black;
`;

interface Props {
  stream: MediaStream;
  type: string;
  muted?: boolean;
}

export const Video = ({ type, stream, muted }: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }
    if (muted) setIsMuted(muted);
  }, [stream, muted]);

  return (
    <div css={containerStyle({ type })}>
      <VideoContainer ref={videoRef} muted={isMuted} autoPlay />
    </div>
  );
};

Video.defaultProps = {
  muted: false,
};
