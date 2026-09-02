import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Loader2 } from 'lucide-react';
import { playAudio, stopAudio } from '../../utils/audioPlayer';

interface AudioPlayButtonProps {
  audioUrl?: string;
  className?: string;
  size?: number;
  label?: string;
  iconOnly?: boolean;
  variant?: 'primary' | 'secondary' | 'ghost' | 'minimal';
  autoStopOnUnmount?: boolean;
}

export const AudioPlayButton: React.FC<AudioPlayButtonProps> = ({
  audioUrl,
  className = '',
  size = 18,
  label,
  iconOnly = false,
  variant = 'primary',
  autoStopOnUnmount = true,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    return () => {
      if (autoStopOnUnmount && isPlaying) {
        stopAudio();
      }
    };
  }, [autoStopOnUnmount, isPlaying]);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (isPlaying) {
      stopAudio();
      setIsPlaying(false);
      setIsLoading(false);
      return;
    }

    if (!audioUrl) {
      setHasError(true);
      setTimeout(() => setHasError(false), 1500);
      return;
    }

    setIsLoading(true);
    setHasError(false);

    playAudio(
      audioUrl,
      () => {
        setIsLoading(false);
        setIsPlaying(true);
      },
      () => {
        setIsLoading(false);
        setIsPlaying(false);
      },
      () => {
        setIsLoading(false);
        setIsPlaying(false);
        setHasError(true);
        setTimeout(() => setHasError(false), 2000);
      }
    );
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return isPlaying
          ? 'bg-primary text-white ring-2 ring-primary/40 shadow-lg'
          : 'bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20';
      case 'secondary':
        return isPlaying
          ? 'bg-accent text-black font-bold'
          : 'bg-surface hover:bg-background text-text-main border border-border';
      case 'minimal':
        return isPlaying
          ? 'text-primary scale-110'
          : 'text-text-muted hover:text-primary';
      case 'ghost':
      default:
        return isPlaying
          ? 'bg-primary/20 text-primary'
          : 'text-text-muted hover:text-text-main hover:bg-surface';
    }
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      title={hasError ? 'Audio coming soon' : isPlaying ? 'Stop Audio' : 'Play Audio'}
      className={`inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200 cursor-pointer disabled:opacity-50 select-none ${
        iconOnly ? 'p-2.5' : 'px-3.5 py-2 text-xs sm:text-sm'
      } ${getVariantStyles()} ${className}`}
    >
      {isLoading ? (
        <Loader2 size={size} className="animate-spin text-primary" />
      ) : hasError ? (
        <VolumeX size={size} className="text-amber-500/80" />
      ) : (
        <Volume2
          size={size}
          className={`transition-transform duration-200 ${
            isPlaying ? 'scale-115 text-white stroke-[2.5]' : ''
          }`}
        />
      )}
      {!iconOnly && label && (
        <span className={isPlaying ? 'font-bold' : ''}>
          {hasError ? 'Audio Soon' : label}
        </span>
      )}
    </button>
  );
};
