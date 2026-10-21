import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CATEGORIES } from '../data';

const AddExpense = ({ onAdd }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Ăn uống');
  const [date, setDate] = useState('');
  const [msg, setMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || amount === '' || !category || !date) {
      setMsg('Vui lòng nhập đầy đủ thông tin');
      return;
    }
    const n = Number(amount);
    if (!Number.isInteger(n) || n < 1000 || n > 100000000) {
      setMsg('Số tiền phải từ 1.000 đến 100.000.000');
      return;
    }
    onAdd({ title: title.trim(), amount: n, category, date });
    navigate('/expenses', { replace: true });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Tên khoản chi</label>
        <input id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div>
        <label htmlFor="amount">Số tiền</label>
        <input
          id="amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="cat">Danh mục</label>
        <select id="cat" value={category} onChange={(e) => setCategory(e.target.value)}>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="date">Ngày chi</label>
        <input
          id="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <button type="submit">Thêm</button>
      {msg && <p>{msg}</p>}
    </form>
  );
};

export default AddExpense;