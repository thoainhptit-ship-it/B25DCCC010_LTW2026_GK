const BUILD_TAG = "mv-3358";
/* eslint-disable import/first */
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Layout from './components/Layout';
import Home from './pages/Home';
import ExpenseList from './pages/ExpenseList';
import AddExpense from './pages/AddExpense';
import ExpenseDetail from './pages/ExpenseDetail';
import './App.css';

const App = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('gk_expenses');
    if (saved) {
      setExpenses(JSON.parse(saved));
      setLoading(false);
      return;
    }
    const controller = new AbortController();
    axios
      .get('/data/expenses.json', { signal: controller.signal })
      .then((res) => {
        setExpenses(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (axios.isCancel(err)) return;
        setError('Không tải được dữ liệu');
        setLoading(false);
      });
    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (!loading && !error) {
      localStorage.setItem('gk_expenses', JSON.stringify(expenses));
    }
  }, [expenses, loading, error]);

  const addExpense = (item) =>
    setExpenses((prev) => {
      const maxId = prev.reduce((m, e) => Math.max(m, e.id), 0);
      return [...prev, { ...item, id: maxId + 1, paid: false }];
    });

  const deleteExpense = (id) =>
    setExpenses((prev) => prev.filter((e) => e.id !== id));

  const togglePaid = (id) =>
    setExpenses((prev) =>
      prev.map((e) => (e.id === id ? { ...e, paid: !e.paid } : e))
    );

  const wrap = (page) =>
    loading ? <p>Đang tải...</p> : error ? <p>{error}</p> : page;

  return (
    <div data-build={BUILD_TAG}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={wrap(<Home expenses={expenses} />)} />
          <Route
            path="expenses"
            element={wrap(
              <ExpenseList
                expenses={expenses}
                onDelete={deleteExpense}
                onToggle={togglePaid}
              />
            )}
          />
          <Route path="expenses/new" element={wrap(<AddExpense onAdd={addExpense} />)} />
          <Route path="expenses/:id" element={wrap(<ExpenseDetail expenses={expenses} />)} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;