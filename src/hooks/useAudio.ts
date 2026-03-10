import { useState, useEffect, useRef, useCallback } from 'react';

export const useAudio = () => {
  const [volume, setVolume] = useState(100);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio('/background-music.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = volume / 100;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  const play = useCallback(() => {
    if (audioRef.current && !isPlaying) {
      audioRef.current.play().catch(error => {
        console.log('Audio play failed:', error);
      });
      setIsPlaying(true);
    }
  }, [isPlaying]);

  const pause = useCallback(() => {
    if (audioRef.current && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, [isPlaying]);

  const changeVolume = useCallback((newVolume: number) => {
    setVolume(Math.max(0, Math.min(100, newVolume)));
  }, []);

  return {
    volume,
    isPlaying,
    play,
    pause,
    changeVolume
  };
};
