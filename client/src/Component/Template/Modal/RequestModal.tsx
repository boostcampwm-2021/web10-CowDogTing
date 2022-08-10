import React from "react";
import { useRecoilValue } from "recoil";
import { css } from "@emotion/react";
import { ProfileInfo, Button } from "@Atom/.";
import { Modal } from "@Core/Modal";
import { requestTarget } from "@Recoil/Atom";

const textStyle = css`
  margin: 15px 0;
`;

type props = { setRequest: any };
export const RequestModal: React.FC<props> = ({ setRequest }) => {
  const data = useRecoilValue(requestTarget);
  const requestModalClose = () => setRequest(false);

  return (
    <Modal type="Small">
      <div>
        <ProfileInfo {...data} />
      </div>
      <div css={textStyle}>{data.id}님에게 채팅 신청이 완료되었습니다.</div>
      <Button size="Mideum" onClick={requestModalClose}>
        나가기
      </Button>
    </Modal>
  );
};
