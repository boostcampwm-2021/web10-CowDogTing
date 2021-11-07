/** @jsxImportSource @emotion/react */
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../Atom/Button";
import { LinkButtonType } from "../util/type";

function LinkButton({ url, type, content }: LinkButtonType) {
  return url ? (
    <Link to={url}>
      <Button type={type}>{content}</Button>
    </Link>
  ) : (
    <Button type={type}>{content}</Button>
  );
}
export default LinkButton;
