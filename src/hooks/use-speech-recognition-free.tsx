import { useState, useEffect, useCallback, useRef } from "react";

// Dynamic import to avoid hard dependency on @xenova/transformers
// This hook is currently unused; uncomment and add @xenova/transformers to package.json when needed
// import { pipeline } from "@xenova/transformers";

interface UseSpeechRecognitionOptions {
  language?: string;
  interimResults?: boolean;
  keywords?: string[];
  keywordBoost?: number;
  onResult?: (transcript: string, isFinal: boolean) => void;
  onError?: (error: string) => void;
}

interface UseSpeechRecognitionReturn {
  transcript: string;
  finalTranscript: string;
  isListening: boolean;
  error: string | null;
  permissionDenied: boolean;
  browserSupportsSpeech: boolean;
  isMicrophoneAvailable: boolean;
  startListening: () => Promise<void>;
  stopListening: () => void;
  toggleListening: () => Promise<void>;
  resetTranscript: () => void;
  requestMicrophonePermission: () => Promise<boolean>;
}

// Helper function to convert number words to digits for crypto commands
function normalizeNumbers(text: string): string {
  if (!text) return text;

  const numberMap: Record<string, string> = {
    zero: "0",
    one: "1",
    two: "2",
    three: "3",
    four: "4",
    five: "5",
    six: "6",
    seven: "7",
    eight: "8",
    nine: "9",
    ten: "10",
    eleven: "11",
    twelve: "12",
    thirteen: "13",
    fourteen: "14",
    fifteen: "15",
    sixteen: "16",
    seventeen: "17",
    eighteen: "18",
    nineteen: "19",
    twenty: "20",
    thirty: "30",
    forty: "40",
    fifty: "50",
    sixty: "60",
    seventy: "70",
    eighty: "80",
    ninety: "90",
    hundred: "100",
  };

  let normalized = text.toLowerCase();

  Object.entries(numberMap).forEach(([word, digit]) => {
    const regex = new RegExp(`\\b${word}\\b`, "gi");
    normalized = normalized.replace(regex, digit);
  });

  // Convert spoken decimals like "1 point 5" into "1.5".
  normalized = normalized.replace(/\b(\d+)\s+point\s+(\d+)\b/gi, "$1.$2");

  normalized = normalized.replace(/\b(sol|soul|solve|sold|salt)\b/gi, "SOL");
  normalized = normalized.replace(/\b(usdc|u s d c)\b/gi, "USDC");
  normalized = normalized.replace(/\b(jup|jupiter)\b/gi, "JUP");
  normalized = normalized.replace(/\b(eth|ethereum)\b/gi, "ETH");

  normalized = normalized.replace(/[.,!?]+$/, "");

  normalized = normalized.replace(
    /\b(send|transfer)\s+(\d+(?:\.\d+)?)\s*(SOL|USDC|JUP|ETH)\s+to\s+(?:at\s+)?@?([a-zA-Z0-9_.-]+)/i,
    (_match, _verb, amount, token, recipient) =>
      `send ${amount} ${String(token).toUpperCase()} to @${String(recipient).toLowerCase()}`,
  );

  normalized = normalized.replace(
    /\b(?:swap|exchange|convert)\s+(\d+(?:\.\d+)?)\s*(SOL|USDC|JUP|ETH)\s+(?:to|for|into)\s+(SOL|USDC|JUP|ETH)\b/i,
    (_match, amount, fromToken, toToken) =>
      `swap ${amount} ${String(fromToken).toUpperCase()} to ${String(toToken).toUpperCase()}`,
  );

  normalized = normalized.replace(/\bto\s+(?:at\s+)?(?!@)([a-zA-Z][a-zA-Z0-9_.-]*)\b/gi, "to @$1");
  normalized = normalized.replace(/\bat\s+(?!@)([a-zA-Z][a-zA-Z0-9_.-]*)\b/gi, "@$1");

  normalized = normalized.replace(
    /@([a-zA-Z0-9_.-]+)/g,
    (_m, handle) => `@${handle.toLowerCase()}`,
  );

  return normalized;
}

