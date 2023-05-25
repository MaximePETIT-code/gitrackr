import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import SearchResults from "./SearchResults/SearchResults";
import styles from "./SearchUser.module.scss";
import enterIcon from "./enter.svg";

export default function SearchUser() {
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchValue.trim() !== "") {
        fetchUserData();
      } else {
        setSearchResults([]); // Réinitialiser les résultats de recherche lorsque l'input est vide
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchValue]);

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (searchResults.length > 0) {
      const firstUser = searchResults[0];
      navigate(`/${firstUser.login}/`);
    }
  };

  const fetchUserData = async () => {
    // Envoyer la requête à l'API GitHub
    const response = await fetch(
      `https://api.github.com/search/users?q=${searchValue}`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      const users = data.items.slice(0, 3); // Obtenir les 3 premiers résultats

      setSearchResults(users);
    }
  };

  return (
    <>
      <form onSubmit={handleFormSubmit} className={styles.searchBar}>
        <input
          ref={inputRef}
          type="text"
          value={searchValue}
          onChange={handleSearchChange}
          placeholder="Search a GitHub user"
          className={styles.searchBar__input}
        />
        <button type="submit" className={styles.searchBar__button}>
          <img src={enterIcon} alt="enter icon" />
        </button>
      </form>

      {searchResults.length > 0 && (
        <SearchResults
          users={searchResults}
          key={searchResults.map((user) => user.id).join("-")}
        />
      )}
    </>
  );
}
