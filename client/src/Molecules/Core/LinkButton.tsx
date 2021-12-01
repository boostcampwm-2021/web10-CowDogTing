/* eslint-disable no-debugger */
/** @jsxImportSource @emotion/react */
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../../Atom/Button";
import { LinkButtonType } from "../../util/type";
import NotReadNum from "../Chat/NotReadNum";

function LinkButton({ url, type, content, onClick, refProps, id }: LinkButtonType) {
  return url && url !== "" ? (
    <>
      <Link to={url}>
        <Button type={type} onClick={onClick} ref={refProps}>
          {content}
        </Button>
        {checkChatElement(content) && <NotReadNum type="Total" />}
      </Link>
    </>
  ) : (
    <Button type={type} onClick={onClick} ref={refProps} className={content === "로그아웃" ? "logout" : ""} data-id={id}>
      {content}
    </Button>
  );
}
export default LinkButton;

function checkChatElement(type: string) {
  return type === "채팅 요청 목록";
}
