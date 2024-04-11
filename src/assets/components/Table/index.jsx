// CityTable.jsx
import "./style.css";

function CityTable({
  cities,
  loading,
  searchTerm,
  page,
  onPageChange,
  setLimit,
  limit,
}) {
  const pageSize = 3;
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const displayedCities = cities.slice(startIndex, endIndex);

  const totalPages = Math.ceil(cities.length / pageSize);
  const handlePageSizeChange = (e) => {
    setLimit(e.target.value);
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Place Name</th>
            <th>Country</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="3">Loading...</td>
            </tr>
          ) : displayedCities.length > 0 ? (
            displayedCities.map((city, index) => (
              <tr id="data-display" key={city.id}>
                <td id="id-col">{startIndex + index + 1}</td>
                <td id="place-name">{city.name}</td>
                <td id="img-country-wrapper">
                  <img
                    src={`https://flagsapi.com/${city.countryCode}/shiny/32.png`}
                    alt={`${city.country} flag`}
                  />
                  {city.country}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">
                {searchTerm.trim() === ""
                  ? "Start searching"
                  : "No result found"}
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {cities.length > pageSize && (
        <div className="pagination-dropdown-wrapper">
          <div className="pagination">
            <button
              onClick={() => onPageChange(page - 1)}
              disabled={page === 1}
            >
              {"<"}
            </button>
            <span>
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => onPageChange(page + 1)}
              disabled={page === totalPages}
            >
              {">"}
            </button>
          </div>
          <div className="optional">
            <select value={limit} onChange={handlePageSizeChange}>
              {[5, 6, 7, 8, 9, 10].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
}

export default CityTable;
