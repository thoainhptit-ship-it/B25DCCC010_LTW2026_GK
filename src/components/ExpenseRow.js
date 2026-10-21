import { Link } from 'react-router-dom';
import { formatMoney } from '../data';

const ExpenseRow = ({ item, onDelete, onToggle }) => {
  const { id, title, amount, category, date, paid } = item;
  return (
    <tr>
      <td><Link to={`/expenses/${id}`}>{title}</Link></td>
      <td>{formatMoney(amount)}</td>
      <td className="col-category">{category}</td>
      <td className="col-date">{date}</td>
      <td className={paid ? '' : 'unpaid'}>
        {paid ? 'Đã thanh toán' : 'Chưa thanh toán'}
      </td>
      <td>
        <button onClick={() => onToggle(id)}>
          {paid ? 'Đánh dấu chưa trả' : 'Đánh dấu đã trả'}
        </button>
        <button onClick={() => onDelete(id)}>Xóa</button>
      </td>
    </tr>
  );
};

export default ExpenseRow;