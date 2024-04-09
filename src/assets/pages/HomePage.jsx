import SearchBox from "./../components/SearchBox/index";
import { useEffect, useState } from "react";
import axios from "axios";
import CityTable from "../components/Table";
import "./homepage.css";
import useDebounce from "../hooks/useDebounce";

function HomePage() {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const debouncedValue = useDebounce(searchTerm, 1000);

  const fetchCities = async (searchTerm) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://wft-geo-db.p.rapidapi.com/v1/geo/cities`,
        {
          params: {
            countryIds: "IN",
            namePrefix: searchTerm,
            limit: 10, // Default limit is 10
          },
          headers: {
            "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
            "x-rapidapi-key": import.meta.env.VITE_API_KEY,
          },
        }
      );
      setCities(response.data.data);
    } catch (error) {
      console.error("Error fetching cities:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    setPage(1); // Reset page to 1 on new search
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    if (debouncedValue.trim() === "") {
      setCities([]);
    } else {
      fetchCities(debouncedValue);
    }
  }, [debouncedValue, page]); // Add page to dependencies

  return (
    <div>
      <SearchBox
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onSearch={handleSearch}
      />
      <CityTable
        cities={cities}
        loading={loading}
        searchTerm={searchTerm}
        page={page}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default HomePage;
