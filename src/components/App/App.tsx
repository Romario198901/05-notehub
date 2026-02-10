import { createNote, deleteNote, fetchNotes } from '../../services/noteService';
import css from './App.module.css';

function App() {
  fetchNotes('todo', 1).then((data) => { console.log(data) });
  createNote({ title: 'Sample Photo', content: '', tag: 'Todo' }).then((data) => { console.log(data) });
  deleteNote('cmlgxwca31t9wyy8uy0mydp38').then(() => { console.log('Note deleted') });
  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        {/* Компонент SearchBox */}
        {/* Пагінація */}
        {/* Кнопка створення нотатки */}
      </header>
    </div>
  );
}

export default App;
