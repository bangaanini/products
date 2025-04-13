'use client';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function SearchBar({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="mb-6 relative">
      <input
        type="text"
        placeholder="Cari produk..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
      />
      <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
    </div>
  );
}