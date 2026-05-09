// Persistent storage: IndexedDB for file binaries, localStorage for structure & photos

const DB_NAME = 'lumara_vault';
const DB_VERSION = 1;
const FILES_STORE = 'files';

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = (e) => {
      const db = (e.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(FILES_STORE)) {
        db.createObjectStore(FILES_STORE, { keyPath: 'id' });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export async function saveFileToDB(id: string, file: File): Promise<void> {
  const db = await openDB();
  const arrayBuffer = await file.arrayBuffer();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(FILES_STORE, 'readwrite');
    tx.objectStore(FILES_STORE).put({ id, arrayBuffer, type: file.type, name: file.name });
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

export async function saveImageToDB(id: string, blob: Blob): Promise<void> {
  const db = await openDB();
  const arrayBuffer = await blob.arrayBuffer();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(FILES_STORE, 'readwrite');
    tx.objectStore(FILES_STORE).put({ id, arrayBuffer, type: blob.type, name: id });
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

// Returns a map of { id -> blob URL } for all stored files
export async function loadAllBlobURLs(): Promise<Record<string, string>> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(FILES_STORE, 'readonly');
    const req = tx.objectStore(FILES_STORE).getAll();
    req.onsuccess = () => {
      const result: Record<string, string> = {};
      for (const record of req.result) {
        const blob = new Blob([record.arrayBuffer], { type: record.type });
        result[record.id] = URL.createObjectURL(blob);
      }
      resolve(result);
    };
    req.onerror = () => reject(req.error);
  });
}

export async function deleteFileFromDB(id: string): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(FILES_STORE, 'readwrite');
    tx.objectStore(FILES_STORE).delete(id);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

// --- localStorage: vault structure (folders + file metadata without blob URLs) ---

const STRUCTURE_KEY = 'lumara_structure';
const PHOTOS_KEY = 'lumara_photos';

function stripBlobUrls(items: any[]): any[] {
  return items.map(item => {
    if (item.type === 'folder') {
      return { ...item, children: stripBlobUrls(item.children) };
    }
    // Keep data: URLs (signatures/base64 images), remove blob: URLs (temporary)
    const url = item.url?.startsWith('blob:') ? undefined : item.url;
    return { ...item, url };
  });
}

export function saveStructure(data: any[]): void {
  try {
    localStorage.setItem(STRUCTURE_KEY, JSON.stringify(stripBlobUrls(data)));
  } catch {
    // localStorage might be full; fail silently
  }
}

export function loadStructure(): any[] | null {
  try {
    const saved = localStorage.getItem(STRUCTURE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
}

export function savePhotos(photos: Record<string, string>): void {
  try {
    // Only save blob: URLs that have been converted — skip temporary blob: URLs
    const clean: Record<string, string> = {};
    for (const [k, v] of Object.entries(photos)) {
      if (!v.startsWith('blob:')) clean[k] = v;
    }
    localStorage.setItem(PHOTOS_KEY, JSON.stringify(clean));
  } catch {}
}

export function loadPhotos(): Record<string, string> {
  try {
    const saved = localStorage.getItem(PHOTOS_KEY);
    return saved ? JSON.parse(saved) : {};
  } catch {
    return {};
  }
}
