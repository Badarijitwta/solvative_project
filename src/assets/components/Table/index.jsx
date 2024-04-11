// CityTable.jsx
import "./style.css";

function CityTable({ cities, loading, searchTerm, page, onPageChange }) {
  const pageSize = 3;
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const displayedCities = cities.slice(startIndex, endIndex);

  const totalPages = Math.ceil(cities.length / pageSize);

  // State to store country flags

  // Function to fetch country flags

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
        <div className="pagination">
          <button onClick={() => onPageChange(page - 1)} disabled={page === 1}>
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
      )}
    </div>
  );
}

export default CityTable;
