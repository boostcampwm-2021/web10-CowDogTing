import React, { useEffect, useRef } from "react";
import styled from "@emotion/styled";

const Container = styled.div`
  width: 240px;
  height: 240px;
  border: 1px solid #000000;
`;

const VideoContainer = styled.video`
  width: 100%;
  height: 100%;
  background-color: black;
`;

export type VideoProps = {
  stream: MediaStream;
  muted?: boolean;
};

export const Video = ({ stream, muted }: VideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) videoRef.current.srcObject = stream;
  }, [stream]);

  return (
    <Container>
      <VideoContainer ref={videoRef} muted={muted} autoPlay />
    </Container>
  );
};

Video.defaultProps = {
  muted: false,
};
