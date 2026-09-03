import { PracticePathData } from '../../types/practice';

export const class01PracticePath: PracticePathData = {
  courseId: 'msa-beginner-pilot',
  lessonId: 1,
  lessonTitle: 'Arabic Letters & Harakat',
  title: 'Practice Path',
  description: 'Practice what you learned through a few short interactive activities.',
  activities: [
    {
      id: 'c1-a1',
      order: 1,
      title: 'Meet the Arabic Letters',
      shortTitle: 'Meet the Letters',
      description: 'Explore the 28 Arabic letters in 6 structured groups',
      type: 'meet-letters',
      placement: 'inline',
      estimatedMinutes: 5,
      data: {
        groups: [
          {
            groupNumber: 1,
            title: 'Group 1',
            letters: [
              {
                id: 'alif',
                arabic: 'ا',
                name: 'Alif',
                transliteration: 'ā / a',
                audio: '/audio/practice/c1/ا.mp3',
                isolated: 'ا',
                initial: 'ا',
                medial: 'ـا',
                final: 'ـا',
                isNonConnector: true,
                examples: [
                  {
                    position: 'beginning',
                    positionLabel: 'Beginning (ا...)',
                    word: 'أَسَد',
                    transliteration: 'Asad',
                    meaning: 'Lion',
                    targetLetter: 'أ'
                  },
                  {
                    position: 'middle',
                    positionLabel: 'Middle (ـا...)',
                    word: 'فَأْر',
                    transliteration: 'Faʼr',
                    meaning: 'Mouse',
                    audio: '/audio/practice/c1/mouse.mp3',
                    targetLetter: 'أ'
                  },
                  {
                    position: 'end',
                    positionLabel: 'End (...ـا)',
                    word: 'عَصَا',
                    transliteration: 'ʻAṣā',
                    meaning: 'Stick',
                    audio: '/audio/practice/c1/stick.mp3',
                    targetLetter: 'ا'
                  }
                ]
              },
              {
                id: 'baa',
                arabic: 'ب',
                name: 'Bāʼ',
                transliteration: 'b',
                audio: '/audio/practice/c1/ب.mp3',
                isolated: 'ب',
                initial: 'بـ',
                medial: 'ـبـ',
                final: 'ـب',
                examples: [
                  {
                    position: 'beginning',
                    positionLabel: 'Beginning (بـ...)',
                    word: 'بَاب',
                    transliteration: 'Bāb',
                    meaning: 'Door',
                    audio: '/audio/practice/c1/door.mp3',
                    targetLetter: 'ب'
                  },
                  {
                    position: 'middle',
                    positionLabel: 'Middle (ـبـ...)',
                    word: 'خُبْز',
                    transliteration: 'Khubz',
                    meaning: 'Bread',
                    audio: '/audio/practice/c1/bread.mp3',
                    targetLetter: 'ب'
                  },
                  {
                    position: 'end',
                    positionLabel: 'End (...ـب)',
                    word: 'كِتَاب',
                    transliteration: 'Kitāb',
                    meaning: 'Book',
                    audio: '/audio/practice/c1/book.mp3',
                    targetLetter: 'ب'
                  }
                ]
              },
              {
                id: 'taa',
                arabic: 'ت',
                name: 'Tāʼ',
                transliteration: 't',
                audio: '/audio/practice/c1/ت.mp3',
                isolated: 'ت',
                initial: 'تـ',
                medial: 'ـتـ',
                final: 'ـت',
                examples: [
                  {
                    position: 'beginning',
                    positionLabel: 'Beginning (تـ...)',
                    word: 'تُفَّاح',
                    transliteration: 'Tuffāḥ',
                    meaning: 'Apple',
                    audio: '/audio/practice/c1/apple.mp3',
                    targetLetter: 'ت'
                  },
                  {
                    position: 'middle',
                    positionLabel: 'Middle (ـتـ...)',
                    word: 'كِتَاب',
                    transliteration: 'Kitāb',
                    meaning: 'Book',
                    audio: '/audio/practice/c1/book.mp3',
                    targetLetter: 'ت'
                  },
                  {
                    position: 'end',
                    positionLabel: 'End (...ـت)',
                    word: 'بَيْت',
                    transliteration: 'Bayt',
                    meaning: 'House',
                    audio: '/audio/practice/c1/house.mp3',
                    targetLetter: 'ت'
                  }
                ]
              },
              {
                id: 'thaa',
                arabic: 'ث',
                name: 'Thāʼ',
                transliteration: 'th',
                audio: '/audio/practice/c1/ث.mp3',
                isolated: 'ث',
                initial: 'ثـ',
                medial: 'ـثـ',
                final: 'ـث',
                examples: [
                  {
                    position: 'beginning',
                    positionLabel: 'Beginning (ثـ...)',
                    word: 'ثَعْلَب',
                    transliteration: 'Thaʻlab',
                    meaning: 'Fox',
                    audio: '/audio/practice/c1/fox.mp3',
                    targetLetter: 'ث'
                  },
                  {
                    position: 'middle',
                    positionLabel: 'Middle (ـثـ...)',
                    word: 'مِثَال',
                    transliteration: 'Mithāl',
                    meaning: 'Example',
                    audio: '/audio/practice/c1/example.mp3',
                    targetLetter: 'ث'
                  },
                  {
                    position: 'end',
                    positionLabel: 'End (...ـث)',
                    word: 'مُثَلَّث',
                    transliteration: 'Muthallath',
                    meaning: 'Triangle',
                    audio: '/audio/practice/c1/tringle.mp3',
                    targetLetter: 'ث'
                  }
                ]
              }
            ]
          },
          {
            groupNumber: 2,
            title: 'Group 2',
            letters: [
              {
                id: 'jeem',
                arabic: 'ج',
                name: 'Jīm',
                transliteration: 'j',
                audio: '/audio/practice/c1/ج.mp3',
                isolated: 'ج',
                initial: 'جـ',
                medial: 'ـجـ',
                final: 'ـج',
                examples: [
                  {
                    position: 'beginning',
                    positionLabel: 'Beginning (جـ...)',
                    word: 'جَمَل',
                    transliteration: 'Jamal',
                    meaning: 'Camel',
                    audio: '/audio/practice/c1/camel.mp3',
                    targetLetter: 'ج'
                  },
                  {
                    position: 'middle',
                    positionLabel: 'Middle (ـجـ...)',
                    word: 'شَجَرَة',
                    transliteration: 'Shajarah',
                    meaning: 'Tree',
                    audio: '/audio/practice/c1/tree.mp3',
                    targetLetter: 'ج'
                  },
                  {
                    position: 'end',
                    positionLabel: 'End (...ـج)',
                    word: 'ثَلْج',
                    transliteration: 'Thalj',
                    meaning: 'Snow / Ice',
                    audio: '/audio/practice/c1/snow.mp3',
                    targetLetter: 'ج'
                  }
                ]
              },
              {
                id: 'haa',
                arabic: 'ح',
                name: 'Ḥāʼ',
                transliteration: 'ḥ',
                audio: '/audio/practice/c1/ح.mp3',
                isolated: 'ح',
                initial: 'حـ',
                medial: 'ـحـ',
                final: 'ـح',
                examples: [
                  {
                    position: 'beginning',
                    positionLabel: 'Beginning (حـ...)',
                    word: 'حَلِيب',
                    transliteration: 'Ḥalīb',
                    meaning: 'Milk',
                    audio: '/audio/practice/c1/milk.mp3',
                    targetLetter: 'ح'
                  },
                  {
                    position: 'middle',
                    positionLabel: 'Middle (ـحـ...)',
                    word: 'بَحْر',
                    transliteration: 'Baḥr',
                    meaning: 'Sea',
                    targetLetter: 'ح'
                  },
                  {
                    position: 'end',
                    positionLabel: 'End (...ـح)',
                    word: 'لَوْح',
                    transliteration: 'Lawḥ',
                    meaning: 'Board',
                    audio: '/audio/practice/c1/board.mp3',
                    targetLetter: 'ح'
                  }
                ]
              },
              {
                id: 'khaa',
                arabic: 'خ',
                name: 'Khāʼ',
                transliteration: 'kh',
                audio: '/audio/practice/c1/خ.mp3',
                isolated: 'خ',
                initial: 'خـ',
                medial: 'ـخـ',
                final: 'ـخ',
                examples: [
                  {
                    position: 'beginning',
                    positionLabel: 'Beginning (خـ...)',
                    word: 'خَاتَم',
                    transliteration: 'Khātam',
                    meaning: 'Ring',
                    audio: '/audio/practice/c1/ring.mp3',
                    targetLetter: 'خ'
                  },
                  {
                    position: 'middle',
                    positionLabel: 'Middle (ـخـ...)',
                    word: 'نَخْلَة',
                    transliteration: 'Nakhlah',
                    meaning: 'Palm Tree',
                    targetLetter: 'خ'
                  },
                  {
                    position: 'end',
                    positionLabel: 'End (...ـخ)',
                    word: 'مَطْبَخ',
                    transliteration: 'Maṭbakh',
                    meaning: 'Kitchen',
                    audio: '/audio/practice/c1/kitchen.mp3',
                    targetLetter: 'خ'
                  }
                ]
              },
              {
                id: 'daal',
                arabic: 'د',
                name: 'Dāl',
                transliteration: 'd',
                audio: '/audio/practice/c1/د.mp3',
                isolated: 'د',
                initial: 'د',
                medial: 'ـد',
                final: 'ـد',
                isNonConnector: true,
                examples: [
                  {
                    position: 'beginning',
                    positionLabel: 'Beginning (د...)',
                    word: 'دَرْس',
                    transliteration: 'Dars',
                    meaning: 'Lesson',
                    audio: '/audio/practice/c1/lesson.mp3',
                    targetLetter: 'د'
                  },
                  {
                    position: 'middle',
                    positionLabel: 'Middle (ـد...)',
                    word: 'هُدْهُد',
                    transliteration: 'Hudhud',
                    meaning: 'Hoopoe bird',
                    audio: '/audio/practice/c1/hoopoe.mp3',
                    targetLetter: 'د'
                  },
                  {
                    position: 'end',
                    positionLabel: 'End (...ـد)',
                    word: 'وَلَد',
                    transliteration: 'Walad',
                    meaning: 'Boy',
                    audio: '/audio/practice/c1/boy.mp3',
                    targetLetter: 'د'
                  }
                ]
              },
              {
                id: 'raa',
                arabic: 'ر',
                name: 'Rāʼ',
                transliteration: 'r',
                audio: '/audio/practice/c1/ر.mp3',
                isolated: 'ر',
                initial: 'ر',
                medial: 'ـر',
                final: 'ـر',
                isNonConnector: true,
                examples: [
                  {
                    position: 'beginning',
                    positionLabel: 'Beginning (ر...)',
                    word: 'رَجُل',
                    transliteration: 'Rajul',
                    meaning: 'Man',
                    audio: '/audio/practice/c1/man.mp3',
                    targetLetter: 'ر'
                  },
                  {
                    position: 'middle',
                    positionLabel: 'Middle (ـر...)',
                    word: 'وَرْدَة',
                    transliteration: 'Wardah',
                    meaning: 'Rose / Flower',
                    audio: '/audio/practice/c1/flower.mp3',
                    targetLetter: 'ر'
                  },
                  {
                    position: 'end',
                    positionLabel: 'End (...ـر)',
                    word: 'قَمَر',
                    transliteration: 'Qamar',
                    meaning: 'Moon',
                    audio: '/audio/practice/c1/moon.mp3',
                    targetLetter: 'ر'
                  }
                ]
              }
            ]
          },
          {
            groupNumber: 3,
            title: 'Group 3',
            letters: [
              {
                id: 'dhaal',
                arabic: 'ذ',
                name: 'Dhāl',
                transliteration: 'dh',
                audio: '/audio/practice/c1/ذ.mp3',
                isolated: 'ذ',
                initial: 'ذ',
                medial: 'ـذ',
                final: 'ـذ',
                isNonConnector: true,
                examples: [
                  {
                    position: 'beginning',
                    positionLabel: 'Beginning (ذ...)',
                    word: 'ذُرَة',
                    transliteration: 'Dhurah',
                    meaning: 'Corn',
                    audio: '/audio/practice/c1/corn.mp3',
                    targetLetter: 'ذ'
                  },
                  {
                    position: 'middle',
                    positionLabel: 'Middle (ـذ...)',
                    word: 'جِذْر',
                    transliteration: 'Jidhr',
                    meaning: 'Root',
                    audio: '/audio/practice/c1/root.mp3',
                    targetLetter: 'ذ'
                  },
                  {
                    position: 'end',
                    positionLabel: 'End (...ـذ)',
                    word: 'أُسْتَاذ',
                    transliteration: 'Ustādh',
                    meaning: 'Teacher / Professor',
                    audio: '/audio/practice/c1/Professor.mp3',
                    targetLetter: 'ذ'
                  }
                ]
              },
              {
                id: 'zay',
                arabic: 'ز',
                name: 'Zāy',
                transliteration: 'z',
                audio: '/audio/practice/c1/ز.mp3',
                isolated: 'ز',
                initial: 'ز',
                medial: 'ـز',
                final: 'ـز',
                isNonConnector: true,
                examples: [
                  {
                    position: 'beginning',
                    positionLabel: 'Beginning (ز...)',
                    word: 'زَيْتُون',
                    transliteration: 'Zaytūn',
                    meaning: 'Olives',
                    audio: '/audio/practice/c1/olives.mp3',
                    targetLetter: 'ز'
                  },
                  {
                    position: 'middle',
                    positionLabel: 'Middle (ـز...)',
                    word: 'مَوْزَة',
                    transliteration: 'Mawzah',
                    meaning: 'Banana',
                    audio: '/audio/practice/c1/banana.mp3',
                    targetLetter: 'ز'
                  },
                  {
                    position: 'end',
                    positionLabel: 'End (...ـز)',
                    word: 'كَنْز',
                    transliteration: 'Kanz',
                    meaning: 'Treasure',
                    audio: '/audio/practice/c1/treasure.mp3',
                    targetLetter: 'ز'
                  }
                ]
              },
              {
                id: 'seen',
                arabic: 'س',
                name: 'Sīn',
                transliteration: 's',
                audio: '/audio/practice/c1/س.mp3',
                isolated: 'س',
                initial: 'سـ',
                medial: 'ـسـ',
                final: 'ـس',
                examples: [
                  {
                    position: 'beginning',
                    positionLabel: 'Beginning (سـ...)',
                    word: 'سَمَكَة',
                    transliteration: 'Samakah',
                    meaning: 'Fish',
                    audio: '/audio/practice/c1/fish.mp3',
                    targetLetter: 'س'
                  },
                  {
                    position: 'middle',
                    positionLabel: 'Middle (ـسـ...)',
                    word: 'مَسْجِد',
                    transliteration: 'Masjid',
                    meaning: 'Mosque',
                    targetLetter: 'س'
                  },
                  {
                    position: 'end',
                    positionLabel: 'End (...ـس)',
                    word: 'شَمْس',
                    transliteration: 'Shams',
                    meaning: 'Sun',
                    audio: '/audio/practice/c1/sun.mp3',
                    targetLetter: 'س'
                  }
                ]
              },
              {
                id: 'sheen',
                arabic: 'ش',
                name: 'Shīn',
                transliteration: 'sh',
                audio: '/audio/practice/c1/ش.mp3',
                isolated: 'ش',
                initial: 'شـ',
                medial: 'ـشـ',
                final: 'ـش',
                examples: [
                  {
                    position: 'beginning',
                    positionLabel: 'Beginning (شـ...)',
                    word: 'شَمْس',
                    transliteration: 'Shams',
                    meaning: 'Sun',
                    audio: '/audio/practice/c1/sun.mp3',
                    targetLetter: 'ش'
                  },
                  {
                    position: 'middle',
                    positionLabel: 'Middle (ـشـ...)',
                    word: 'مِشْمِش',
                    transliteration: 'Mishmish',
                    meaning: 'Apricot',
                    audio: '/audio/practice/c1/apricot.mp3',
                    targetLetter: 'ش'
                  },
                  {
                    position: 'end',
                    positionLabel: 'End (...ـش)',
                    word: 'عُشّ',
                    transliteration: 'ʻUshsh',
                    meaning: 'Nest',
                    targetLetter: 'ش'
                  }
                ]
              },
              {
                id: 'saad',
                arabic: 'ص',
                name: 'Ṣād',
                transliteration: 'ṣ',
                audio: '/audio/practice/c1/ص.mp3',
                isolated: 'ص',
                initial: 'صـ',
                medial: 'ـصـ',
                final: 'ـص',
                examples: [
                  {
                    position: 'beginning',
                    positionLabel: 'Beginning (صـ...)',
                    word: 'صَقْر',
                    transliteration: 'Ṣaqr',
                    meaning: 'Falcon',
                    audio: '/audio/practice/c1/falcon.mp3',
                    targetLetter: 'ص'
                  },
                  {
                    position: 'middle',
                    positionLabel: 'Middle (ـصـ...)',
                    word: 'عَصِير',
                    transliteration: 'ʻAṣīr',
                    meaning: 'Juice',
                    audio: '/audio/practice/c1/juice.mp3',
                    targetLetter: 'ص'
                  },
                  {
                    position: 'end',
                    positionLabel: 'End (...ـص)',
                    word: 'قَفَص',
                    transliteration: 'Qafaṣ',
                    meaning: 'Cage',
                    audio: '/audio/practice/c1/cage.mp3',
                    targetLetter: 'ص'
                  }
                ]
              }
            ]
          },
          {
            groupNumber: 4,
            title: 'Group 4',
            letters: [
              {
                id: 'daad',
                arabic: 'ض',
                name: 'Ḍād',
                transliteration: 'ḍ',
                audio: '/audio/practice/c1/ض.mp3',
                isolated: 'ض',
                initial: 'ضـ',
                medial: 'ـضـ',
                final: 'ـض',
                examples: [
                  {
                    position: 'beginning',
                    positionLabel: 'Beginning (ضـ...)',
                    word: 'ضَوْء',
                    transliteration: 'Ḍawʼ',
                    meaning: 'Light',
                    audio: '/audio/practice/c1/light.mp3',
                    targetLetter: 'ض'
                  },
                  {
                    position: 'middle',
                    positionLabel: 'Middle (ـضـ...)',
                    word: 'خُضَار',
                    transliteration: 'Khuḍār',
                    meaning: 'Vegetables',
                    audio: '/audio/practice/c1/vegetables.mp3',
                    targetLetter: 'ض'
                  },
                  {
                    position: 'end',
                    positionLabel: 'End (...ـض)',
                    word: 'أَرْض',
                    transliteration: 'Arḍ',
                    meaning: 'Earth / Land',
                    audio: '/audio/practice/c1/land.mp3',
                    targetLetter: 'ض'
                  }
                ]
              },
              {
                id: 'taa_emphatic',
                arabic: 'ط',
                name: 'Ṭāʼ',
                transliteration: 'ṭ',
                audio: '/audio/practice/c1/ط.mp3',
                isolated: 'ط',
                initial: 'طـ',
                medial: 'ـطـ',
                final: 'ـط',
                examples: [
                  {
                    position: 'beginning',
                    positionLabel: 'Beginning (طـ...)',
                    word: 'طَيْر',
                    transliteration: 'Ṭayr',
                    meaning: 'Bird',
                    audio: '/audio/practice/c1/bird.mp3',
                    targetLetter: 'ط'
                  },
                  {
                    position: 'middle',
                    positionLabel: 'Middle (ـطـ...)',
                    word: 'مَطَر',
                    transliteration: 'Maṭar',
                    meaning: 'Rain',
                    audio: '/audio/practice/c1/rain.mp3',
                    targetLetter: 'ط'
                  },
                  {
                    position: 'end',
                    positionLabel: 'End (...ـط)',
                    word: 'قِطّ',
                    transliteration: 'Qiṭṭ',
                    meaning: 'Cat',
                    audio: '/audio/practice/c1/cat.mp3',
                    targetLetter: 'ط'
                  }
                ]
              },
              {
                id: 'zaa_emphatic',
                arabic: 'ظ',
                name: 'Ẓāʼ',
                transliteration: 'ẓ',
                audio: '/audio/practice/c1/ظ.mp3',
                isolated: 'ظ',
                initial: 'ظـ',
                medial: 'ـظـ',
                final: 'ـظ',
                examples: [
                  {
                    position: 'beginning',
                    positionLabel: 'Beginning (ظـ...)',
                    word: 'ظَبْي',
                    transliteration: 'Ẓaby',
                    meaning: 'Gazelle',
                    audio: '/audio/practice/c1/gazelle.mp3',
                    targetLetter: 'ظ'
                  },
                  {
                    position: 'middle',
                    positionLabel: 'Middle (ـظـ...)',
                    word: 'نَظَّارَة',
                    transliteration: 'Naẓẓārah',
                    meaning: 'Glasses',
                    audio: '/audio/practice/c1/glasses.mp3',
                    targetLetter: 'ظ'
                  },
                  {
                    position: 'end',
                    positionLabel: 'End (...ـظ)',
                    word: 'حَظّ',
                    transliteration: 'Ḥaẓẓ',
                    meaning: 'Luck / Fortune',
                    audio: '/audio/practice/c1/luck.mp3',
                    targetLetter: 'ظ'
                  }
                ]
              },
              {
                id: 'ayn',
                arabic: 'ع',
                name: 'ʻAyn',
                transliteration: 'ʻ',
                isolated: 'ع',
                initial: 'عـ',
                medial: 'ـعـ',
                final: 'ـع',
                examples: [
                  {
                    position: 'beginning',
                    positionLabel: 'Beginning (عـ...)',
                    word: 'عَيْن',
                    transliteration: 'ʻAyn',
                    meaning: 'Eye',
                    audio: '/audio/practice/c1/eye.mp3',
                    targetLetter: 'ع'
                  },
                  {
                    position: 'middle',
                    positionLabel: 'Middle (ـعـ...)',
                    word: 'مُعَلِّم',
                    transliteration: 'Muʻallim',
                    meaning: 'Teacher',
                    audio: '/audio/practice/c1/teacher.mp3',
                    targetLetter: 'ع'
                  },
                  {
                    position: 'end',
                    positionLabel: 'End (...ـع)',
                    word: 'شَارِع',
                    transliteration: 'Shāriʻ',
                    meaning: 'Street',
                    audio: '/audio/practice/c1/street.mp3',
                    targetLetter: 'ع'
                  }
                ]
              },
              {
                id: 'ghayn',
                arabic: 'غ',
                name: 'Ghayn',
                transliteration: 'gh',
                isolated: 'غ',
                initial: 'غـ',
                medial: 'ـغـ',
                final: 'ـغ',
                examples: [
                  {
                    position: 'beginning',
                    positionLabel: 'Beginning (غـ...)',
                    word: 'غَابَة',
                    transliteration: 'Ghābah',
                    meaning: 'Forest',
                    audio: '/audio/practice/c1/forest.mp3',
                    targetLetter: 'غ'
                  },
                  {
                    position: 'middle',
                    positionLabel: 'Middle (ـغـ...)',
                    word: 'بَبَّغَاء',
                    transliteration: 'Babbaghāʼ',
                    meaning: 'Parrot',
                    audio: '/audio/practice/c1/parrot.mp3',
                    targetLetter: 'غ'
                  },
                  {
                    position: 'end',
                    positionLabel: 'End (...ـغ)',
                    word: 'صَمْغ',
                    transliteration: 'Ṣamgh',
                    meaning: 'Glue',
                    audio: '/audio/practice/c1/glue.mp3',
                    targetLetter: 'غ'
                  }
                ]
              }
            ]
          },
          {
            groupNumber: 5,
            title: 'Group 5',
            letters: [
              {
                id: 'faa',
                arabic: 'ف',
                name: 'Fāʼ',
                transliteration: 'f',
                audio: '/audio/practice/c1/ف.mp3',
                isolated: 'ف',
                initial: 'فـ',
                medial: 'ـفـ',
                final: 'ـف',
                examples: [
                  {
                    position: 'beginning',
                    positionLabel: 'Beginning (فـ...)',
                    word: 'فَم',
                    transliteration: 'Fam',
                    meaning: 'Mouth',
                    audio: '/audio/practice/c1/mouth.mp3',
                    targetLetter: 'ف'
                  },
                  {
                    position: 'middle',
                    positionLabel: 'Middle (ـفـ...)',
                    word: 'دَفْتَر',
                    transliteration: 'Daftar',
                    meaning: 'Notebook',
                    audio: '/audio/practice/c1/notebook.mp3',
                    targetLetter: 'ف'
                  },
                  {
                    position: 'end',
                    positionLabel: 'End (...ـف)',
                    word: 'سَيْف',
                    transliteration: 'Sayf',
                    meaning: 'Sword',
                    audio: '/audio/practice/c1/sword.mp3',
                    targetLetter: 'ف'
                  }
                ]
              },
              {
                id: 'qaaf',
                arabic: 'ق',
                name: 'Qāf',
                transliteration: 'q',
                audio: '/audio/practice/c1/ق.mp3',
                isolated: 'ق',
                initial: 'قـ',
                medial: 'ـقـ',
                final: 'ـق',
                examples: [
                  {
                    position: 'beginning',
                    positionLabel: 'Beginning (قـ...)',
                    word: 'قَلَم',
                    transliteration: 'Qalam',
                    meaning: 'Pen / Pencil',
                    audio: '/audio/practice/c1/pen.mp3',
                    targetLetter: 'ق'
                  },
                  {
                    position: 'middle',
                    positionLabel: 'Middle (ـقـ...)',
                    word: 'بَقَرَة',
                    transliteration: 'Baqarah',
                    meaning: 'Cow',
                    audio: '/audio/practice/c1/cow.mp3',
                    targetLetter: 'ق'
                  },
                  {
                    position: 'end',
                    positionLabel: 'End (...ـق)',
                    word: 'سُوق',
                    transliteration: 'Sūq',
                    meaning: 'Market',
                    audio: '/audio/practice/c1/market.mp3',
                    targetLetter: 'ق'
                  }
                ]
              },
              {
                id: 'kaaf',
                arabic: 'ك',
                name: 'Kāf',
                transliteration: 'k',
                audio: '/audio/practice/c1/ك.mp3',
                isolated: 'ك',
                initial: 'كـ',
                medial: 'ـكـ',
                final: 'ـك',
                examples: [
                  {
                    position: 'beginning',
                    positionLabel: 'Beginning (كـ...)',
                    word: 'كِتَاب',
                    transliteration: 'Kitāb',
                    meaning: 'Book',
                    audio: '/audio/practice/c1/book.mp3',
                    targetLetter: 'ك'
                  },
                  {
                    position: 'middle',
                    positionLabel: 'Middle (ـكـ...)',
                    word: 'مَكْتَب',
                    transliteration: 'Maktab',
                    meaning: 'Desk / Office',
                    audio: '/audio/practice/c1/office.mp3',
                    targetLetter: 'ك'
                  },
                  {
                    position: 'end',
                    positionLabel: 'End (...ـك)',
                    word: 'مَلِك',
                    transliteration: 'Malik',
                    meaning: 'King',
                    audio: '/audio/practice/c1/king.mp3',
                    targetLetter: 'ك'
                  }
                ]
              },
              {
                id: 'laam',
                arabic: 'ل',
                name: 'Lām',
                transliteration: 'l',
                audio: '/audio/practice/c1/ل.mp3',
                isolated: 'ل',
                initial: 'لـ',
                medial: 'ـلـ',
                final: 'ـل',
                examples: [
                  {
                    position: 'beginning',
                    positionLabel: 'Beginning (لـ...)',
                    word: 'لَيْمُون',
                    transliteration: 'Laymūn',
                    meaning: 'Lemon',
                    audio: '/audio/practice/c1/lemon.mp3',
                    targetLetter: 'ل'
                  },
                  {
                    position: 'middle',
                    positionLabel: 'Middle (ـلـ...)',
                    word: 'قَلَم',
                    transliteration: 'Qalam',
                    meaning: 'Pen',
                    audio: '/audio/practice/c1/pen.mp3',
                    targetLetter: 'ل'
                  },
                  {
                    position: 'end',
                    positionLabel: 'End (...ـل)',
                    word: 'جَمَل',
                    transliteration: 'Jamal',
                    meaning: 'Camel',
                    audio: '/audio/practice/c1/camel.mp3',
                    targetLetter: 'ل'
                  }
                ]
              },
              {
                id: 'meem',
                arabic: 'م',
                name: 'Mīm',
                transliteration: 'm',
                audio: '/audio/practice/c1/م.mp3',
                isolated: 'م',
                initial: 'مـ',
                medial: 'ـمـ',
                final: 'ـم',
                examples: [
                  {
                    position: 'beginning',
                    positionLabel: 'Beginning (مـ...)',
                    word: 'مَاء',
                    transliteration: 'Māʼ',
                    meaning: 'Water',
                    audio: '/audio/practice/c1/water.mp3',
                    targetLetter: 'م'
                  },
                  {
                    position: 'middle',
                    positionLabel: 'Middle (ـمـ...)',
                    word: 'قَمَر',
                    transliteration: 'Qamar',
                    meaning: 'Moon',
                    audio: '/audio/practice/c1/moon.mp3',
                    targetLetter: 'م'
                  },
                  {
                    position: 'end',
                    positionLabel: 'End (...ـم)',
                    word: 'غَنَم',
                    transliteration: 'Ghanam',
                    meaning: 'Sheep',
                    audio: '/audio/practice/c1/sheep.mp3',
                    targetLetter: 'م'
                  }
                ]
              }
            ]
          },
          {
            groupNumber: 6,
            title: 'Group 6',
            letters: [
              {
                id: 'noon',
                arabic: 'ن',
                name: 'Nūn',
                transliteration: 'n',
                audio: '/audio/practice/c1/ن.mp3',
                isolated: 'ن',
                initial: 'نـ',
                medial: 'ـنـ',
                final: 'ـن',
                examples: [
                  {
                    position: 'beginning',
                    positionLabel: 'Beginning (نـ...)',
                    word: 'نَجْم',
                    transliteration: 'Najm',
                    meaning: 'Star',
                    audio: '/audio/practice/c1/star.mp3',
                    targetLetter: 'ن'
                  },
                  {
                    position: 'middle',
                    positionLabel: 'Middle (ـنـ...)',
                    word: 'عِنَب',
                    transliteration: 'ʻInab',
                    meaning: 'Grapes',
                    audio: '/audio/practice/c1/grapes.mp3',
                    targetLetter: 'ن'
                  },
                  {
                    position: 'end',
                    positionLabel: 'End (...ـن)',
                    word: 'عَيْن',
                    transliteration: 'ʻAyn',
                    meaning: 'Eye',
                    audio: '/audio/practice/c1/eye.mp3',
                    targetLetter: 'ن'
                  }
                ]
              },
              {
                id: 'haa_soft',
                arabic: 'ه',
                name: 'Hāʼ',
                transliteration: 'h',
                isolated: 'ه',
                initial: 'هـ',
                medial: 'ـهـ',
                final: 'ـه',
                examples: [
                  {
                    position: 'beginning',
                    positionLabel: 'Beginning (هـ...)',
                    word: 'هَرَم',
                    transliteration: 'Haram',
                    meaning: 'Pyramid',
                    audio: '/audio/practice/c1/pyramid.mp3',
                    targetLetter: 'ه'
                  },
                  {
                    position: 'middle',
                    positionLabel: 'Middle (ـهـ...)',
                    word: 'نَهْر',
                    transliteration: 'Nahr',
                    meaning: 'River',
                    audio: '/audio/practice/c1/river.mp3',
                    targetLetter: 'ه'
                  },
                  {
                    position: 'end',
                    positionLabel: 'End (...ـه)',
                    word: 'وَجْه',
                    transliteration: 'Wajh',
                    meaning: 'Face',
                    audio: '/audio/practice/c1/face.mp3',
                    targetLetter: 'ه'
                  }
                ]
              },
              {
                id: 'waw',
                arabic: 'و',
                name: 'Wāw',
                transliteration: 'w / ū',
                audio: '/audio/practice/c1/و.mp3',
                isolated: 'و',
                initial: 'و',
                medial: 'ـو',
                final: 'ـو',
                isNonConnector: true,
                examples: [
                  {
                    position: 'beginning',
                    positionLabel: 'Beginning (و...)',
                    word: 'وَرْدَة',
                    transliteration: 'Wardah',
                    meaning: 'Rose',
                    audio: '/audio/practice/c1/flower.mp3',
                    targetLetter: 'و'
                  },
                  {
                    position: 'middle',
                    positionLabel: 'Middle (ـو...)',
                    word: 'طَاوُوس',
                    transliteration: 'Ṭāwūs',
                    meaning: 'Peacock',
                    audio: '/audio/practice/c1/peacock.mp3',
                    targetLetter: 'و'
                  },
                  {
                    position: 'end',
                    positionLabel: 'End (...ـو)',
                    word: 'دَلْو',
                    transliteration: 'Dalw',
                    meaning: 'Bucket',
                    audio: '/audio/practice/c1/bucket.mp3',
                    targetLetter: 'و'
                  }
                ]
              },
              {
                id: 'yaa',
                arabic: 'ي',
                name: 'Yāʼ',
                transliteration: 'y / ī',
                audio: '/audio/practice/c1/ي.mp3',
                isolated: 'ي',
                initial: 'يـ',
                medial: 'ـيـ',
                final: 'ـي',
                examples: [
                  {
                    position: 'beginning',
                    positionLabel: 'Beginning (يـ...)',
                    word: 'يَد',
                    transliteration: 'Yad',
                    meaning: 'Hand',
                    audio: '/audio/practice/c1/hand.mp3',
                    targetLetter: 'ي'
                  },
                  {
                    position: 'middle',
                    positionLabel: 'Middle (ـيـ...)',
                    word: 'بَيْت',
                    transliteration: 'Bayt',
                    meaning: 'House',
                    audio: '/audio/practice/c1/house.mp3',
                    targetLetter: 'ي'
                  },
                  {
                    position: 'end',
                    positionLabel: 'End (...ـي)',
                    word: 'كُرْسِيّ',
                    transliteration: 'Kursī',
                    meaning: 'Chair',
                    audio: '/audio/practice/c1/chair.mp3',
                    targetLetter: 'ي'
                  }
                ]
              }
            ]
          }
        ]
      }
    },
    {
      id: 'c1-a2',
      order: 2,
      title: 'Harakat',
      shortTitle: 'Harakat (Short Vowels)',
      description: 'Meet the short vowels: Fatha, Kasra, and Damma',
      type: 'harakat',
      placement: 'inline',
      estimatedMinutes: 5,
      data: {
        harakatList: [
          {
            id: 'fatha',
            symbol: 'َ',
            name: 'Fatha',
            arabicName: 'فَتْحَة',
            sound: 'Short "a" sound (like "a" in cat)',
            placement: 'Diagonal stroke placed ABOVE the letter',
            description: 'Fatha opens your mouth slightly to produce a bright short "a" sound.',
            audio: '/audio/practice/c1/harakat/fatha_intro.mp3',
            examples: [
              { letter: 'ب', letterWithHaraka: 'بَ', pronunciation: 'Ba', audio: '/audio/practice/c1/harakat/ba.mp3' },
              { letter: 'ت', letterWithHaraka: 'تَ', pronunciation: 'Ta', audio: '/audio/practice/c1/harakat/ta.mp3' },
              { letter: 'د', letterWithHaraka: 'دَ', pronunciation: 'Da', audio: '/audio/practice/c1/harakat/da.mp3' },
              { letter: 'ر', letterWithHaraka: 'رَ', pronunciation: 'Ra', audio: '/audio/practice/c1/harakat/ra.mp3' },
              { letter: 'ك', letterWithHaraka: 'كَ', pronunciation: 'Ka', audio: '/audio/practice/c1/harakat/ka.mp3' },
              { letter: 'م', letterWithHaraka: 'مَ', pronunciation: 'Ma', audio: '/audio/practice/c1/harakat/ma.mp3' }
            ]
          },
          {
            id: 'kasra',
            symbol: 'ِ',
            name: 'Kasra',
            arabicName: 'كَسْرَة',
            sound: 'Short "i" sound (like "i" in bit)',
            placement: 'Diagonal stroke placed BELOW the letter',
            description: 'Kasra pulls your lower jaw down to produce a crisp short "i" sound.',
            audio: '/audio/practice/c1/harakat/kasra_intro.mp3',
            examples: [
              { letter: 'ب', letterWithHaraka: 'بِ', pronunciation: 'Bi', audio: '/audio/practice/c1/harakat/bi.mp3' },
              { letter: 'ت', letterWithHaraka: 'تِ', pronunciation: 'Ti', audio: '/audio/practice/c1/harakat/ti.mp3' },
              { letter: 'د', letterWithHaraka: 'دِ', pronunciation: 'Di', audio: '/audio/practice/c1/harakat/di.mp3' },
              { letter: 'ر', letterWithHaraka: 'رِ', pronunciation: 'Ri', audio: '/audio/practice/c1/harakat/ri.mp3' },
              { letter: 'ك', letterWithHaraka: 'كِ', pronunciation: 'Ki', audio: '/audio/practice/c1/harakat/ki.mp3' },
              { letter: 'م', letterWithHaraka: 'مِ', pronunciation: 'Mi', audio: '/audio/practice/c1/harakat/mi.mp3' }
            ]
          },
          {
            id: 'damma',
            symbol: 'ُ',
            name: 'Damma',
            arabicName: 'ضَمَّة',
            sound: 'Short "u" sound (like "u" in put)',
            placement: 'Small curl (like mini و) placed ABOVE the letter',
            description: 'Damma rounds your lips forward to produce a gentle short "u" sound.',
            audio: '/audio/practice/c1/harakat/damma_intro.mp3',
            examples: [
              { letter: 'ب', letterWithHaraka: 'بُ', pronunciation: 'Bu', audio: '/audio/practice/c1/harakat/bu.mp3' },
              { letter: 'ت', letterWithHaraka: 'تُ', pronunciation: 'Tu', audio: '/audio/practice/c1/harakat/tu.mp3' },
              { letter: 'د', letterWithHaraka: 'دُ', pronunciation: 'Du', audio: '/audio/practice/c1/harakat/du.mp3' },
              { letter: 'ر', letterWithHaraka: 'رُ', pronunciation: 'Ru', audio: '/audio/practice/c1/harakat/ru.mp3' },
              { letter: 'ك', letterWithHaraka: 'كُ', pronunciation: 'Ku', audio: '/audio/practice/c1/harakat/ku.mp3' },
              { letter: 'م', letterWithHaraka: 'مُ', pronunciation: 'Mu', audio: '/audio/practice/c1/harakat/mu.mp3' }
            ]
          }
        ],
        comparisonMatrix: [
          { letter: 'ب', name: 'Bāʼ', fatha: { text: 'بَ', sound: 'Ba', audio: '/audio/practice/c1/harakat/ba.mp3' }, kasra: { text: 'بِ', sound: 'Bi', audio: '/audio/practice/c1/harakat/bi.mp3' }, damma: { text: 'بُ', sound: 'Bu', audio: '/audio/practice/c1/harakat/bu.mp3' } },
          { letter: 'ت', name: 'Tāʼ', fatha: { text: 'تَ', sound: 'Ta', audio: '/audio/practice/c1/harakat/ta.mp3' }, kasra: { text: 'تِ', sound: 'Ti', audio: '/audio/practice/c1/harakat/ti.mp3' }, damma: { text: 'تُ', sound: 'Tu', audio: '/audio/practice/c1/harakat/tu.mp3' } },
          { letter: 'م', name: 'Mīm', fatha: { text: 'مَ', sound: 'Ma', audio: '/audio/practice/c1/harakat/ma.mp3' }, kasra: { text: 'مِ', sound: 'Mi', audio: '/audio/practice/c1/harakat/mi.mp3' }, damma: { text: 'مُ', sound: 'Mu', audio: '/audio/practice/c1/harakat/mu.mp3' } },
          { letter: 'ك', name: 'Kāf', fatha: { text: 'كَ', sound: 'Ka', audio: '/audio/practice/c1/harakat/ka.mp3' }, kasra: { text: 'كِ', sound: 'Ki', audio: '/audio/practice/c1/harakat/ki.mp3' }, damma: { text: 'كُ', sound: 'Ku', audio: '/audio/practice/c1/harakat/ku.mp3' } },
          { letter: 'د', name: 'Dāl', fatha: { text: 'دَ', sound: 'Da', audio: '/audio/practice/c1/harakat/da.mp3' }, kasra: { text: 'دِ', sound: 'Di', audio: '/audio/practice/c1/harakat/di.mp3' }, damma: { text: 'دُ', sound: 'Du', audio: '/audio/practice/c1/harakat/du.mp3' } },
          { letter: 'ر', name: 'Rāʼ', fatha: { text: 'رَ', sound: 'Ra', audio: '/audio/practice/c1/harakat/ra.mp3' }, kasra: { text: 'رِ', sound: 'Ri', audio: '/audio/practice/c1/harakat/ri.mp3' }, damma: { text: 'رُ', sound: 'Ru', audio: '/audio/practice/c1/harakat/ru.mp3' } }
        ]
      }
    },
    {
      id: 'c1-a3',
      order: 3,
      title: 'Hear & Recognize',
      shortTitle: 'Hear & Recognize',
      description: 'Listen to the audio clip and identify what you heard',
      type: 'hear-recognize',
      placement: 'sidebar',
      estimatedMinutes: 4,
      data: {
        questions: [
          {
            id: 'q1',
            prompt: 'Listen and choose what you heard:',
            audioPrompt: '/audio/practice/c1/harakat/ba.mp3',
            category: 'listening',
            categoryLabel: 'Listening',
            options: [
              { id: 'opt1', label: 'بَ', isCorrect: true, subtext: 'Ba (Bāʼ with Fatha)' },
              { id: 'opt2', label: 'بِ', isCorrect: false, subtext: 'Bi (Bāʼ with Kasra)' },
              { id: 'opt3', label: 'بُ', isCorrect: false, subtext: 'Bu (Bāʼ with Damma)' },
              { id: 'opt4', label: 'تَ', isCorrect: false, subtext: 'Ta (Tāʼ with Fatha)' }
            ],
            explanation: 'You heard "Ba" — the letter Bāʼ (ب) with a Fatha (َ) on top.'
          },
          {
            id: 'q2',
            prompt: 'Listen and choose what you heard:',
            audioPrompt: '/audio/practice/c1/harakat/ti.mp3',
            category: 'listening',
            categoryLabel: 'Listening',
            options: [
              { id: 'opt1', label: 'تَ', isCorrect: false, subtext: 'Ta' },
              { id: 'opt2', label: 'تِ', isCorrect: true, subtext: 'Ti (Tāʼ with Kasra)' },
              { id: 'opt3', label: 'تُ', isCorrect: false, subtext: 'Tu' },
              { id: 'opt4', label: 'ثِ', isCorrect: false, subtext: 'Thi' }
            ],
            explanation: 'You heard "Ti" — the letter Tāʼ (ت) with a Kasra (ِ) underneath.'
          },
          {
            id: 'q3',
            prompt: 'Listen and choose what you heard:',
            audioPrompt: '/audio/practice/c1/harakat/mu.mp3',
            category: 'listening',
            categoryLabel: 'Listening',
            options: [
              { id: 'opt1', label: 'مَ', isCorrect: false, subtext: 'Ma' },
              { id: 'opt2', label: 'مِ', isCorrect: false, subtext: 'Mi' },
              { id: 'opt3', label: 'مُ', isCorrect: true, subtext: 'Mu (Mīm with Damma)' },
              { id: 'opt4', label: 'نُ', isCorrect: false, subtext: 'Nu' }
            ],
            explanation: 'You heard "Mu" — the letter Mīm (م) with a Damma (ُ) on top.'
          },
          {
            id: 'q4',
            prompt: 'Listen and choose what you heard:',
            audioPrompt: '/audio/practice/c1/harakat/da.mp3',
            category: 'listening',
            categoryLabel: 'Listening',
            options: [
              { id: 'opt1', label: 'دَ', isCorrect: true, subtext: 'Da (Dāl with Fatha)' },
              { id: 'opt2', label: 'دِ', isCorrect: false, subtext: 'Di' },
              { id: 'opt3', label: 'دُ', isCorrect: false, subtext: 'Du' },
              { id: 'opt4', label: 'ذَ', isCorrect: false, subtext: 'Dha' }
            ],
            explanation: 'You heard "Da" — the letter Dāl (د) with Fatha (َ).'
          },
          {
            id: 'q5',
            prompt: 'Listen and choose what you heard:',
            audioPrompt: '/audio/practice/c1/harakat/ku.mp3',
            category: 'listening',
            categoryLabel: 'Listening',
            options: [
              { id: 'opt1', label: 'كَ', isCorrect: false, subtext: 'Ka' },
              { id: 'opt2', label: 'كِ', isCorrect: false, subtext: 'Ki' },
              { id: 'opt3', label: 'كُ', isCorrect: true, subtext: 'Ku (Kāf with Damma)' },
              { id: 'opt4', label: 'قُ', isCorrect: false, subtext: 'Qu' }
            ],
            explanation: 'You heard "Ku" — the letter Kāf (ك) with Damma (ُ).'
          },
          {
            id: 'q6',
            prompt: 'Listen and choose what you heard:',
            audioPrompt: '/audio/practice/c1/harakat/ri.mp3',
            category: 'listening',
            categoryLabel: 'Listening',
            options: [
              { id: 'opt1', label: 'رَ', isCorrect: false, subtext: 'Ra' },
              { id: 'opt2', label: 'رِ', isCorrect: true, subtext: 'Ri (Rāʼ with Kasra)' },
              { id: 'opt3', label: 'رُ', isCorrect: false, subtext: 'Ru' },
              { id: 'opt4', label: 'زِ', isCorrect: false, subtext: 'Zi' }
            ],
            explanation: 'You heard "Ri" — the letter Rāʼ (ر) with Kasra (ِ).'
          }
        ]
      }
    },
    {
      id: 'c1-a4',
      order: 4,
      title: 'Final Challenge',
      shortTitle: 'Final Challenge',
      description: 'Put everything together: letters, harakat, listening, and connections',
      type: 'final-challenge',
      placement: 'sidebar',
      estimatedMinutes: 6,
      data: {
        questions: [
          {
            id: 'fc1',
            category: 'letters',
            categoryLabel: 'Letters',
            prompt: 'Which Arabic letter has three dots above it?',
            options: [
              { id: 'fc1_1', label: 'ث (Thāʼ)', isCorrect: true },
              { id: 'fc1_2', label: 'ت (Tāʼ)', isCorrect: false },
              { id: 'fc1_3', label: 'ب (Bāʼ)', isCorrect: false },
              { id: 'fc1_4', label: 'ش (Shīn)', isCorrect: false, subtext: 'Shīn has 3 dots too, but ث is in the primary boat family' }
            ],
            explanation: 'Thāʼ (ث) has 3 dots on top, Tāʼ (ت) has 2 dots on top, and Bāʼ (ب) has 1 dot below.'
          },
          {
            id: 'fc2',
            category: 'harakat',
            categoryLabel: 'Harakat',
            prompt: 'Which Haraka produces the short "u" sound (as in "put")?',
            options: [
              { id: 'fc2_1', label: 'ُ (Damma)', isCorrect: true },
              { id: 'fc2_2', label: 'َ (Fatha)', isCorrect: false },
              { id: 'fc2_3', label: 'ِ (Kasra)', isCorrect: false },
              { id: 'fc2_4', label: 'ْ (Sukūn)', isCorrect: false }
            ],
            explanation: 'Damma (ُ) is a small curl placed above the letter that gives the short "u" sound.'
          },
          {
            id: 'fc3',
            category: 'harakat',
            categoryLabel: 'Harakat',
            prompt: 'Where is the Kasra mark positioned relative to the letter?',
            options: [
              { id: 'fc3_1', label: 'Below the letter (e.g. بِ)', isCorrect: true },
              { id: 'fc3_2', label: 'Above the letter (e.g. بَ)', isCorrect: false },
              { id: 'fc3_3', label: 'Inside the letter', isCorrect: false },
              { id: 'fc3_4', label: 'To the left of the letter', isCorrect: false }
            ],
            explanation: 'Kasra (ِ) is always placed beneath the letter and produces the short "i" sound.'
          },
          {
            id: 'fc4',
            category: 'connections',
            categoryLabel: 'Connections',
            prompt: 'Which of these letters is a "non-connector" that NEVER connects to the following letter on its left?',
            options: [
              { id: 'fc4_1', label: 'د (Dāl)', isCorrect: true },
              { id: 'fc4_2', label: 'ب (Bāʼ)', isCorrect: false },
              { id: 'fc4_3', label: 'م (Mīm)', isCorrect: false },
              { id: 'fc4_4', label: 'ل (Lām)', isCorrect: false }
            ],
            explanation: 'The six non-connecting letters are: ا, د, ذ, ر, ز, و. They only connect from the right.'
          },
          {
            id: 'fc5',
            category: 'letters',
            categoryLabel: 'Letters',
            prompt: 'What is the initial (beginning) form of the letter ج (Jīm)?',
            options: [
              { id: 'fc5_1', label: 'جـ', isCorrect: true },
              { id: 'fc5_2', label: 'ـجـ', isCorrect: false },
              { id: 'fc5_3', label: 'ـج', isCorrect: false },
              { id: 'fc5_4', label: 'ج', isCorrect: false }
            ],
            explanation: 'At the beginning of a word, Jīm drops its circular base and extends forward: جـ...'
          },
          {
            id: 'fc6',
            category: 'listening',
            categoryLabel: 'Listening',
            prompt: 'Listen to the audio clip. Which letter + Haraka combination was spoken?',
            audioPrompt: '/audio/practice/c1/harakat/ka.mp3',
            options: [
              { id: 'fc6_1', label: 'كَ (Ka)', isCorrect: true },
              { id: 'fc6_2', label: 'كِ (Ki)', isCorrect: false },
              { id: 'fc6_3', label: 'كُ (Ku)', isCorrect: false },
              { id: 'fc6_4', label: 'قَ (Qa)', isCorrect: false }
            ],
            explanation: 'The sound was "Ka" — Kāf (ك) with Fatha (َ).'
          },
          {
            id: 'fc7',
            category: 'connections',
            categoryLabel: 'Connections',
            prompt: 'When letters ك + ت + ب are connected together, what word do they form?',
            options: [
              { id: 'fc7_1', label: 'كَتَبَ (Kataba)', isCorrect: true },
              { id: 'fc7_2', label: 'كِتَاب (Kitāb)', isCorrect: false },
              { id: 'fc7_3', label: 'بَيْت (Bayt)', isCorrect: false },
              { id: 'fc7_4', label: 'مَكْتَب (Maktab)', isCorrect: false }
            ],
            explanation: 'كـ + ـتـ + ـب = كَتَبَ ("He wrote"). All three letters connect seamlessly.'
          },
          {
            id: 'fc8',
            category: 'listening',
            categoryLabel: 'Listening',
            prompt: 'Listen and choose what you hear:',
            audioPrompt: '/audio/practice/c1/harakat/bu.mp3',
            options: [
              { id: 'fc8_1', label: 'بُ (Bu)', isCorrect: true },
              { id: 'fc8_2', label: 'بَ (Ba)', isCorrect: false },
              { id: 'fc8_3', label: 'بِ (Bi)', isCorrect: false },
              { id: 'fc8_4', label: 'تُ (Tu)', isCorrect: false }
            ],
            explanation: 'You heard "Bu" — Bāʼ (ب) with Damma (ُ).'
          }
        ]
      }
    }
  ]
};
