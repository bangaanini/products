'use client';
import { Product } from '../types/product';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';

export default function ProductForm({
  product,
  onClose,
  onSubmit,
}: {
  product?: Product;
  onClose: () => void;
  onSubmit: (data: Product) => void;
}) {
  const [formData, setFormData] = useState<Partial<Product>>(product || {});

  useEffect(() => {
    if (product) setFormData(product);
  }, [product]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.kategori ||
      !formData.layanan ||
      !formData.paket ||
      !formData.durasi ||
      !formData.harga
    ) {
      alert('Harap isi semua field yang wajib diisi');
      return;
    }
    onSubmit(formData as Product);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>
        <h2 className="text-xl font-bold mb-4">
          {product ? 'Edit' : 'Tambah'} Produk
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Kategori *
            </label>
            <input
              required
              value={formData.kategori || ''}
              onChange={(e) =>
                setFormData({ ...formData, kategori: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Layanan *
            </label>
            <input
              required
              value={formData.layanan || ''}
              onChange={(e) =>
                setFormData({ ...formData, layanan: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Paket *
            </label>
            <input
              required
              value={formData.paket || ''}
              onChange={(e) =>
                setFormData({ ...formData, paket: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Deskripsi
            </label>
            <textarea
              value={formData.deskripsi || ''}
              onChange={(e) =>
                setFormData({ ...formData, deskripsi: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Durasi *
            </label>
            <input
              required
              value={formData.durasi || ''}
              onChange={(e) =>
                setFormData({ ...formData, durasi: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Harga (Rp) *
            </label>
            <input
              type="number"
              required
              value={formData.harga || ''}
              onChange={(e) =>
                setFormData({ ...formData, harga: Number(e.target.value) })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Simpan
          </button>
        </form>
      </div>
    </div>
  );
}