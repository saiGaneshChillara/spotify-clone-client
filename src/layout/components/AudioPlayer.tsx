import { usePlayerStore } from "@/stores/usePlayerStore";
import { useEffect, useRef } from "react";

const AudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const prevSongRef = useRef<string | null>(null);

  const { currentSong, isPlaying, playNext } = usePlayerStore();

  //this useEffect handles pause and play
  useEffect(() => {
    if (isPlaying) audioRef.current?.play();
    else audioRef.current?.pause();
  }, [isPlaying]);

  // this useEffect plays next song
  useEffect(() => {
    const audioElement = audioRef.current;
    const handleEnded = () => {
      playNext();
    };
    audioElement?.addEventListener('ended', handleEnded);

    return () => audioElement?.removeEventListener('ended', handleEnded);
  }, [playNext]);

  //this useEffect handles song changes
  useEffect(() => {
    if (!audioRef.current || !currentSong) return;
    
    const audioElement = audioRef.current;

    const isSongChange = prevSongRef.current !== currentSong?.audioUrl;
    if (isSongChange) {
      audioElement.src = currentSong.audioUrl;
      audioElement.currentTime = 0;
      prevSongRef.current = currentSong.audioUrl;
    }

    if (isPlaying) audioElement.play();
  }, [currentSong, isPlaying]);

  return (
    <audio ref={audioRef} />
  );
};

export default AudioPlayer;