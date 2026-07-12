import { useEffect, useState } from "react";

export default function VoucherModal({
  open,
  mode,
  voucher,
  onClose,
  onSubmit,
}) {
  const [form, setForm] = useState({
    idVoucher: null,
    code: "",
    discount: "",
    quality: "",
    expiration: "",
  });

  useEffect(() => {
    if (mode === "edit" && voucher) {
      setForm({
        idVoucher: voucher.id,
        code: voucher.code,
        discount: voucher.discount,
        quality: voucher.quality,
        expiration: voucher.expiration, // yyyy-mm-dd
      });
    }
  }, [mode, voucher]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const payload = {
      ...form,
      discount: Number(form.discount),
      quality: Number(form.quality),
    };

    onSubmit(payload);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="bg-[#181818] w-[500px] rounded-2xl p-6 space-y-4">
        <h2 className="text-xl font-bold">
          {mode === "create" ? "Thêm voucher" : "Sửa voucher"}
        </h2>

        <input
          name="code"
          value={form.code}
          onChange={handleChange}
          placeholder="Mã voucher"
          className="w-full p-3 bg-[#101010] rounded-lg border border-[#2d2d2d]"
        />

        <input
          name="discount"
          value={form.discount}
          onChange={handleChange}
          placeholder="Giảm giá"
          className="w-full p-3 bg-[#101010] rounded-lg border border-[#2d2d2d]"
        />

        <input
          name="quality"
          value={form.quality}
          onChange={handleChange}
          placeholder="Số lượng"
          className="w-full p-3 bg-[#101010] rounded-lg border border-[#2d2d2d]"
        />

        <input
          type="date"
          name="expiration"
          value={form.expiration}
          onChange={handleChange}
          className="w-full p-3 bg-[#101010] rounded-lg border border-[#2d2d2d]"
        />

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 bg-gray-600 rounded">
            Hủy
          </button>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-[#AA7D36] rounded"
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
}
