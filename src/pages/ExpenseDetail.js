import { useParams, useNavigate } from 'react-router-dom';
import { formatMoney } from '../data';

const ExpenseDetail = ({ expenses }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const item = expenses.find((e) => e.id === Number(id));

  return (
    <div>
      {item ? (
        <>
          <p>Tên khoản chi: {item.title}</p>
          <p>Số tiền: {formatMoney(item.amount)}</p>
          <p>Danh mục: {item.category}</p>
          <p>Ngày: {item.date}</p>
          <p>Trạng thái: {item.paid ? 'Đã thanh toán' : 'Chưa thanh toán'}</p>
        </>
      ) : (
        <p>Không tìm thấy khoản chi</p>
      )}
      <button onClick={() => navigate(-1)}>Quay lại</button>
    </div>
  );
};

export default ExpenseDetail;