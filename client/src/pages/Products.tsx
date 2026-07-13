import { ProductCatalog } from '../components/ProductCatalog';

interface ProductsProps {
  onNavigate: (page: string) => void;
}

export default function Products({ onNavigate }: ProductsProps) {
  return <ProductCatalog selectedCategory="All Products" onNavigate={onNavigate} />;
}
