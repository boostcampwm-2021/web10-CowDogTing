// export const createReceivePC = (id: string, newSocket: SocketIOClient.Socket) => {
//   try {
//     let pc = createReceiverPeerConnection(id, newSocket);
//     createReceiverOffer(pc, newSocket, id);
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const createSenderOffer = async (newSocket: SocketIOClient.Socket) => {
//   try {
//     let sdp = await sendPC.createOffer({ offerToReceiveAudio: false, offerToReceiveVideo: false });
//     await sendPC.setLocalDescription(new RTCSessionDescription(sdp));

//     newSocket.emit("senderOffer", {
//       sdp,
//       senderSocketID: newSocket.id,
//       roomID: "1234",
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const createReceiverOffer = async (pc: RTCPeerConnection, newSocket: SocketIOClient.Socket, senderSocketID: string) => {
//   try {
//     let sdp = await pc.createOffer({ offerToReceiveAudio: true, offerToReceiveVideo: true });
//     await pc.setLocalDescription(new RTCSessionDescription(sdp));

//     newSocket.emit("receiverOffer", {
//       sdp,
//       receiverSocketID: newSocket.id,
//       senderSocketID,
//       roomID: "1234",
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const createSenderPeerConnection = (newSocket: SocketIOClient.Socket, localStream: MediaStream): RTCPeerConnection => {
//   let pc = new RTCPeerConnection(pc_config);

//   pc.onicecandidate = (e) => {
//     if (e.candidate) {
//       newSocket.emit("senderCandidate", {
//         candidate: e.candidate,
//         senderSocketID: newSocket.id,
//       });
//     }
//   };

//   pc.oniceconnectionstatechange = (e) => {
//     console.log(e);
//   };

//   if (localStream) {
//     console.log("localstream add");
//     localStream.getTracks().forEach((track) => {
//       pc.addTrack(track, localStream);
//     });
//   } else {
//     console.log("no local stream");
//   }

//   // return pc
//   return pc;
// };

// export const createReceiverPeerConnection = (socketID: string, newSocket: SocketIOClient.Socket): RTCPeerConnection => {
//   let pc = new RTCPeerConnection(pc_config);

//   // add pc to peerConnections object
//   receivePCs = { ...receivePCs, [socketID]: pc };

//   pc.onicecandidate = (e) => {
//     if (e.candidate) {
//       newSocket.emit("receiverCandidate", {
//         candidate: e.candidate,
//         receiverSocketID: newSocket.id,
//         senderSocketID: socketID,
//       });
//     }
//   };

//   pc.oniceconnectionstatechange = (e) => {
//     console.log(e);
//   };

//   pc.ontrack = (e) => {
//     setUsers((oldUsers) => oldUsers.filter((user) => user.id !== socketID));
//     setUsers((oldUsers) => [
//       ...oldUsers,
//       {
//         id: socketID,
//         stream: e.streams[0],
//       },
//     ]);
//   };

//   // return pc
//   return pc;
// };

export {};
