import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import css from './App.module.css';
import NoteList from '../NoteList/Notelist';
import { createNote, fetchNotes } from '../../services/noteService';
import { useEffect, useState } from 'react';
import SearchBox from '../SearchBox/SearchBox';
import { useDebouncedCallback } from 'use-debounce';
import toast from 'react-hot-toast';
import Pagination from '../Pagination/Pagination';
import Modal from '../Modal/Modal';
import Loader from '../Loader/Loader';
import NoteForm from '../NoteForm/NoteForm';
import Error from '../Error/Error';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const queryClient = useQueryClient();
  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ['notes', query, page],
    queryFn: () => fetchNotes(query, page),
    initialData: {
      notes: [],
      totalPages: 0,
    },
    placeholderData: keepPreviousData,
  });
  const debouncedQuery = useDebouncedCallback((value: string) => {
    setQuery(value);
    setPage(1);
  }, 500);
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedQuery(value);
  };
  useEffect(() => {
    if (query.trim() === '') return;
    if (isFetching) return;
    if (data.notes.length === 0) {
      toast.error('There aren`t notes on your search... Please try again');
    }
  }, [isFetching, query, data.notes.length]);
  const handleModalOpen = () => {
    setModalIsOpen(true);
  };
  const handleModalClose = () => {
    setModalIsOpen(false);
  };
  const createMutation = useMutation({
    mutationFn: createNote,
    onSuccess: async () => {
      toast.success('Note created');
      await queryClient.invalidateQueries({ queryKey: ['notes'] });
      handleModalClose();
    },
    onError: () => {
      toast.error('Failed to create note');
    },
  });
  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={searchTerm} onChange={handleSearch} />

        {data?.totalPages && data?.totalPages > 1 && (
          <Pagination
            page={page}
            totalPages={data.totalPages}
            onPageChange={setPage}
          />
        )}

        <button className={css.button} onClick={handleModalOpen}>
          Create note +
        </button>
      </header>

      {isLoading && <Loader />}
      {isError && <Error />}

      {data?.notes?.length > 0 && !isLoading && <NoteList notes={data.notes} />}

      {modalIsOpen && (
        <Modal onClose={handleModalClose}>
          {
            <NoteForm
              onCancel={handleModalClose}
              onSubmit={values => createMutation.mutateAsync(values)}
              isSubmitting={createMutation.isPending}
            ></NoteForm>
          }
        </Modal>
      )}
    </div>
  );
}

export default App;
