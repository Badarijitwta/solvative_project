import SearchBox from "./../components/SearchBox/index";
import { useEffect, useState } from "react";
import axios from "axios";
import CityTable from "../components/Table";
import "./homepage.css";
import useDebounce from "../hooks/useDebounce";
import Spinner from "../components/Spinner";

function HomePage() {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const debouncedValue = useDebounce(searchTerm, 1000);

  const fetchCities = async (searchTerm) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://wft-geo-db.p.rapidapi.com/v1/geo/cities`,
        {
          mode: "no-cors",
          credentials: "include",
          params: {
            countryIds: "IN",
            namePrefix: searchTerm,
            limit: limit || 10, // Default limit is 10
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

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    if (debouncedValue.trim() === "") {
      setCities([]);
    } else {
      fetchCities(debouncedValue);
    }
  }, [debouncedValue, limit]); // Add page to dependencies

  return (
    <main className="home-page-main">
      <SearchBox searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {loading ? (
        <Spinner />
      ) : (
        <CityTable
          cities={cities}
          loading={loading}
          searchTerm={searchTerm}
          page={page}
          onPageChange={handlePageChange}
          setLimit={setLimit}
          limit={limit}
        />
      )}
    </main>
  );
}

export default HomePage;
