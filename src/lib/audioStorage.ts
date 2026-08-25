// Client-side IndexedDB manager for MSA Class 7 Audio files
const DB_NAME = 'ArabicCourseAudioDB';
const DB_VERSION = 1;
const STORE_NAME = 'class7_audio';

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function saveAudioFile(key: string, file: Blob | File): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const request = store.put(file, key);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

export async function getAudioFile(key: string): Promise<Blob | null> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);
    const request = store.get(key);
    request.onsuccess = () => resolve(request.result || null);
    request.onerror = () => reject(request.error);
  });
}

export async function getAllAudioFiles(): Promise<Record<string, Blob>> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);
    const keysRequest = store.getAllKeys();
    keysRequest.onsuccess = () => {
      const keys = keysRequest.result as string[];
      const valuesRequest = store.getAll();
      valuesRequest.onsuccess = () => {
        const values = valuesRequest.result as Blob[];
        const result: Record<string, Blob> = {};
        keys.forEach((k, idx) => {
          result[k] = values[idx];
        });
        resolve(result);
      };
      valuesRequest.onerror = () => reject(valuesRequest.error);
    };
    keysRequest.onerror = () => reject(keysRequest.error);
  });
}

export async function deleteAudioFile(key: string): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const request = store.delete(key);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

export async function clearAllAudioFiles(): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const request = store.clear();
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

/**
 * Normalizes file names to audio keys:
 * "q1.mp3" -> "q1"
 * "a1.mp3" -> "a1"
 * "Question 2.m4a" -> "q2"
 * "Answer 2.wav" -> "a2"
 * "q-05.mp3" -> "q5"
 */
export function parseAudioFilename(filename: string): string | null {
  const cleanName = filename.toLowerCase().replace(/\.[^/.]+$/, '').trim();
  
  // Match q1, q01, question1, question_1, question-1
  const qMatch = cleanName.match(/^(?:q|question)[\s_-]*0*(\d+)$/i);
  if (qMatch) {
    return `q${parseInt(qMatch[1], 10)}`;
  }

  // Match a1, a01, answer1, answer_1, answer-1
  const aMatch = cleanName.match(/^(?:a|answer)[\s_-]*0*(\d+)$/i);
  if (aMatch) {
    return `a${parseInt(aMatch[1], 10)}`;
  }

  return null;
}
