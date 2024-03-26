import css from './SearchBar.module.css';
import toast, { Toaster } from 'react-hot-toast';

const SearchBar = ({ onSearch }) => {
  const handleSubmit = e => {
    e.preventDefault();
    const form = e.target;
    const query = form.elements.query.value;

    if (!query.trim().length) {
      toast.error('Input field is empty. Please provide a value.', {
        style: {
          // border: '1px solid black',
          padding: '16px',
          color: '',
        },
        iconTheme: {
          primary: '',
          secondary: '',
        },
      });

      return;
    }

    onSearch(query);
    form.reset();
  };

  return (
    <header className={css.header}>
      <Toaster position="top-right" />
      <form className={css.form} onSubmit={handleSubmit}>
        <input
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="query"
        />
        <button className={css.btn} type="submit">
          Search
        </button>
      </form>
    </header>
  );
};

export default SearchBar;
