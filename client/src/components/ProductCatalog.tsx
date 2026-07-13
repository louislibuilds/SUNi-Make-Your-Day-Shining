import { useState, useMemo } from 'react';
import { Search, Filter, SlidersHorizontal, Grid3X3, List, Star, Heart, ArrowUpDown } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { Slider } from './ui/slider';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { Separator } from './ui/separator';
import { ImageWithFallback } from './ui/image-with-fallback';
import { categories, brands, type Product } from '../data/products';
import { useCatalogProducts } from '../hooks/useCatalogProducts';
import { useCartStore } from '../store/cartStore';

interface ProductCatalogProps {
  selectedCategory?: string;
}

export function ProductCatalog({ selectedCategory = "All Products" }: ProductCatalogProps) {
  const { products, source, loading } = useCatalogProducts({
    category: selectedCategory !== 'All Products' ? selectedCategory : undefined,
  });
  const addItem = useCartStore((state) => state.addItem);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([selectedCategory]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [showInStockOnly, setShowInStockOnly] = useState(false);
  const [showNewOnly, setShowNewOnly] = useState(false);

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter(product => {
      // Search query filter
      if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !product.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !product.category.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }

      // Category filter
      if (selectedCategories.length > 0 && !selectedCategories.includes("All Products") && 
          !selectedCategories.includes(product.category)) {
        return false;
      }

      // Brand filter
      if (selectedBrands.length > 0 && !selectedBrands.includes("All Brands") && 
          !selectedBrands.includes(product.brand)) {
        return false;
      }

      // Price filter
      if (product.price < priceRange[0] || product.price > priceRange[1]) {
        return false;
      }

      // Stock filter
      if (showInStockOnly && !product.inStock) {
        return false;
      }

      // New products filter
      if (showNewOnly && !product.isNew) {
        return false;
      }

      return true;
    });

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default: // featured
        filtered.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
    }

    return filtered;
  }, [products, searchQuery, sortBy, selectedCategories, selectedBrands, priceRange, showInStockOnly, showNewOnly]);

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (category === "All Products") {
      setSelectedCategories(checked ? [category] : []);
    } else {
      setSelectedCategories(prev => {
        const filtered = prev.filter(c => c !== "All Products");
        return checked 
          ? [...filtered, category]
          : filtered.filter(c => c !== category);
      });
    }
  };

  const handleBrandChange = (brand: string, checked: boolean) => {
    if (brand === "All Brands") {
      setSelectedBrands(checked ? [brand] : []);
    } else {
      setSelectedBrands(prev => {
        const filtered = prev.filter(b => b !== "All Brands");
        return checked 
          ? [...filtered, brand]
          : filtered.filter(b => b !== brand);
      });
    }
  };

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h4 className="font-semibold mb-4">Categories</h4>
        <div className="space-y-3">
          {categories.map(category => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category}`}
                checked={selectedCategories.includes(category)}
                onCheckedChange={(checked) => handleCategoryChange(category, !!checked)}
              />
              <Label htmlFor={`category-${category}`} className="text-sm">{category}</Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Brands */}
      <div>
        <h4 className="font-semibold mb-4">Brands</h4>
        <div className="space-y-3">
          {brands.map(brand => (
            <div key={brand} className="flex items-center space-x-2">
              <Checkbox
                id={`brand-${brand}`}
                checked={selectedBrands.includes(brand)}
                onCheckedChange={(checked) => handleBrandChange(brand, !!checked)}
              />
              <Label htmlFor={`brand-${brand}`} className="text-sm">{brand}</Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Price Range */}
      <div>
        <h4 className="font-semibold mb-4">Price Range</h4>
        <div className="space-y-4">
          <div className="px-3">
            <Slider
              value={priceRange}
              onValueChange={setPriceRange}
              max={200}
              min={0}
              step={5}
              className="w-full"
            />
          </div>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}+</span>
          </div>
        </div>
      </div>

      <Separator />

      {/* Other Filters */}
      <div>
        <h4 className="font-semibold mb-4">Other Filters</h4>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="in-stock"
              checked={showInStockOnly}
              onCheckedChange={(checked) => setShowInStockOnly(checked === true)}
            />
            <Label htmlFor="in-stock" className="text-sm">In Stock Only</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="new-products"
              checked={showNewOnly}
              onCheckedChange={(checked) => setShowNewOnly(checked === true)}
            />
            <Label htmlFor="new-products" className="text-sm">New Products</Label>
          </div>
        </div>
      </div>
    </div>
  );

  const ProductCard = ({ product }: { product: Product }) => (
    <Card className="group cursor-pointer border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
      <div className="relative">
        <ImageWithFallback 
          src={product.image}
          seed={product.id}
          label={product.name}
          alt={product.name}
          className={`w-full object-cover group-hover:scale-105 transition-transform duration-300 ${
            viewMode === 'grid' ? 'h-64' : 'h-48'
          }`}
        />
        <div className="absolute top-3 left-3 flex gap-2">
          {product.isNew && (
            <Badge className="bg-green-500 text-white">New</Badge>
          )}
          {product.isBestSeller && (
            <Badge className="bg-orange-500 text-white">Best Seller</Badge>
          )}
          {product.originalPrice && (
            <Badge variant="destructive">Sale</Badge>
          )}
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-3 right-3 bg-white/90 hover:bg-white h-8 w-8"
        >
          <Heart className="h-4 w-4" />
        </Button>
      </div>
      
      <CardContent className={`space-y-4 ${viewMode === 'grid' ? 'p-6' : 'p-4'}`}>
        <div>
          <h3 className="font-semibold group-hover:text-orange-600 transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">{product.brand}</p>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i}
                  className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {product.rating} ({product.reviews})
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-orange-600">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
          {!product.inStock && (
            <Badge variant="outline" className="text-red-600 border-red-200">
              Out of Stock
            </Badge>
          )}
        </div>

        <Button 
          className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white"
          disabled={!product.inStock}
          onClick={() => addItem(product)}
        >
          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">
            {selectedCategory === "All Products" ? "All Products" : selectedCategory}
          </h1>
          <p className="text-xl text-muted-foreground">
            Discover products that make everyday shining
            {source === 'mock' && (
              <span className="block text-sm mt-1 text-muted-foreground/80">Showing local demo catalog (API offline)</span>
            )}
          </p>
        </div>

        {/* Search and Controls */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search products..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white border-orange-200 focus:border-orange-300"
            />
          </div>

          {/* Controls */}
          <div className="flex gap-4">
            {/* Mobile Filter */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="lg:hidden border-orange-200">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                  <SheetDescription>
                    Refine your search to find the perfect products
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-6">
                  <FilterContent />
                </div>
              </SheetContent>
            </Sheet>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48 border-orange-200">
                <ArrowUpDown className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Customer Rating</SelectItem>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="name">Name A-Z</SelectItem>
              </SelectContent>
            </Select>

            {/* View Mode */}
            <div className="flex border border-orange-200 rounded-md">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="icon"
                onClick={() => setViewMode('grid')}
                className={viewMode === 'grid' ? 'bg-orange-500 hover:bg-orange-600' : ''}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="icon"
                onClick={() => setViewMode('list')}
                className={viewMode === 'list' ? 'bg-orange-500 hover:bg-orange-600' : ''}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Desktop Filters Sidebar */}
          <div className="hidden lg:block w-64 shrink-0">
            <Card className="p-6 sticky top-24">
              <h3 className="font-semibold mb-6 flex items-center">
                <SlidersHorizontal className="h-5 w-5 mr-2" />
                Filters
              </h3>
              <FilterContent />
            </Card>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <p className="text-muted-foreground">
                Showing {filteredAndSortedProducts.length} of {products.length} products
              </p>
            </div>

            {loading ? (
              <p className="text-center text-muted-foreground py-16">Loading products…</p>
            ) : filteredAndSortedProducts.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-semibold mb-2">No products found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your filters or search terms
                </p>
              </div>
            ) : (
              <div className={`grid gap-8 ${
                viewMode === 'grid' 
                  ? 'md:grid-cols-2 lg:grid-cols-3' 
                  : 'grid-cols-1 md:grid-cols-2'
              }`}>
                {filteredAndSortedProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}