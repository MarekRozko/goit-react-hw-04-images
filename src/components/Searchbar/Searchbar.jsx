import { useState} from 'react';
import PropTypes from 'prop-types';
import styles from './searchbar.module.css';
import { toast } from 'react-toastify';
import initialState from './initialState';

const Searchbar = ({ onSubmit }) => {
  const [state, setState] = useState({...initialState });
  const { search } = state;

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setState(prevState => {
      return {...prevState, [name]: value };
    })
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({ ...state });
    if (search.trim() === '') {
      toast.error("Enter image's name", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
      return;
    }
  setState({...initialState });
  };

return (
      <header className={styles.header}>
        <form className={styles.SearchForm} onSubmit={handleSubmit}>
          <input
            className={styles.SearchInput}
            value={search}
            onChange={handleChange}
            name="search"
            placeholder="Search images and photo"
                />
            <button
            type="submit"
            className={styles.SearchButton}
            onClick={handleSubmit}>
            <span className={styles.SearchFormButtonLabel}>Search</span>
          </button>    
        </form>
      </header>
    );
}
  


export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};


