/** @jsxImportSource @emotion/react */
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../Atom/Button";
import { LinkButtonType } from "../util/type";

function LinkButton({ url, type, content, onClick }: LinkButtonType) {
  return url && url !== "" ? (
    <Link to={url}>
      <Button type={type} onClick={onClick}>
        {content}
      </Button>
    </Link>
  ) : (
    <Button type={type} onClick={onClick} className={content === "로그아웃" ? "logout" : ""}>
      {content}
    </Button>
  );
}
export default LinkButton;
