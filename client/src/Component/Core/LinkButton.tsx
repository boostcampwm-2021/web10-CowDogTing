import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@Atom/.";
import { NotReadNum } from "@Molecules/.";
import { LinkButtonType } from "@Common/type";

type props = LinkButtonType;
export const LinkButton: React.FC<props> = ({ url, type, content, onClick, refProps, id }) => {
  if (!(url && url !== ""))
    return (
      <Button size={type} onClick={onClick} ref={refProps} className={content === "로그아웃" ? "logout" : ""} data-id={id}>
        {content}
      </Button>
    );
  return (
    <Link to={url}>
      <Button size={type} onClick={onClick} ref={refProps}>
        {content}
      </Button>
      {content === "채팅 요청 목록" && <NotReadNum type="Total" />}
    </Link>
  );
};
