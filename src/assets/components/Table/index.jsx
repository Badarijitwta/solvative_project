

const Table = ({ cities, pagination, loading, onPageChange }) => {
  let tableContent;

  if (loading) {
    tableContent = (
      <tr>
        <td colSpan="3">
          Loading...
        </td>
      </tr>
    );
  } else if (!cities || cities.length === 0) {
    tableContent = (
      <tr>
        <td colSpan="3">
          {!pagination ? "Start searching" : "No result found"}
        </td>
      </tr>
    );
  } else {
    tableContent = cities.map((city, index) => (
      <tr key={city.id}>
        <td>{pagination.currentOffset + index + 1}</td>
        <td>{city.name}</td>
        <td>
          <img
            src={`https://www.countryflags.io/${city.countryCode.toLowerCase()}/flat/64.png`}
            alt={city.countryCode}
          />
          {city.country}
        </td>
      </tr>
    ));
  }

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Place Name</th>
            <th>Country</th>
          </tr>
        </thead>
        <tbody>{tableContent}</tbody>
      </table>
      {pagination && (
        <div className="pagination">
          <button
            onClick={() => onPageChange(pagination.currentOffset - 5)}
            disabled={pagination.currentOffset === 0}
          >
            Previous
          </button>
          <span>Page {Math.ceil((pagination.currentOffset + 1) / 5)}</span>
          <button
            onClick={() => onPageChange(pagination.currentOffset + 5)}
            disabled={pagination.currentOffset + 5 >= pagination.totalCount}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Table;
