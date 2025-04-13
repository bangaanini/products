'use client';
import { useEffect, useState } from 'react';
import { supabase } from './lib/supabaseClient';
import ProductCard from './components/ProductCard';
import ProductForm from './components/ProductForm';
import { Product } from './types/product';
import { toast } from 'react-hot-toast';
import ConfirmationDialog from './components/ConfirmationDialog';
import LoadingState from './components/LoadingState';
import SearchBar from './components/SearchBar';

export default function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('products')
        .select('*')
        .ilike('layanan', `%${search}%`);

      const { data, error } = await query;
      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      toast.error('Gagal memuat produk');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();

    const subscription = supabase
      .channel('products')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'products' },
        () => fetchProducts()
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [search]);

  const handleDelete = async (id: string) => {
    setLoading(true);
    try {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (error) throw error;
      toast.success('Produk berhasil dihapus');
    } catch (error) {
      toast.error('Gagal menghapus produk');
    } finally {
      setLoading(false);
      setDeleteId(null);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Kelola Produk</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Tambah Produk
        </button>
      </div>

      <SearchBar value={search} onChange={setSearch} />

      {loading ? (
        <LoadingState />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onEdit={() => {
                setSelectedProduct(product);
                setShowForm(true);
              }}
              onDelete={() => setDeleteId(product.id!)}
            />
          ))}
        </div>
      )}

      {showForm && (
        <ProductForm
          product={selectedProduct || undefined}
          onClose={() => {
            setShowForm(false);
            setSelectedProduct(null);
          }}
          onSubmit={async (data) => {
            try {
              setLoading(true);
              if (data.id) {
                await supabase
                  .from('products')
                  .update(data)
                  .eq('id', data.id);
              } else {
                await supabase.from('products').insert(data);
              }
              toast.success('Produk berhasil disimpan');
              setShowForm(false);
            } catch (error) {
              toast.error('Gagal menyimpan produk');
            } finally {
              setLoading(false);
            }
          }}
        />
      )}

      <ConfirmationDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={() => deleteId && handleDelete(deleteId)}
      />
    </div>
  );
}