import { css } from "@emotion/react";
import { useRecoilValue } from "recoil";
import { Input } from "@Atom/.";
import { userChatRoomInfo } from "@Recoil/ChatData";
import { useChatImageControl, useChatMessageControl } from "./ChatInput.hook";

export const ChatInput = () => {
  const { chatRoomId, id: uid } = useRecoilValue(userChatRoomInfo);
  const { messageRef, sendMessage, handleEnterPress } = useChatMessageControl({ uid, chatRoomId });
  const { imageInputTag, handleImageButtonClick, changeImage } = useChatImageControl({ uid, chatRoomId });

  return (
    <div css={InputContainer}>
      <div css={sendImageStyle} aria-hidden="true" onClick={handleImageButtonClick} />
      <Input placeholder="메시지를 입력하세요" ref={messageRef} onKeyPress={handleEnterPress} />
      <div css={sendButtonStyle} aria-hidden="true" onClick={sendMessage} />
      <input ref={imageInputTag} type="file" accept="image/*" css={ImageInputStlye} onChange={changeImage} />
    </div>
  );
};

const ImageSendButton = "/Asset/ImageSendButton.svg";
const SendButton = "/Asset/SendButton.svg";

const InputContainer = css`
  display: flex;
  justify-content: center;
  padding-top: 10px;
  align-items: center;
  height: fit-content;
`;

const sendImageStyle = css`
  background-image: url(${ImageSendButton});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 25px;
  height: 25px;
  margin-right: 10px;
  cursor: pointer;
`;

const sendButtonStyle = css`
  background-image: url(${SendButton});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 25px;
  height: 25px;
  margin-left: 10px;
  cursor: pointer;
`;

const ImageInputStlye = css`
  display: none;
`;
