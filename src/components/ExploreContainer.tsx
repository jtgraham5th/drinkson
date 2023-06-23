import { useState } from "react";
import MapContainer from "./MapContainer";
import './ExploreContainer.css';

interface ContainerProps {}

const ExploreContainer: React.FC<ContainerProps> = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<string[]>([]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Perform search logic with the search term
    console.log("Search term:", searchTerm);

    // Add the search term to the search results
    setSearchResults((prevSearchResults) => [...prevSearchResults, searchTerm]);

    // Clear the search term after submitting
    setSearchTerm("");
  };

  return (
    <div className="container">
      <div className="search-container">
        <form onSubmit={handleSearchSubmit}>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search For a Bar..."
          />
          <button type="submit">Search</button>
        </form>
      </div>
      <div className="column">
        <MapContainer searchTerm={searchTerm} />
      </div>
      <div className="column">
        <div className="card-container">
          {searchResults.map((result, index) => (
            <div key={index} className="card">
              {result}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExploreContainer;
