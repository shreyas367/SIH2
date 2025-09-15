"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import io from "socket.io-client";
import Peer from "simple-peer";

let socket: any;

interface PeerObject { peerId: string; peer: Peer.Instance; stream: MediaStream }

export default function VideoCall() {
  const { roomId } = useParams();
  const [peers, setPeers] = useState<PeerObject[]>([]);
  const myVideo = useRef<HTMLVideoElement>(null);
  const peersRef = useRef<PeerObject[]>([]);

  useEffect(() => {
    if (!socket) socket = io("/api/socket");

    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
      if (myVideo.current) myVideo.current.srcObject = stream;

      socket.emit("join-room", { roomId });

      socket.on("user-joined", ({ signal, callerId }: { signal: any; callerId: string }) => {
        const peer = new Peer({ initiator: false, trickle: false, stream });
        if (signal) peer.signal(signal);

        peer.on("signal", (sig) => socket.emit("return-signal", { signal: sig, to: callerId }));
        peer.on("stream", (userStream) => {
          peersRef.current.push({ peerId: callerId, peer, stream: userStream });
          setPeers([...peersRef.current]);
        });
      });

      socket.on("receiving-returned-signal", ({ signal, id }: { signal: any; id: string }) => {
        const item = peersRef.current.find(p => p.peerId === id);
        if (item) item.peer.signal(signal);
      });
    });

    return () => socket.disconnect();
  }, [roomId]);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "80vh", background: "#203a43", color: "white" }}>
      <h1>Room: {roomId}</h1>
      <video ref={myVideo} autoPlay muted playsInline style={{ width: "400px" }} />
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {peers.map(p => <Video key={p.peerId} stream={p.stream} />)}
      </div>
    </div>
  );
}

function Video({ stream }: { stream: MediaStream }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => { if (ref.current) ref.current.srcObject = stream; }, [stream]);
  return <video ref={ref} autoPlay playsInline style={{ width: "300px" }} />;
}
