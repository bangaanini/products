'use client';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Product } from '../types/product';
export default function ProductCard({
  product,
  onEdit,
  onDelete,
}: {
  product: Product;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="relative group bg-blue-200 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={onEdit}
          className="p-1 text-blue-600 hover:bg-blue-50 rounded"
        >
          <PencilIcon className="w-5 h-5" />
        </button>
        <button
          onClick={onDelete}
          className="p-1 text-red-600 hover:bg-red-50 rounded"
        >
          <TrashIcon className="w-5 h-5" />
        </button>
      </div>
      <h3 className="text-lg text-red-800 font-semibold mb-2">{product.layanan}</h3>
      <p className="text-gray-600 mb-2">{product.paket}</p>
      <p className="text-sm text-gray-500 mb-2">{product.deskripsi}</p>
      <div className="flex justify-between items-center mt-4">
        <span className="text-gray-700">{product.durasi}</span>
        <span className="text-lg font-bold text-blue-600">
          Rp{product.harga.toLocaleString()}
        </span>
      </div>
    </div>
  );
}