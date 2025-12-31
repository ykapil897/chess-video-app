import { socket } from "./socket";

const config: RTCConfiguration = {
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }]
};

export class WebRTC {
  pc: RTCPeerConnection;
  localStream!: MediaStream;

  constructor(
    private gameId: string,
    private onRemoteStream: (s: MediaStream) => void,
    private onLocalStream?: (s: MediaStream) => void
  ) {
    this.pc = new RTCPeerConnection(config);

    this.pc.onicecandidate = (e) => {
      if (e.candidate) {
        socket.emit("webrtc-ice", {
          gameId: this.gameId,
          candidate: e.candidate
        });
      }
    };

    this.pc.ontrack = (e) => {
      this.onRemoteStream(e.streams[0]);
    };

    socket.on("webrtc-offer", async (offer) => {

      // START LOCAL MEDIA FOR CALLEE
      if (!this.localStream) {
        this.localStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true
        });

        this.localStream.getTracks().forEach(t =>
          this.pc.addTrack(t, this.localStream)
        );

        // 👇 ATTACH LOCAL VIDEO FOR BLACK
        this.onLocalStream?.(this.localStream);
      }


      await this.pc.setRemoteDescription(offer);
      const answer = await this.pc.createAnswer();
      await this.pc.setLocalDescription(answer);

      socket.emit("webrtc-answer", {
        gameId: this.gameId,
        answer
      });
    });

    socket.on("webrtc-answer", async (answer) => {
      await this.pc.setRemoteDescription(answer);
    });

    socket.on("webrtc-ice", async (candidate) => {
      await this.pc.addIceCandidate(candidate);
    });
  }

  async start(isCaller: boolean) {
    this.localStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    });

    this.localStream.getTracks().forEach((t) =>
      this.pc.addTrack(t, this.localStream)
    );

    if (isCaller) {
      const offer = await this.pc.createOffer();
      await this.pc.setLocalDescription(offer);

      socket.emit("webrtc-offer", {
        gameId: this.gameId,
        offer
      });
    }

    return this.localStream;
  }

  // add inside WebRTC class

    toggleAudio(enabled: boolean) {
    if (!this.localStream) return;
    this.localStream.getAudioTracks().forEach(t => {
        t.enabled = enabled;
    });
    }

    toggleVideo(enabled: boolean) {
    if (!this.localStream) return;
    this.localStream.getVideoTracks().forEach(t => {
        t.enabled = enabled;
    });
    }

}
