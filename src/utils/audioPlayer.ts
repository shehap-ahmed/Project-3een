// Audio manager utility for Practice Path
let currentAudio: HTMLAudioElement | null = null;
let currentListener: (() => void) | null = null;

export const playAudio = (
  audioUrl?: string,
  onStart?: () => void,
  onEnd?: () => void,
  onError?: (err: any) => void
): (() => void) => {
  stopAudio();

  if (!audioUrl || audioUrl.trim() === '') {
    // If no audio file specified, call onError and clean up
    if (onError) onError(new Error('No audio URL provided'));
    return () => {};
  }

  try {
    const safeUrl = encodeURI(decodeURI(audioUrl));
    const audio = new Audio(safeUrl);
    audio.preload = 'auto';
    currentAudio = audio;

    const handleEnded = () => {
      if (currentAudio === audio) {
        currentAudio = null;
      }
      if (onEnd) onEnd();
    };

    const handleError = (e: Event) => {
      console.warn(`Audio playback failed for "${audioUrl}":`, e);
      if (currentAudio === audio) {
        currentAudio = null;
      }
      if (onError) onError(e);
      if (onEnd) onEnd();
    };

    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    currentListener = () => {
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
      audio.pause();
    };

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          if (onStart) onStart();
        })
        .catch((err) => {
          console.warn(`Audio play promise rejected for "${audioUrl}":`, err);
          if (onError) onError(err);
          if (onEnd) onEnd();
        });
    }

    return () => {
      if (currentListener) {
        currentListener();
        currentListener = null;
      }
      if (currentAudio === audio) {
        currentAudio = null;
      }
    };
  } catch (err) {
    console.warn('Failed to initialize Audio element:', err);
    if (onError) onError(err);
    if (onEnd) onEnd();
    return () => {};
  }
};

export const stopAudio = () => {
  if (currentListener) {
    currentListener();
    currentListener = null;
  }
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
};

/**
 * Plays Arabic audio via file URL only.
 * Artificial sound / AI SpeechSynthesis fallback is completely disabled.
 */
export const playArabicAudio = (
  audioUrl?: string,
  _arabicText?: string,
  onStart?: () => void,
  onEnd?: () => void
): (() => void) => {
  stopAudio();

  if (audioUrl && audioUrl.trim() !== '') {
    return playAudio(
      audioUrl,
      onStart,
      onEnd,
      () => {
        // Audio file failed to load / 404 - artificial sound is disabled
        if (onEnd) onEnd();
      }
    );
  }

  // No audio file provided - do not generate artificial sound
  if (onEnd) onEnd();
  return () => {};
};

