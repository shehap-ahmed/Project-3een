import { PracticePathData } from '../../types/practice';
import { class01PracticePath } from './class01Practice';

// Registry of practice paths by course slug/id and lesson order or ID
const practicePathRegistry: Record<string, PracticePathData> = {
  // Course: msa-beginner-pilot -> Lesson 1
  'msa-beginner-pilot_1': class01PracticePath,
  'msa-beginner-pilot_arabic-letters--harakat': class01PracticePath,
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
  if (courseIdOrSlug === 'msa-beginner-pilot' && (lessonOrderOrId === 1 || lessonOrderOrId === '1')) {
    return class01PracticePath;
  }

  return null;
};
