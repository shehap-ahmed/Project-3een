import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, Check } from 'lucide-react';
import { playArabicAudio, stopAudio } from '../../../utils/audioPlayer';

export interface ArabicLetterHarakahItem {
  id: string;
  arabic: string;
  name: string;
  transliterationRoot: string;
  // Specific combined forms (handles Alif with Hamza correctly: أَ, إِ, أُ)
  fathaText?: string;
  kasraText?: string;
  dammaText?: string;
  // Pronunciations
  fathaPronunciation: string;
  kasraPronunciation: string;
  dammaPronunciation: string;
  // Audio files if present
  fathaAudio?: string;
  kasraAudio?: string;
  dammaAudio?: string;
}

export const ARABIC_ALPHABET_HARAKAT: ArabicLetterHarakahItem[] = [
  {
    id: 'alif',
    arabic: 'ا',
    name: 'Alif',
    transliterationRoot: 'ʼ',
    fathaText: 'أَ',
    kasraText: 'إِ',
    dammaText: 'أُ',
    fathaPronunciation: 'ʼa (a)',
    kasraPronunciation: 'ʼi (i)',
    dammaPronunciation: 'ʼu (u)',
  },
  {
    id: 'baa',
    arabic: 'ب',
    name: 'Bāʼ',
    transliterationRoot: 'b',
    fathaPronunciation: 'ba',
    kasraPronunciation: 'bi',
    dammaPronunciation: 'bu',
    fathaAudio: '/audio/practice/c1/harakat/ba.mp3',
    kasraAudio: '/audio/practice/c1/harakat/bi.mp3',
    dammaAudio: '/audio/practice/c1/harakat/bu.mp3',
  },
  {
    id: 'taa',
    arabic: 'ت',
    name: 'Tāʼ',
    transliterationRoot: 't',
    fathaPronunciation: 'ta',
    kasraPronunciation: 'ti',
    dammaPronunciation: 'tu',
    fathaAudio: '/audio/practice/c1/harakat/ta.mp3',
    kasraAudio: '/audio/practice/c1/harakat/ti.mp3',
    dammaAudio: '/audio/practice/c1/harakat/tu.mp3',
  },
  {
    id: 'thaa',
    arabic: 'ث',
    name: 'Thāʼ',
    transliterationRoot: 'th',
    fathaPronunciation: 'tha',
    kasraPronunciation: 'thi',
    dammaPronunciation: 'thu',
  },
  {
    id: 'jeem',
    arabic: 'ج',
    name: 'Jīm',
    transliterationRoot: 'j',
    fathaPronunciation: 'ja',
    kasraPronunciation: 'ji',
    dammaPronunciation: 'ju',
  },
  {
    id: 'haa_pharyngeal',
    arabic: 'ح',
    name: 'Ḥāʼ',
    transliterationRoot: 'ḥ',
    fathaPronunciation: 'ḥa',
    kasraPronunciation: 'ḥi',
    dammaPronunciation: 'ḥu',
  },
  {
    id: 'khaa',
    arabic: 'خ',
    name: 'Khāʼ',
    transliterationRoot: 'kh',
    fathaPronunciation: 'kha',
    kasraPronunciation: 'khi',
    dammaPronunciation: 'khu',
  },
  {
    id: 'daal',
    arabic: 'د',
    name: 'Dāl',
    transliterationRoot: 'd',
    fathaPronunciation: 'da',
    kasraPronunciation: 'di',
    dammaPronunciation: 'du',
    fathaAudio: '/audio/practice/c1/harakat/da.mp3',
    kasraAudio: '/audio/practice/c1/harakat/di.mp3',
    dammaAudio: '/audio/practice/c1/harakat/du.mp3',
  },
  {
    id: 'dhaal',
    arabic: 'ذ',
    name: 'Dhāl',
    transliterationRoot: 'dh',
    fathaPronunciation: 'dha',
    kasraPronunciation: 'dhi',
    dammaPronunciation: 'dhu',
  },
  {
    id: 'raa',
    arabic: 'ر',
    name: 'Rāʼ',
    transliterationRoot: 'r',
    fathaPronunciation: 'ra',
    kasraPronunciation: 'ri',
    dammaPronunciation: 'ru',
    fathaAudio: '/audio/practice/c1/harakat/ra.mp3',
    kasraAudio: '/audio/practice/c1/harakat/ri.mp3',
    dammaAudio: '/audio/practice/c1/harakat/ru.mp3',
  },
  {
    id: 'zaay',
    arabic: 'ز',
    name: 'Zāy',
    transliterationRoot: 'z',
    fathaPronunciation: 'za',
    kasraPronunciation: 'zi',
    dammaPronunciation: 'zu',
  },
  {
    id: 'seen',
    arabic: 'س',
    name: 'Sīn',
    transliterationRoot: 's',
    fathaPronunciation: 'sa',
    kasraPronunciation: 'si',
    dammaPronunciation: 'su',
  },
  {
    id: 'sheen',
    arabic: 'ش',
    name: 'Shīn',
    transliterationRoot: 'sh',
    fathaPronunciation: 'sha',
    kasraPronunciation: 'shi',
    dammaPronunciation: 'shu',
  },
  {
    id: 'saad',
    arabic: 'ص',
    name: 'Ṣād',
    transliterationRoot: 'ṣ',
    fathaPronunciation: 'ṣa',
    kasraPronunciation: 'ṣi',
    dammaPronunciation: 'ṣu',
  },
  {
    id: 'daad',
    arabic: 'ض',
    name: 'Ḍād',
    transliterationRoot: 'ḍ',
    fathaPronunciation: 'ḍa',
    kasraPronunciation: 'ḍi',
    dammaPronunciation: 'ḍu',
  },
  {
    id: 'taa_emphatic',
    arabic: 'ط',
    name: 'Ṭāʼ',
    transliterationRoot: 'ṭ',
    fathaPronunciation: 'ṭa',
    kasraPronunciation: 'ṭi',
    dammaPronunciation: 'ṭu',
  },
  {
    id: 'zaa_emphatic',
    arabic: 'ظ',
    name: 'Ẓāʼ',
    transliterationRoot: 'ẓ',
    fathaPronunciation: 'ẓa',
    kasraPronunciation: 'ẓi',
    dammaPronunciation: 'ẓu',
  },
  {
    id: 'ayn',
    arabic: 'ع',
    name: 'ʻAyn',
    transliterationRoot: 'ʻ',
    fathaPronunciation: 'ʻa',
    kasraPronunciation: 'ʻi',
    dammaPronunciation: 'ʻu',
  },
  {
    id: 'ghayn',
    arabic: 'غ',
    name: 'Ghayn',
    transliterationRoot: 'gh',
    fathaPronunciation: 'gha',
    kasraPronunciation: 'ghi',
    dammaPronunciation: 'ghu',
  },
  {
    id: 'faa',
    arabic: 'ف',
    name: 'Fāʼ',
    transliterationRoot: 'f',
    fathaPronunciation: 'fa',
    kasraPronunciation: 'fi',
    dammaPronunciation: 'fu',
  },
  {
    id: 'qaaf',
    arabic: 'ق',
    name: 'Qāf',
    transliterationRoot: 'q',
    fathaPronunciation: 'qa',
    kasraPronunciation: 'qi',
    dammaPronunciation: 'qu',
  },
  {
    id: 'kaaf',
    arabic: 'ك',
    name: 'Kāf',
    transliterationRoot: 'k',
    fathaPronunciation: 'ka',
    kasraPronunciation: 'ki',
    dammaPronunciation: 'ku',
    fathaAudio: '/audio/practice/c1/harakat/ka.mp3',
    kasraAudio: '/audio/practice/c1/harakat/ki.mp3',
    dammaAudio: '/audio/practice/c1/harakat/ku.mp3',
  },
  {
    id: 'laam',
    arabic: 'ل',
    name: 'Lām',
    transliterationRoot: 'l',
    fathaPronunciation: 'la',
    kasraPronunciation: 'li',
    dammaPronunciation: 'lu',
  },
  {
    id: 'meem',
    arabic: 'م',
    name: 'Mīm',
    transliterationRoot: 'm',
    fathaPronunciation: 'ma',
    kasraPronunciation: 'mi',
    dammaPronunciation: 'mu',
    fathaAudio: '/audio/practice/c1/harakat/ma.mp3',
    kasraAudio: '/audio/practice/c1/harakat/mi.mp3',
    dammaAudio: '/audio/practice/c1/harakat/mu.mp3',
  },
  {
    id: 'noon',
    arabic: 'ن',
    name: 'Nūn',
    transliterationRoot: 'n',
    fathaPronunciation: 'na',
    kasraPronunciation: 'ni',
    dammaPronunciation: 'nu',
  },
  {
    id: 'haa',
    arabic: 'ه',
    name: 'Hāʼ',
    transliterationRoot: 'h',
    fathaPronunciation: 'ha',
    kasraPronunciation: 'hi',
    dammaPronunciation: 'hu',
  },
  {
    id: 'waw',
    arabic: 'و',
    name: 'Wāw',
    transliterationRoot: 'w',
    fathaPronunciation: 'wa',
    kasraPronunciation: 'wi',
    dammaPronunciation: 'wu',
  },
  {
    id: 'yaa',
    arabic: 'ي',
    name: 'Yāʼ',
    transliterationRoot: 'y',
    fathaPronunciation: 'ya',
    kasraPronunciation: 'yi',
    dammaPronunciation: 'yu',
  },
];

