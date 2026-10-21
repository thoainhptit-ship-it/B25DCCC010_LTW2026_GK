import ExpenseRow from './ExpenseRow';

const ExpenseTable = ({ items, onDelete, onToggle }) => (
  <table>
    <thead>
      <tr>
        <th>Khoản chi</th>
        <th>Số tiền</th>
        <th className="col-category">Danh mục</th>
        <th className="col-date">Ngày</th>
        <th>Trạng thái</th>
        <th>Thao tác</th>
      </tr>
    </thead>
    <tbody>
      {items.length === 0 ? (
        <tr>
          <td colSpan="6">Không có dữ liệu</td>
        </tr>
      ) : (
        items.map((e) => (
          <ExpenseRow key={e.id} item={e} onDelete={onDelete} onToggle={onToggle} />
        ))
      )}
    </tbody>
  </table>
);

export default ExpenseTable;