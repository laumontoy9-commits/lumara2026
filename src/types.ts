export type DocumentStatus = 'pending' | 'reviewed' | 'approved';

export interface FileEntry {
  id: string;
  name: string;
  type: 'file';
  extension: string;
  size: string;
  uploadedBy: string;
  uploadedAt: string;
  status: DocumentStatus;
  category: string;
  url?: string;
  isUserUploaded?: boolean;
}

export interface FolderEntry {
  id: string;
  name: string;
  type: 'folder';
  children: (FileEntry | FolderEntry)[];
}

export type RootEntry = FileEntry | FolderEntry;
