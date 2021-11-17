/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { PersonInfoType } from "../util/type";
import Video from "../Atom/Video";

const GameStyle = css`
  top: -10%;
`;

const GatherStyle = css``;

const containerStyle = (props: { type: string }) => css`
  height: 50%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  align-items: center;
  padding: 30px;
  padding-top: 0;
  position: absolute;
  left: 50%;
  ${props.type === "Game" && GameStyle}
  ${props.type === "Gather" && GatherStyle}
`;

export default function ChatRoomBasic(props: { member: PersonInfoType[] | null; type: string }) {
  // const { id } = useRecoilValue(userState);
  // const { socket } = new ClientSocket(id);
  const { member, type } = props;
  // const localVideoRef = useRef<HTMLVideoElement>(null);
  // let sendPC: RTCPeerConnection;
  // let receivePCs: any;
  // const pc_config = {
  //   iceServers: [
  //     // {
  //     //   urls: 'stun:[STUN_IP]:[PORT]',
  //     //   'credentials': '[YOR CREDENTIALS]',
  //     //   'username': '[USERNAME]'
  //     // },
  //     {
  //       urls: "stun:stun.l.google.com:19302",
  //     },
  //   ],
  // };
  // const [users, setUsers] = useState<Array<IWebRTCUser>>([]);

  // socket.on("userEnter", (data: { id: string }) => {
  //   createReceivePC(data.id, socket);
  // });

  // socket.on("allUsers", (data: { users: Array<{ id: string }> }) => {
  //   const len = data.users.length;
  //   for (let i = 0; i < len; i++) {
  //     createReceivePC(data.users[i].id, socket);
  //   }
  // });

  // socket.on("userExit", (data: { id: string }) => {
  //   receivePCs[data.id].close();
  //   delete receivePCs[data.id];
  //   setUsers((users) => users.filter((user) => user.id !== data.id));
  // });

  // socket.on("getSenderAnswer", async (data: { sdp: RTCSessionDescription }) => {
  //   try {
  //     await sendPC.setRemoteDescription(new RTCSessionDescription(data.sdp));
  //   } catch (error) {
  //     console.log(error);
  //   }
  // });

  // socket.on("getSenderCandidate", async (data: { candidate: RTCIceCandidateInit }) => {
  //   try {
  //     if (!data.candidate) return;
  //     sendPC.addIceCandidate(new RTCIceCandidate(data.candidate));
  //   } catch (error) {
  //     console.log(error);
  //   }
  // });

  // socket.on("getReceiverAnswer", async (data: { id: string; sdp: RTCSessionDescription }) => {
  //   try {
  //     const pc: RTCPeerConnection = receivePCs[data.id];
  //     await pc.setRemoteDescription(data.sdp);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // });

  // socket.on("getReceiverCandidate", async (data: { id: string; candidate: RTCIceCandidateInit }) => {
  //   try {
  //     const pc: RTCPeerConnection = receivePCs[data.id];
  //     if (!data.candidate) return;
  //     pc.addIceCandidate(new RTCIceCandidate(data.candidate));
  //   } catch (error) {
  //     console.log(error);
  //   }
  // });

  return (
    <div css={containerStyle({ type })}>
      {member?.map((person) => (
        <Video member={person} type={type} />
      ))}
    </div>
  );
}
