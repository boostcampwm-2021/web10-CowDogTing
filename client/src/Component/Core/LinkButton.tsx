/** @jsxImportSource @emotion/react */
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@Atom/.";
import { LinkButtonType } from "../../Util/type";
import NotReadNum from "../Molecules/Chat/NotReadNum";

type props = LinkButtonType;

export const LinkButton: React.FC<props> = ({ url, type, content, onClick, refProps, id }) => {
  if (!checkUrl(url))
    return (
      <Button type={type} onClick={onClick} ref={refProps} className={content === "로그아웃" ? "logout" : ""} data-id={id}>
        {content}
      </Button>
    );
  return (
    <Link to={url as string}>
      <Button type={type} onClick={onClick} ref={refProps}>
        {content}
      </Button>
      {content === "채팅 요청 목록" && <NotReadNum type="Total" />}
    </Link>
  );
};

const checkUrl = (url: string | undefined) => url && url !== "";
