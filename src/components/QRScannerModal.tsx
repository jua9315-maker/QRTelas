import React, { useEffect, useRef, useState } from 'react';
import jsQR from 'jsqr';
import { X, RefreshCw, QrCode, AlertCircle } from 'lucide-react';

interface QRScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onScanSuccess: (qrCode: string) => void;
}

export const QRScannerModal: React.FC<QRScannerModalProps> = ({
  isOpen,
  onClose,
  onScanSuccess,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');

  const requestRef = useRef<number | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Stop video stream
  const stopStream = () => {
    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
      requestRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsScanning(false);
  };

  // Start video stream
  const startCamera = async () => {
    stopStream();
    setErrorMessage(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: facingMode, width: { ideal: 1280 }, height: { ideal: 720 } },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.setAttribute('playsinline', 'true'); // Required for iOS
        await videoRef.current.play();
        setHasCameraPermission(true);
        setIsScanning(true);
        requestRef.current = requestAnimationFrame(scanTick);
      }
    } catch (err: unknown) {
      console.warn('Camera access error:', err);
      setHasCameraPermission(false);
      setErrorMessage('No se pudo acceder a la cámara. Por favor autoriza el acceso a la cámara.');
    }
  };

  useEffect(() => {
    if (isOpen) {
      startCamera();
    } else {
      stopStream();
    }
    return () => {
      stopStream();
    };
  }, [isOpen, facingMode]);

  // Frame tick scan logic with jsQR
  const scanTick = () => {
    if (videoRef.current && videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (ctx) {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const code = jsQR(imageData.data, imageData.width, imageData.height, {
            inversionAttempts: 'dontInvert',
          });

          if (code && code.data) {
            stopStream();
            onScanSuccess(code.data);
            return;
          }
        }
      }
    }
    if (isOpen) {
      requestRef.current = requestAnimationFrame(scanTick);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/90 backdrop-blur-md flex flex-col items-center justify-between p-4 animate-in fade-in duration-200">
      {/* Top Controls Bar */}
      <div className="w-full max-w-md flex items-center justify-between z-20 text-white">
        <div className="flex items-center gap-2">
          <QrCode className="w-6 h-6 text-amber-400" />
          <span className="font-extrabold text-base tracking-wide">Escaneando QRTelas</span>
        </div>

        <div className="flex items-center gap-2">
          {hasCameraPermission && (
            <button
              onClick={() => setFacingMode((prev) => (prev === 'environment' ? 'user' : 'environment'))}
              className="p-2 rounded-full bg-stone-800/80 hover:bg-stone-700 text-stone-200"
              title="Cambiar Cámara"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
          )}
          <button
            onClick={() => {
              stopStream();
              onClose();
            }}
            className="p-2 rounded-full bg-stone-800/80 hover:bg-stone-700 text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Main Viewport Scanner Frame */}
      <div className="relative w-full max-w-md my-auto aspect-square rounded-3xl overflow-hidden border-2 border-stone-800 bg-black shadow-2xl flex items-center justify-center">
        {/* Hidden Canvas for QR parsing */}
        <canvas ref={canvasRef} className="hidden" />

        {/* Video feed */}
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          playsInline
          muted
        />

        {/* Scanning Overlay Reticle */}
        <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center p-8">
          <div className="relative w-64 h-64 border-2 border-amber-400/60 rounded-3xl shadow-[0_0_0_9999px_rgba(0,0,0,0.65)] overflow-hidden">
            {/* Animated Laser Scanning Line */}
            {isScanning && (
              <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent shadow-[0_0_15px_#f59e0b] animate-[bounce_2s_infinite]" />
            )}

            {/* Corner Bracket Accents */}
            <div className="absolute top-2 left-2 w-6 h-6 border-t-4 border-l-4 border-amber-400 rounded-tl-lg" />
            <div className="absolute top-2 right-2 w-6 h-6 border-t-4 border-r-4 border-amber-400 rounded-tr-lg" />
            <div className="absolute bottom-2 left-2 w-6 h-6 border-b-4 border-l-4 border-amber-400 rounded-bl-lg" />
            <div className="absolute bottom-2 right-2 w-6 h-6 border-b-4 border-r-4 border-amber-400 rounded-br-lg" />
          </div>
          <p className="mt-4 text-xs font-semibold text-amber-300 tracking-wider uppercase bg-black/60 px-3 py-1 rounded-full border border-amber-400/30">
            Centra el código QR en el cuadro
          </p>
        </div>

        {/* Error message if camera fails */}
        {errorMessage && (
          <div className="absolute inset-0 bg-stone-900/95 p-6 flex flex-col items-center justify-center text-center text-stone-200 space-y-3 z-10">
            <AlertCircle className="w-12 h-12 text-amber-500" />
            <p className="text-sm font-medium">{errorMessage}</p>
            <button
              onClick={startCamera}
              className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider"
            >
              Reintentar Cámara
            </button>
          </div>
        )}
      </div>

      <div className="w-full max-w-md py-2 text-center text-stone-400 text-xs">
        Enfoca el código QR impreso en la etiqueta de la tela
      </div>
    </div>
  );
};