export interface HarakahOption {
  id: 'fatha' | 'kasra' | 'damma';
  symbol: string;
  name: string;
  arabicName: string;
  vowelSound: string;
}

export const HARAKAT_OPTIONS: HarakahOption[] = [
  {
    id: 'fatha',
    symbol: 'َ',
    name: 'Fatha',
    arabicName: 'فَتْحَة',
    vowelSound: 'a',
  },
  {
    id: 'kasra',
    symbol: 'ِ',
    name: 'Kasra',
    arabicName: 'كَسْرَة',
    vowelSound: 'i',
  },
  {
    id: 'damma',
    symbol: 'ُ',
    name: 'Damma',
    arabicName: 'ضَمَّة',
    vowelSound: 'u',
  },
];

interface HarakatIntroActivityProps {
  data?: any;
  onComplete: () => void;
  isCompleted?: boolean;
}

export const HarakatIntroActivity: React.FC<HarakatIntroActivityProps> = ({
  onComplete,
  isCompleted = false,
}) => {
  // Selection state
  const [selectedLetterId, setSelectedLetterId] = useState<string | null>('baa');
  const [selectedHarakahId, setSelectedHarakahId] = useState<'fatha' | 'kasra' | 'damma' | null>('fatha');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const selectedLetter = ARABIC_ALPHABET_HARAKAT.find((l) => l.id === selectedLetterId) || null;
  const selectedHarakah = HARAKAT_OPTIONS.find((h) => h.id === selectedHarakahId) || null;

  // Compute combined character string
  const getCombinedCharacter = (letter: ArabicLetterHarakahItem, harakah: HarakahOption): string => {
    if (letter.id === 'alif') {
      if (harakah.id === 'fatha') return letter.fathaText || 'أَ';
      if (harakah.id === 'kasra') return letter.kasraText || 'إِ';
      if (harakah.id === 'damma') return letter.dammaText || 'أُ';
    }
    return `${letter.arabic}${harakah.symbol}`;
  };

  // Compute pronunciation string
  const getPronunciation = (letter: ArabicLetterHarakahItem, harakah: HarakahOption): string => {
    if (harakah.id === 'fatha') return letter.fathaPronunciation;
    if (harakah.id === 'kasra') return letter.kasraPronunciation;
    if (harakah.id === 'damma') return letter.dammaPronunciation;
    return '';
  };

  // Get audio URL if predefined
  const getAudioUrl = (letter: ArabicLetterHarakahItem, harakah: HarakahOption): string | undefined => {
    if (harakah.id === 'fatha') return letter.fathaAudio;
    if (harakah.id === 'kasra') return letter.kasraAudio;
    if (harakah.id === 'damma') return letter.dammaAudio;
    return undefined;
  };

  const combinedChar = selectedLetter && selectedHarakah ? getCombinedCharacter(selectedLetter, selectedHarakah) : null;
  const pronunciation = selectedLetter && selectedHarakah ? getPronunciation(selectedLetter, selectedHarakah) : null;
  const audioUrl = selectedLetter && selectedHarakah ? getAudioUrl(selectedLetter, selectedHarakah) : undefined;

  // Sound player function
  const handlePlaySound = () => {
    if (!combinedChar) return;
    setIsPlaying(true);
    playArabicAudio(
      audioUrl,
      combinedChar,
      () => setIsPlaying(true),
      () => setIsPlaying(false)
    );
  };

  // Track initial mount to avoid unwanted sound playback
  const isFirstMount = useRef(true);

  // Play audio when selections change (unless it's the very first mount)
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }

    if (combinedChar) {
      handlePlaySound();
    }
    return () => {
      stopAudio();
    };
  }, [selectedLetterId, selectedHarakahId]);

  return (
    <div className="max-w-2xl mx-auto space-y-7 pb-2 select-none">
      {/* Step 1: Choose a Letter */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-text-muted uppercase tracking-wider">
            1. Choose a letter
          </span>
          {selectedLetter && (
            <span className="text-primary font-medium">
              {selectedLetter.name} ({selectedLetter.arabic})
            </span>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 p-2.5 sm:p-3 rounded-2xl bg-surface/60 border border-border/70">
          {ARABIC_ALPHABET_HARAKAT.map((letter) => {
            const isSelected = letter.id === selectedLetterId;
            return (
              <button
                key={letter.id}
                onClick={() => setSelectedLetterId(letter.id)}
                className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center text-lg sm:text-xl font-serif transition-all duration-150 cursor-pointer ${
                  isSelected
                    ? 'bg-primary text-black font-bold shadow-md scale-105'
                    : 'bg-background hover:bg-surface-hover text-text-main border border-border/80 hover:border-border'
                }`}
                title={letter.name}
              >
                {letter.arabic}
              </button>
            );
          })}
        </div>
      </div>

      {/* Step 2: Choose a Harakah */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-text-muted uppercase tracking-wider">
            2. Choose a Harakah
          </span>
          {selectedHarakah && (
            <span className="text-primary font-medium">
              {selectedHarakah.name} ({selectedHarakah.arabicName})
            </span>
          )}
        </div>

        <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
          {HARAKAT_OPTIONS.map((harakah) => {
            const isSelected = harakah.id === selectedHarakahId;
            return (
              <button
                key={harakah.id}
                onClick={() => setSelectedHarakahId(harakah.id)}
                className={`py-3 px-3 sm:px-4 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all duration-150 cursor-pointer ${
                  isSelected
                    ? 'bg-primary text-black border-primary shadow-md scale-[1.02]'
                    : 'bg-surface hover:bg-surface-hover text-text-main border-border hover:border-border/80'
                }`}
              >
                <span className="text-2xl sm:text-3xl font-serif leading-tight font-bold">
                  {harakah.symbol}
                </span>
                <span className={`text-xs sm:text-sm font-semibold ${isSelected ? 'text-black' : 'text-text-main'}`}>
                  {harakah.name}
                </span>
                <span className={`text-[11px] ${isSelected ? 'text-black/70' : 'text-text-muted'}`}>
                  (-{harakah.vowelSound})
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Combined Focus & Audio Output */}
      <div className="p-7 sm:p-9 rounded-2xl bg-surface border border-border text-center flex flex-col items-center justify-center min-h-[240px]">
        <AnimatePresence mode="wait">
          {combinedChar && pronunciation ? (
            <motion.div
              key={`${selectedLetterId}-${selectedHarakahId}`}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.15 }}
              className="flex flex-col items-center space-y-4"
            >
              {/* Equation preview (e.g. ب + َ → بَ) */}
              <div className="flex items-center gap-2 text-xs text-text-muted font-serif">
                <span className="text-base text-text-main">{selectedLetter?.arabic}</span>
                <span>+</span>
                <span className="text-base text-text-main">{selectedHarakah?.symbol}</span>
                <span>→</span>
                <span className="text-primary font-semibold">{combinedChar}</span>
              </div>

              {/* Large Combined Arabic Character */}
              <div className="text-8xl sm:text-9xl font-serif text-text-main leading-none py-1 drop-shadow-sm">
                {combinedChar}
              </div>

              {/* Pronunciation Sound Tag */}
              <div className="text-sm font-medium text-text-muted">
                Pronounced: <span className="font-bold text-text-main font-mono">/{pronunciation}/</span>
              </div>

              {/* Prominent Play Sound Button */}
              <button
                onClick={handlePlaySound}
                className={`mt-2 inline-flex items-center gap-2.5 px-6 py-3 rounded-full font-semibold text-sm transition-all duration-150 cursor-pointer ${
                  isPlaying
                    ? 'bg-primary/20 text-primary border border-primary scale-95 shadow-sm'
                    : 'bg-primary text-black hover:bg-primary-hover shadow-sm active:scale-95'
                }`}
                title="Play pronunciation sound"
              >
                <Volume2
                  size={18}
                  className={`transition-transform duration-200 ${
                    isPlaying ? 'scale-125 text-primary' : 'text-black'
                  }`}
                />
                <span>{isPlaying ? 'Playing...' : 'Play Sound'}</span>
              </button>
            </motion.div>
          ) : (
            <div className="text-center py-6 text-text-muted space-y-2">
              <span className="text-4xl font-serif block opacity-40">
                {selectedLetter?.arabic || '؟'}
              </span>
              <p className="text-sm">
                {!selectedLetter
                  ? 'Select an Arabic letter above'
                  : 'Select a Harakah (Fatha, Kasra, or Damma) above'}
              </p>
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-border/60">
        <span className="text-xs text-text-muted">
          Activity 2 of 4 • Harakat
        </span>

        <button
          onClick={onComplete}
          className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-primary text-black hover:bg-primary-hover text-xs sm:text-sm font-semibold transition-colors"
        >
          <span>{isCompleted ? 'Finished • Next' : 'Complete Activity'}</span>
          <Check size={16} />
        </button>
      </div>
    </div>
  );
};
