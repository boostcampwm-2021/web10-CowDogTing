import React, { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

const containerStyle = css`
  width: 240px;
  height: 240px;
  border: 1px solid #000000;
`;

const VideoContainer = styled.video`
  width: 100%;
  height: 100%;
  background-color: black;
`;

interface Props {
  stream: MediaStream;
  muted?: boolean;
}

export const Video = ({ stream, muted }: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  useEffect(() => {
    if (videoRef.current) videoRef.current.srcObject = stream;
    if (muted) setIsMuted(muted);
  }, [stream, muted]);

  return (
    <div css={containerStyle}>
      <VideoContainer ref={videoRef} muted={isMuted} autoPlay />
    </div>
  );
};

Video.defaultProps = {
  muted: false,
};
