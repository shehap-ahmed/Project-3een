import { PracticePathData } from '../../types/practice';
import { class01PracticePath } from './class01Practice';
import { class02PracticePath } from './class02Practice';
import { class03PracticePath } from './class03Practice';
import { class04PracticePath } from './class04Practice';
import { class05PracticePath } from './class05Practice';

// Registry of practice paths by course slug/id and lesson order or ID
const practicePathRegistry: Record<string, PracticePathData> = {
  // Course: msa-beginner-pilot -> Lesson 1
  'msa-beginner-pilot_1': class01PracticePath,
  'msa-beginner-pilot_arabic-letters--harakat': class01PracticePath,
  // Course: msa-beginner-pilot -> Lesson 2
  'msa-beginner-pilot_2': class02PracticePath,
  'msa-beginner-pilot_pronouns': class02PracticePath,
  // Course: msa-beginner-pilot -> Lesson 3
  'msa-beginner-pilot_3': class03PracticePath,
  'msa-beginner-pilot_sentence-types': class03PracticePath,
  // Course: msa-beginner-pilot -> Lesson 4
  'msa-beginner-pilot_4': class04PracticePath,
  'msa-beginner-pilot_verb-types': class04PracticePath,
  // Course: msa-beginner-pilot -> Lesson 5
  'msa-beginner-pilot_5': class05PracticePath,
  'msa-beginner-pilot_masculine--feminine': class05PracticePath,
};

export const getPracticePathForLesson = (
  courseIdOrSlug: string,
  lessonOrderOrId: number | string
): PracticePathData | null => {
  const primaryKey = `${courseIdOrSlug}_${lessonOrderOrId}`;
  if (practicePathRegistry[primaryKey]) {
    return practicePathRegistry[primaryKey];
  }

  // Fallback check by lesson order if string ID was passed
  if (courseIdOrSlug === 'msa-beginner-pilot') {
    if (lessonOrderOrId === 1 || lessonOrderOrId === '1') return class01PracticePath;
    if (lessonOrderOrId === 2 || lessonOrderOrId === '2') return class02PracticePath;
    if (lessonOrderOrId === 3 || lessonOrderOrId === '3') return class03PracticePath;
    if (lessonOrderOrId === 4 || lessonOrderOrId === '4') return class04PracticePath;
    if (lessonOrderOrId === 5 || lessonOrderOrId === '5') return class05PracticePath;
  }

  return null;
};
