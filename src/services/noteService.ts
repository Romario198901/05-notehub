import axios from 'axios';
import type { Note } from '../types/note';
interface AxiosNotesResponse {
  notes: Note[];
  totalPages: number;
}

interface createNote {
  title: string;
  content: string;
  tag: 'Todo' | 'Work' | 'Personal' | 'Idea';
}
const ITEMS_PER_PAGE = 12;
const myKey = import.meta.env.VITE_NOTEHUB_TOKEN;
const api = axios.create({
  baseURL: 'https://notehub-public.goit.study/api',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${myKey}`,
  },
});
export async function fetchNotes(
  query: string,
  page: number
): Promise<AxiosNotesResponse> {
  const response = await api.get<AxiosNotesResponse>('/notes', {
    params: {
      search: query,
      page,
      perPage: ITEMS_PER_PAGE,
    },
  });
  return response.data;
}
export async function createNote(
  note: createNote
): Promise<AxiosNotesResponse> {
  const response = await api.post<AxiosNotesResponse>('/notes', note);
  return response.data;
}
export async function deleteNote(id: string): Promise<void> {
  await api.delete<AxiosNotesResponse>(`/notes/${id}`);
}
