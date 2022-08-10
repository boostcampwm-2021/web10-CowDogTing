import { Socket } from "socket.io-client";
import ClientSocket from ".";
import { IWebRTCUser } from "../Common/type";

const pcConfig = {
  iceServers: [
    {
      urls: "stun:stun.l.google.com:19302",
    },
  ],
};

export const createReceiverPeerConnection = (socketID: string, newSocket: Socket, setUsers: Function) => {
  const pc = new RTCPeerConnection(pcConfig);
  ClientSocket.receivePCs = { ...ClientSocket.receivePCs, [socketID]: pc };
  pc.onicecandidate = (e) => {
    if (e.candidate) {
      newSocket.emit("receiverCandidate", {
        candidate: e.candidate,
        receiverSocketID: newSocket.id,
        senderSocketID: socketID,
      });
    }
  };
  pc.ontrack = (e) => {
    setUsers((oldUsers: any[]) =>
      oldUsers
        .filter((user) => user.id !== socketID)
        .concat({
          id: socketID,
          stream: e.streams[0],
        })
    );
  };

  return pc;
};

export const createReceivePC = (id: string, newSocket: Socket, chatRoomId: string, setUsers: Function) => {
  if (!id) return;
  try {
    const pc = createReceiverPeerConnection(id, newSocket, setUsers) as RTCPeerConnection;
    createReceiverOffer(pc, newSocket, id, chatRoomId);
  } catch (error) {
    console.log(error);
  }
};

export const createSenderOffer = async (newSocket: Socket, chatRoomId: string) => {
  try {
    const { sendPC } = ClientSocket;
    const sdp = await sendPC.createOffer({ offerToReceiveAudio: false, offerToReceiveVideo: false });
    await sendPC.setLocalDescription(new RTCSessionDescription(sdp));
    newSocket.emit("senderOffer", {
      sdp,
      senderSocketID: newSocket.id,
      roomId: chatRoomId,
    });
  } catch (error) {
    console.log(error);
  }
};

export const createReceiverOffer = async (pc: RTCPeerConnection, newSocket: Socket, senderSocketID: string, chatRoomId: string) => {
  try {
    const sdp = await pc.createOffer({ offerToReceiveAudio: true, offerToReceiveVideo: true });
    await pc.setLocalDescription(new RTCSessionDescription(sdp));
    newSocket.emit("receiverOffer", {
      sdp,
      receiverSocketID: newSocket.id,
      senderSocketID,
      roomID: chatRoomId,
    });
  } catch (error) {
    console.log(error);
  }
};

export const createSenderPeerConnection = (newSocket: Socket, localStream: MediaStream, setUsers: Function): RTCPeerConnection => {
  const pc = new RTCPeerConnection(pcConfig);

  pc.onicecandidate = (e) => {
    if (e.candidate) {
      newSocket.emit("senderCandidate", {
        candidate: e.candidate,
        senderSocketID: newSocket.id,
      });
    }
  };

  if (localStream) {
    localStream.getTracks().forEach((track) => {
      pc.addTrack(track, localStream);
    });
  }

  pc.ontrack = (e) => {
    setUsers((oldUsers: Array<IWebRTCUser>) => oldUsers.filter((user: IWebRTCUser) => user.id !== newSocket.id));
    setUsers((oldUsers: Array<IWebRTCUser>) => [
      ...oldUsers,
      {
        id: newSocket.id,
        stream: e.streams[0],
      },
    ]);
  };
  return pc;
};

export const getLocalStream = async (localStreamRef: React.MutableRefObject<MediaStream | undefined>, localVideoRef: React.RefObject<HTMLVideoElement>, setUsers: Function, chatRoomId: string, socket: Socket | undefined) => {
  if (!socket) return;
  if (!localVideoRef.current) return;

  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: {
        width: 240,
        height: 240,
      },
    });
    if (localVideoRef) localVideoRef.current.srcObject = stream;
    localStreamRef.current = stream;

    ClientSocket.sendPC = createSenderPeerConnection(socket, localStreamRef.current, setUsers);
    await createSenderOffer(socket, chatRoomId);

    socket.emit("joinRoom", {
      id: socket.id,
      chatRoomId,
    });
  } catch (e) {
    console.log(`getUserMedia error: ${e}`);
  }
};
