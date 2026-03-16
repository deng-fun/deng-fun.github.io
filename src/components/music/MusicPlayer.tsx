/**
 * Music Player Component
 *
 * A beautiful music player that matches the site's design style.
 */

import { Icon } from '@iconify/react';
import { cn } from '@lib/utils';
import { AnimatePresence, motion } from 'motion/react';
import { useCallback, useEffect, useRef, useState } from 'react';

interface Track {
  id: string;
  title: string;
  artist: string;
  cover: string;
  url: string;
}

interface MusicConfig {
  songs: Track[];
}

function formatTime(seconds: number): string {
  if (isNaN(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export default function MusicPlayer() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaylistOpen, setIsPlaylistOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [showPlayer, setShowPlayer] = useState(true);

  // 加载音乐配置
  useEffect(() => {
    fetch('/music-config.json')
      .then((res) => res.json())
      .then((config: MusicConfig) => {
        if (config.songs && config.songs.length > 0) {
          setTracks(config.songs);
        }
      })
      .catch((err) => {
        console.error('加载音乐配置失败:', err);
        // 使用默认配置作为备用
        setTracks([
          {
            id: '1',
            title: '示例歌曲',
            artist: '示例艺术家',
            cover: 'https://picsum.photos/seed/default/200/200',
            url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
          },
        ]);
      });
  }, []);

  const currentTrack = tracks[currentTrackIndex];

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch((e) => console.error('播放失败:', e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrackIndex]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleEnded = () => handleNext();

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentTrackIndex]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const togglePlay = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  const handleNext = useCallback(() => {
    if (tracks.length === 0) return;
    setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
    setIsPlaying(true);
  }, [tracks.length]);

  const handlePrev = useCallback(() => {
    if (tracks.length === 0) return;
    setCurrentTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
    setIsPlaying(true);
  }, [tracks.length]);

  const handleSeek = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  }, []);

  const handleVolumeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
  }, []);

  const selectTrack = useCallback((index: number) => {
    setCurrentTrackIndex(index);
    setIsPlaying(true);
    setIsPlaylistOpen(false);
  }, []);

  // 如果没有歌曲，显示提示
  if (tracks.length === 0) {
    return (
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed right-4 bottom-4 z-50 w-80 rounded-2xl bg-background/90 p-4 shadow-xl backdrop-blur-md dark:bg-background/95"
      >
        <h3 className="mb-2 text-sm font-semibold text-primary">音乐播放器</h3>
        <p className="text-sm text-muted-foreground">暂无歌曲，请添加歌曲到配置文件</p>
        <p className="mt-2 text-xs text-muted-foreground">配置文件: public/music-config.json</p>
      </motion.div>
    );
  }

  if (!showPlayer) {
    return (
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="fixed right-4 bottom-4 z-50 rounded-full bg-background/80 p-3 shadow-lg backdrop-blur-sm transition-all hover:bg-background"
        onClick={() => setShowPlayer(true)}
        aria-label="显示音乐播放器"
      >
        <Icon icon="ri:music-2-fill" className="h-6 w-6 text-primary" />
      </motion.button>
    );
  }

  return (
    <>
      <audio ref={audioRef} src={currentTrack.url} preload="metadata" />

      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed right-4 bottom-4 z-50 w-80 rounded-2xl bg-background/90 p-4 shadow-xl backdrop-blur-md dark:bg-background/95"
      >
        {/* 播放器头部 */}
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-primary">音乐播放器</h3>
          <div className="flex gap-2">
            <button
              onClick={() => setIsPlaylistOpen((prev) => !prev)}
              className="rounded-full p-1 hover:bg-accent"
              aria-label="播放列表"
            >
              <Icon icon="ri:playlist-2-fill" className="h-4 w-4" />
            </button>
            <button
              onClick={() => setShowPlayer(false)}
              className="rounded-full p-1 hover:bg-accent"
              aria-label="隐藏播放器"
            >
              <Icon icon="ri:subtract-line" className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* 专辑封面和歌曲信息 */}
        <div className="mb-3 flex gap-3">
          <div className="relative h-16 w-16 overflow-hidden rounded-lg">
            <img
              src={currentTrack.cover}
              alt={currentTrack.title}
              className={cn('h-full w-full object-cover', isPlaying && 'animate-spin-slow')}
            />
            {isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                <div className="flex gap-1">
                  <motion.div
                    animate={{ height: [10, 20, 10] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                    className="w-1 rounded-full bg-primary"
                  />
                  <motion.div
                    animate={{ height: [15, 25, 15] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.15 }}
                    className="w-1 rounded-full bg-primary"
                  />
                  <motion.div
                    animate={{ height: [8, 18, 8] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.3 }}
                    className="w-1 rounded-full bg-primary"
                  />
                </div>
              </div>
            )}
          </div>
          <div className="flex flex-1 flex-col justify-center">
            <h4 className="truncate text-sm font-semibold">{currentTrack.title}</h4>
            <p className="truncate text-xs text-muted-foreground">{currentTrack.artist}</p>
          </div>
        </div>

        {/* 进度条 */}
        <div className="mb-3">
          <input
            type="range"
            min={0}
            max={duration || 100}
            value={currentTime}
            onChange={handleSeek}
            className="h-1 w-full cursor-pointer rounded-full bg-accent accent-primary"
          />
          <div className="mt-1 flex justify-between text-xs text-muted-foreground">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* 控制按钮 */}
        <div className="mb-3 flex items-center justify-center gap-4">
          <button onClick={handlePrev} className="rounded-full p-2 hover:bg-accent" aria-label="上一首">
            <Icon icon="ri:skip-back-fill" className="h-5 w-5" />
          </button>
          <button
            onClick={togglePlay}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105"
            aria-label={isPlaying ? '暂停' : '播放'}
          >
            <Icon icon={isPlaying ? 'ri:pause-fill' : 'ri:play-fill'} className="h-6 w-6" />
          </button>
          <button onClick={handleNext} className="rounded-full p-2 hover:bg-accent" aria-label="下一首">
            <Icon icon="ri:skip-forward-fill" className="h-5 w-5" />
          </button>
        </div>

        {/* 音量控制 */}
        <div className="flex items-center gap-2">
          <button onClick={toggleMute} className="rounded-full p-1 hover:bg-accent" aria-label={isMuted ? '取消静音' : '静音'}>
            <Icon
              icon={isMuted || volume === 0 ? 'ri:volume-mute-fill' : volume < 0.5 ? 'ri:volume-down-fill' : 'ri:volume-up-fill'}
              className="h-4 w-4"
            />
          </button>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="h-1 flex-1 cursor-pointer rounded-full bg-accent accent-primary"
          />
        </div>
      </motion.div>

      {/* 播放列表面板 */}
      <AnimatePresence>
        {isPlaylistOpen && (
          <motion.div
            initial={{ x: 320, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 320, opacity: 0 }}
            className="fixed right-4 bottom-36 z-40 w-80 max-h-64 overflow-hidden rounded-2xl bg-background/95 shadow-xl backdrop-blur-md dark:bg-background/98"
          >
            <div className="max-h-64 overflow-y-auto p-2">
              {tracks.map((track, index) => (
                <button
                  key={track.id}
                  onClick={() => selectTrack(index)}
                  className={cn(
                    'mb-1 flex w-full items-center gap-3 rounded-xl p-2 text-left transition-colors hover:bg-accent',
                    index === currentTrackIndex && 'bg-accent',
                  )}
                >
                  <div className="relative h-10 w-10 overflow-hidden rounded-lg">
                    <img src={track.cover} alt={track.title} className="h-full w-full object-cover" />
                    {index === currentTrackIndex && isPlaying && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                        <div className="flex gap-0.5">
                          <motion.div
                            animate={{ height: [6, 14, 6] }}
                            transition={{ duration: 0.5, repeat: Infinity, delay: 0 }}
                            className="w-0.5 rounded-full bg-white"
                          />
                          <motion.div
                            animate={{ height: [10, 18, 10] }}
                            transition={{ duration: 0.5, repeat: Infinity, delay: 0.15 }}
                            className="w-0.5 rounded-full bg-white"
                          />
                          <motion.div
                            animate={{ height: [8, 16, 8] }}
                            transition={{ duration: 0.5, repeat: Infinity, delay: 0.3 }}
                            className="w-0.5 rounded-full bg-white"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className={cn('text-sm font-medium', index === currentTrackIndex && 'text-primary')}>{track.title}</p>
                    <p className="text-xs text-muted-foreground">{track.artist}</p>
                  </div>
                  {index === currentTrackIndex && <Icon icon="ri:volume-up-fill" className="h-4 w-4 text-primary" />}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 10s linear infinite;
        }
      `}</style>
    </>
  );
}
