"use client";

import { Play, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface VideoPlayerWithModalProps {
  src: string;
  className?: string;
  thumbnailClassName?: string;
  modalClassName?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  controls?: boolean;
}

export function VideoPlayerWithModal({
  src,
  className = "mx-auto max-w-screen-3xl",
  thumbnailClassName = "",
  modalClassName = "max-w-3/5",
  autoPlay = false,
  muted = true,
  loop = true,
  controls = true,
}: VideoPlayerWithModalProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Handle mounting for client-side portal
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  // Handle escape key and click outside
  useEffect(() => {
    if (!isModalOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsModalOpen(false);
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setIsModalOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("mousedown", handleClickOutside);

    // Lock body scroll
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  // Play video when modal opens
  useEffect(() => {
    if (isModalOpen && videoRef.current) {
      videoRef.current
        .play()
        .catch((err) => console.error("Error playing video:", err));
    }
  }, [isModalOpen]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className={`relative overflow-hidden group ${className}`}>
        {/* Video thumbnail */}
        <div className="relative">
          <video
            src={src}
            autoPlay={autoPlay}
            playsInline
            className={`${thumbnailClassName} mt-0! mb-0!`}
            muted={muted}
            loop={loop}
          />

          {/* Play button overlay that appears on hover */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={openModal}
              className="bg-white/90 hover:bg-white text-black rounded-full p-4 transition-transform duration-300 transform hover:scale-110"
              aria-label="Play video"
            >
              <Play className="h-8 w-8" />
            </button>
          </div>
        </div>
      </div>

      {/* Custom Modal */}
      {isMounted &&
        isModalOpen &&
        createPortal(
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm animate-in fade-in duration-300">
            <div
              ref={modalRef}
              className={`relative ${modalClassName} animate-in zoom-in-95 duration-300`}
            >
              <button
                onClick={closeModal}
                className="absolute -top-7 right-0 text-white hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-white/20 rounded-full p-1"
                aria-label="Close modal"
              >
                <X className="h-6 w-6" />
              </button>

              <video
                ref={videoRef}
                src={src}
                controls={controls}
                autoPlay
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
