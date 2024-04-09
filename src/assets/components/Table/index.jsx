// CityTable.jsx

function CityTable({ cities, loading, searchTerm, page, onPageChange }) {
  const pageSize = 3;
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const displayedCities = cities.slice(startIndex, endIndex);

  const totalPages = Math.ceil(cities.length / pageSize);

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
              <tr key={city.id}>
                <td>{startIndex + index + 1}</td>
                <td>{city.name}</td>
                <td>{city.country}</td>
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
        <div>
          <button onClick={() => onPageChange(page - 1)} disabled={page === 1}>
            Previous
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => onPageChange(page + 1)}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default CityTable;
