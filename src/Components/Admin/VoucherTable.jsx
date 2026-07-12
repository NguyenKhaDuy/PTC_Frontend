import VoucherRow from "./VoucherRow";

export default function VoucherTable({ vouchers, onEdit, onDelete }) {
  return (
    <div className="bg-[#181818] rounded-2xl border border-[#2d2d2d] overflow-hidden">
      <table className="w-full">
        <thead className="bg-[#202020]">
          <tr>
            <th className="py-4 px-5 text-left">Voucher</th>
            <th>Giảm giá</th>
            <th>Số lượng</th>
            <th>Hết hạn</th>
            <th>Trạng thái</th>
            <th className="text-center">Thao tác</th>
          </tr>
        </thead>

        <tbody>
          {vouchers.map((voucher) => (
            <VoucherRow
              key={voucher.id}
              voucher={voucher}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
