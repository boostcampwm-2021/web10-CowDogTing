/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { RefObject } from "react";

const WordCSS = css`
  position: fixed;
  display: none;
  font-size: 32px;
`;

export default function ProjectWord({ children, divRef }: { children: string; divRef: RefObject<HTMLDivElement> }) {
  return (
    <div css={WordCSS} ref={divRef}>
      {children}
    </div>
  );
}
