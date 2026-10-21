import { CATEGORIES } from '../data';

const FilterBar = ({ query, category, onQueryChange, onCategoryChange }) => (
  <div className="filter-bar">
    <label htmlFor="search">Tìm kiếm</label>
    <input id="search" value={query} onChange={onQueryChange} />
    <label htmlFor="filter-cat">Danh mục</label>
    <select id="filter-cat" value={category} onChange={onCategoryChange}>
      {['Tất cả', ...CATEGORIES].map((c) => (
        <option key={c} value={c}>{c}</option>
      ))}
    </select>
  </div>
);

export default FilterBar;