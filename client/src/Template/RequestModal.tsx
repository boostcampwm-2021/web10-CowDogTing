/** @jsxImportSource @emotion/react */
import React from "react";
import { useRecoilValue } from "recoil";
import { css } from "@emotion/react";
import { Button } from "../Atom/Button";
import ProfileInfo from "../Atom/ProfileInfo";
import { Modal } from "../Molecules/Modal";
import { SmallModalType } from "../util/type";
import { requestTarget } from "../Recoil/Atom";

const textStyle = css`
  margin: 15px 0;
`;

export default function RequestModal({ setRequest }: SmallModalType) {
  const data = useRecoilValue(requestTarget);
  const requestModalClose = (): void => {
    setRequest(false);
  };

  return (
    <Modal type="Small">
      <div>
        <ProfileInfo data={data} />
      </div>
      <div css={textStyle}>{data.id}님에게 채팅 신청이 완료되었습니다.</div>
      <Button type="Mideum" onClick={requestModalClose}>
        나가기
      </Button>
    </Modal>
  );
}
