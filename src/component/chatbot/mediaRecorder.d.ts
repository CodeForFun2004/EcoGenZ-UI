// TypeScript declarations for MediaRecorder API

interface MediaRecorderOptions {
  mimeType?: string;
  audioBitsPerSecond?: number;
  videoBitsPerSecond?: number;
  bitsPerSecond?: number;
}

interface MediaRecorderDataAvailableEvent extends Event {
  data: Blob;
}

interface MediaRecorderErrorEvent extends Event {
  error: DOMException;
}

interface MediaRecorder extends EventTarget {
  readonly state: "inactive" | "recording" | "paused";
  readonly stream: MediaStream;
  readonly mimeType: string;
  ondataavailable: ((event: MediaRecorderDataAvailableEvent) => void) | null;
  onerror: ((event: MediaRecorderErrorEvent) => void) | null;
  onpause: ((event: Event) => void) | null;
  onresume: ((event: Event) => void) | null;
  onstart: ((event: Event) => void) | null;
  onstop: ((event: Event) => void) | null;

  start(timeslice?: number): void;
  stop(): void;
  pause(): void;
  resume(): void;
  requestData(): void;

  addEventListener(type: string, listener: EventListener): void;
  removeEventListener(type: string, listener: EventListener): void;
}

const MediaRecorder: {
  prototype: MediaRecorder;
  new (stream: MediaStream, options?: MediaRecorderOptions): MediaRecorder;
  isTypeSupported(type: string): boolean;
};

// Extend Window interface
interface Window {
  MediaRecorder: typeof MediaRecorder;
  webkitAudioContext: typeof AudioContext;
}
