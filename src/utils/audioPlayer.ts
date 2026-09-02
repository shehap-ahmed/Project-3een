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
    const audio = new Audio(audioUrl);
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
 * Plays Arabic audio via file URL if provided/valid, or falls back seamlessly
 * to browser Arabic SpeechSynthesis (ar-SA) for real-time diacritics pronunciation.
 */
export const playArabicAudio = (
  audioUrl?: string,
  arabicText?: string,
  onStart?: () => void,
  onEnd?: () => void
): (() => void) => {
  stopAudio();

  const playTTS = () => {
    if (!arabicText || typeof window === 'undefined' || !('speechSynthesis' in window)) {
      if (onEnd) onEnd();
      return () => {};
    }

    try {
      const utterance = new SpeechSynthesisUtterance(arabicText);
      utterance.lang = 'ar-SA';
      utterance.rate = 0.8;
      utterance.pitch = 1.0;

      utterance.onstart = () => {
        if (onStart) onStart();
      };
      utterance.onend = () => {
        if (onEnd) onEnd();
      };
      utterance.onerror = () => {
        if (onEnd) onEnd();
      };

      window.speechSynthesis.speak(utterance);
      return () => {
        window.speechSynthesis.cancel();
      };
    } catch (e) {
      if (onEnd) onEnd();
      return () => {};
    }
  };

  if (audioUrl && audioUrl.trim() !== '') {
    return playAudio(
      audioUrl,
      onStart,
      onEnd,
      () => {
        // Audio file failed to load / 404 -> fallback to TTS
        playTTS();
      }
    );
  }

  return playTTS();
};

