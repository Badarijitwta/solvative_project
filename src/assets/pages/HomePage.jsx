import { useEffect, useState } from "react";
import Table from "../components/Table";
import SearchBox from "../components/SearchBox";
import axios from "axios";

function HomePage() {
  const [query, setQuery] = useState("");
  const [cities, setCities] = useState([]);
  const [pagination, setPagination] = useState({
    currentOffset: 0,
    totalCount: 0,
  });
  const [limit, setLimit] = useState(5);
  const [warning, setWarning] = useState("");
  const [loading, setLoading] = useState(false);

  // Debounce function
  const debounce = (func, delay) => {
    let timeoutId;
    return function (...args) {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };

  const handleSearch = (searchQuery) => {
    fetchData(searchQuery);
  };

  // Debounced search function
  const debouncedSearch = debounce(handleSearch, 1000);

  useEffect(() => {
    if (query.trim() === "") {
      setCities(cities);
      return;
    }
    setLoading(true);
    debouncedSearch(query); // Call the debounced search function
  }, [query, limit, debouncedSearch]);

  const fetchData = async (searchQuery) => {
    try {
      const response = await axios.get(
        "https://wft-geo-db.p.rapidapi.com/v1/geo/cities",
        {
          params: {
            countryIds: "IN",
            namePrefix: searchQuery,
            limit: limit,
            offset: pagination.currentOffset,
          },
          headers: {
            "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
            "x-rapidapi-key": import.meta.env.VITE_API_KEY,
          },
        }
      );
      setCities(response.data.data);
      setPagination(response.data.metadata);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleLimitChange = (e) => {
    const newLimit = parseInt(e.target.value);
    if (newLimit > 10) {
      setWarning("Max limit is 10");
    } else {
      setLimit(newLimit);
      setWarning("");
    }
  };

  const handlePageChange = (newOffset) => {
    setPagination({ ...pagination, currentOffset: newOffset });
  };

  return (
    <div className="home-page-main">
      <SearchBox
        query={query}
        setQuery={setQuery}
        handleSearch={handleSearch}
        handleLimitChange={handleLimitChange}
        limit={limit}
      />
      <Table
        cities={cities}
        pagination={pagination}
        loading={loading}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default HomePage;
