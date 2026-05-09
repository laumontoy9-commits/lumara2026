// Persistent storage: Supabase Storage for file binaries, Supabase DB for structure & photos

import { supabase } from './supabase';

const BUCKET = 'lumara-files';
const VAULT_ROW_ID = 'default';

// --- File uploads ---

export async function saveFileToDB(id: string, file: File): Promise<string> {
  const path = `files/${id}`;
  const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
    upsert: true,
    contentType: file.type,
  });
  if (error) throw error;
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

export async function saveImageToDB(id: string, blob: Blob): Promise<string> {
  const path = `photos/${id}`;
  const { error } = await supabase.storage.from(BUCKET).upload(path, blob, {
    upsert: true,
    contentType: blob.type,
  });
  if (error) throw error;
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

export async function deleteFileFromDB(id: string): Promise<void> {
  await supabase.storage.from(BUCKET).remove([`files/${id}`, `photos/${id}`]);
}

// --- Vault state (structure + photos) ---

export async function saveVaultState(structure: any[], photos: Record<string, string>): Promise<void> {
  const { error } = await supabase.from('vault_state').upsert({
    id: VAULT_ROW_ID,
    structure,
    photos,
    updated_at: new Date().toISOString(),
  });
  if (error) console.error('saveVaultState error:', error);
}

export async function loadVaultState(): Promise<{ structure: any[] | null; photos: Record<string, string> }> {
  const { data, error } = await supabase
    .from('vault_state')
    .select('structure, photos')
    .eq('id', VAULT_ROW_ID)
    .single();

  if (error || !data) return { structure: null, photos: {} };
  return {
    structure: data.structure ?? null,
    photos: data.photos ?? {},
  };
}
