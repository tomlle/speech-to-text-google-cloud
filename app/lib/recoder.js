import Encoder from "./encoder.js";

export default class {
  constructor() {

    this.bufferSize = 4096;

    this.wavSamples = [];
    this.stream = null;
    this.context = null;
    this.input = null;
    this.processor = null;
  }

  async start() {
    this.stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false,
    });
    this.captureStart();
  }

  stop() {
    // デバイスの開放。これをしないとマイクがずっとキャプチャ状態になる
    this.stream.getTracks().forEach((track) => track.stop());
    this.input.disconnect();
    this.processor.disconnect();
    this.context.close();

    const encoder = new Encoder({
      bufferSize: this.bufferSize,
      sampleRate: this.context.sampleRate,
      samples: this.wavSamples,
    });
    const audioBlob = encoder.exportWav();
    this.wavSamples = [];

    return audioBlob;
  }

  captureStart() {
    this.context = new window.AudioContext();
    this.input = this.context.createMediaStreamSource(this.stream);
    this.processor = this.context.createScriptProcessor(this.bufferSize, 1, 1);

    this.processor.onaudioprocess = (ev) => {
      const sample = ev.inputBuffer.getChannelData(0);
      this.wavSamples.push(new Float64Array(sample));
    };

    this.input.connect(this.processor);
    this.processor.connect(this.context.destination);
  }
}