export function useSpeechRecognitionFree(
  options: UseSpeechRecognitionOptions = {},
): UseSpeechRecognitionReturn {
  const {
    interimResults = true,
    onResult,
    onError,
  } = options;

  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [isMicrophoneAvailable, setIsMicrophoneAvailable] = useState(true);

  const [transcript, setTranscript] = useState("");
  const [finalTranscript, setFinalTranscript] = useState("");

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const pipelineRef = useRef<ReturnType<typeof pipeline> | null>(null);
  const accumulatedRef = useRef("");
  const isTranscribingRef = useRef(false);
  const queuedAudioBlobRef = useRef<Blob | null>(null);

  const resetTranscript = useCallback(() => {
    setTranscript("");
    setFinalTranscript("");
    accumulatedRef.current = "";
  }, []);

  const requestMicrophonePermission = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach((track) => track.stop());
      setIsMicrophoneAvailable(true);
      setPermissionDenied(false);
      setError(null);
      return true;
    } catch (err) {
      console.error(err);
      setIsMicrophoneAvailable(false);
      setPermissionDenied(true);
      setError("Microphone access denied. Please allow it in the browser.");
      return false;
    }
  }, []);

  const stopListening = useCallback(() => {
    setIsListening(false);
    
    // Stop MediaRecorder
    const mediaRecorder = mediaRecorderRef.current;
    if (mediaRecorder && mediaRecorder.state !== "inactive") {
      mediaRecorder.stop();
    }
    
    // Close AudioContext
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    
    // Stop MediaStream tracks (IMPORTANT: prevents microphone from staying active)
    const stream = mediaStreamRef.current;
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }
    
    // Clean up MediaRecorder ref
    mediaRecorderRef.current = null;

// Reset transcription state
    isTranscribingRef.current = false;
    queuedAudioBlobRef.current = null;

    // Dispatch final update
    if (accumulatedRef.current && onResult) {
      const normalized = normalizeNumbers(accumulatedRef.current.trim());
      onResult(normalized, true);
    }
  }, [onResult]);

  const startListening = useCallback(async () => {
    setError(null);
    resetTranscript();

    // Reset transcription state
    isTranscribingRef.current = false;
    queuedAudioBlobRef.current = null;

    if (!isMicrophoneAvailable) {
      const granted = await requestMicrophonePermission();
      if (!granted) return;
    }

    try {
      // Load Whisper pipeline (first time loads model, subsequent calls use cache)
      if (!pipelineRef.current) {
        setTranscript("Loading speech model...");
        // Dynamically import to avoid hard dependency
        const { pipeline } = await import("@xenova/transformers");
        pipelineRef.current = await pipeline("automatic-speech-recognition", "Xenova/whisper-tiny.en");
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;
      const audioContext = new AudioContext();
      audioContextRef.current = audioContext;
      const sourceNode = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      sourceNode.connect(analyser);

      setIsListening(true);
      accumulatedRef.current = "";

      // Record chunks of audio and transcribe
      const chunks: Blob[] = [];
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      // Serialize transcriptions to prevent overlapping calls
      const transcribeAudioBlob = async (audioBlob: Blob) => {
        if (isTranscribingRef.current) {
          queuedAudioBlobRef.current = audioBlob;
          return;
        }

        isTranscribingRef.current = true;
        try {
          let nextBlob: Blob | null = audioBlob;
          while (nextBlob) {
            const currentBlob = nextBlob;
            queuedAudioBlobRef.current = null;
            const arrayBuffer = await currentBlob.arrayBuffer();

            try {
              const result = await pipelineRef.current!(arrayBuffer);
              const text = result.text || "";

              if (text) {
                accumulatedRef.current = text;

                if (interimResults) {
                  setTranscript(text);
                }

                if (onResult) {
                  const normalized = normalizeNumbers(text);
                  onResult(normalized, false);
                }
              }
            } catch (err) {
              console.error("Transcription error:", err);
            }

            nextBlob = queuedAudioBlobRef.current;
          }
        } finally {
          isTranscribingRef.current = false;
        }
      };

      mediaRecorder.addEventListener("dataavailable", (event) => {
        chunks.push(event.data);

        // Transcribe every ~3 seconds of accumulated audio, then clear chunks to avoid O(n²) cost
        if (chunks.length >= 6) {
          const windowChunks = chunks.splice(0, chunks.length);
          const audioBlob = new Blob(windowChunks, { type: "audio/webm" });
          void transcribeAudioBlob(audioBlob);
        }
      });

      mediaRecorder.addEventListener("stop", async () => {
        // Final transcription
        if (chunks.length > 0) {
          const audioBlob = new Blob(chunks, { type: "audio/webm" });
          const arrayBuffer = await audioBlob.arrayBuffer();

          try {
            const result = await pipelineRef.current!(arrayBuffer);
            const text = result.text || "";

            if (text) {
              accumulatedRef.current = text;
              setFinalTranscript(text);
              setTranscript(text);

              if (onResult) {
                const normalized = normalizeNumbers(text);
                onResult(normalized, true);
              }
            }
          } catch (err) {
            console.error("Final transcription error:", err);
          }
        }
      });

      mediaRecorder.start(500);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      console.error("Speech recognition error:", message);
      setError(message);
      if (onError) onError(message);
      setIsListening(false);
      
      // Update permission/availability state based on error type
      if (err instanceof DOMException) {
        if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") {
          setPermissionDenied(true);
          setIsMicrophoneAvailable(false);
        } else if (err.name === "NotFoundError" || err.name === "DevicesNotFoundError") {
          setIsMicrophoneAvailable(false);
        }
      }
    }
  }, [isMicrophoneAvailable, requestMicrophonePermission, interimResults, onResult, onError, resetTranscript]);

  const toggleListening = useCallback(async () => {
    if (isListening) {
      stopListening();
    } else {
      await startListening();
    }
  }, [isListening, startListening, stopListening]);

  const browserSupportsSpeech = typeof window !== "undefined" && 
    (navigator.mediaDevices?.getUserMedia || (navigator as any).webkitGetUserMedia);

  return {
    transcript,
    finalTranscript,
    isListening,
    error,
    permissionDenied,
    browserSupportsSpeech: !!browserSupportsSpeech,
    isMicrophoneAvailable,
    startListening,
    stopListening,
    toggleListening,
    resetTranscript,
    requestMicrophonePermission,
  };
}
