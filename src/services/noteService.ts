import axios from 'axios';
import type { newNote, Note } from '../types/note';
interface AxiosNotesResponse {
  notes: Note[];
  totalPages: number;
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
export const fetchNotes = async (
  query: string,
  page: number
): Promise<AxiosNotesResponse> => {
  const response = await api.get<AxiosNotesResponse>('/notes', {
    params: {
      page,
      perPage: ITEMS_PER_PAGE,
      ...(query.trim() ? { search: query } : {}),
    },
  });
  return response.data;
};
export const createNote = async (note: newNote): Promise<Note> => {
  const response = await api.post<Note>('/notes', note);
  return response.data;
};
export const deleteNote = async (id: string): Promise<Note> => {
  const response = await api.delete<Note>(`/notes/${id}`);
  return response.data;
};
