const SearchDrop = ({
  filterCriteria,
  setFilterCriteria,
  categories,
  search,
  setSearch,
}: {
  filterCriteria: string;
  setFilterCriteria: React.Dispatch<React.SetStateAction<string>>;
  categories: string[];
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  
}) => {
  return (
    <div className="row mb-2">
      <div className="col-md-4">
        <select
          className="form-select mb-3"
          value={filterCriteria}
          onChange={(e) => setFilterCriteria(e.target.value)}
        >
          <option value="all">All Categories</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="col-md-4">
        <input
          className="form-control mb-3"
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
          <datalist id="productSuggestions">
          {/* Add dynamic data list options based on API response */}
          {categories.map((category, index) => (
            <option key={index} value={category.title} />
          ))}
        </datalist>
      </div>
    </div>
  );
};
export default SearchDrop;
