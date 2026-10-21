import { useState, useEffect } from 'react';
import FilterBar from '../components/FilterBar';
import ExpenseTable from '../components/ExpenseTable';

const ExpenseList = ({ expenses, onDelete, onToggle }) => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('Tất cả');
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleQueryShift = (e) => setQuery(e.target.value);
  const handleCategory = (e) => setCategory(e.target.value);

  const filtered = expenses.filter(
    (e) =>
      e.title.toLowerCase().includes(query.toLowerCase()) &&
      (category === 'Tất cả' || e.category === category)
  );
  const isMobile = width < 768;

  return (
    <div>
      <p>Chế độ: {isMobile ? 'Điện thoại' : 'Máy tính'}</p>
      <FilterBar
        query={query}
        category={category}
        onQueryChange={handleQueryShift}
        onCategoryChange={handleCategory}
      />
      <p>Tìm thấy {filtered.length} khoản chi</p>
      <div className={`table-wrap${isMobile ? ' mobile' : ''}`}>
        <ExpenseTable items={filtered} onDelete={onDelete} onToggle={onToggle} />
      </div>
    </div>
  );
};

export default ExpenseList;