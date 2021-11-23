/* eslint-disable no-debugger */
/** @jsxImportSource @emotion/react */
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../../Atom/Button";
import { LinkButtonType } from "../../util/type";

function LinkButton({ url, type, content, onClick, refProps, id }: LinkButtonType) {
  return url && url !== "" ? (
    <Link to={url}>
      <Button type={type} onClick={onClick} ref={refProps}>
        {content}
      </Button>
    </Link>
  ) : (
    <Button type={type} onClick={onClick} ref={refProps} className={content === "로그아웃" ? "logout" : ""} data-id={id}>
      {content}
    </Button>
  );
}
export default LinkButton;
