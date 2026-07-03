import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, Grid, List, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import ProductGrid from '@/components/Product/ProductGrid';
import { products, categories, getCategoryBySlug } from '@/data/mockData';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || '';
  const queryParam = searchParams.get('q') || '';
  const sortParam = searchParams.get('sort') || 'name';

  const [searchQuery, setSearchQuery] = useState(queryParam);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 2000 });
  const [sortBy, setSortBy] = useState(sortParam === 'deals' ? 'price-low' : sortParam === 'newest' ? 'newest' : 'name');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setSearchQuery(queryParam);
  }, [queryParam]);

  useEffect(() => {
    if (categoryParam) {
      const cat = getCategoryBySlug(categoryParam);
      if (cat) {
        setSelectedCategories([cat.name]);
      }
    } else {
      setSelectedCategories([]);
    }
  }, [categoryParam]);

  useEffect(() => {
    if (sortParam === 'deals') setSortBy('price-low');
    else if (sortParam === 'newest') setSortBy('newest');
  }, [sortParam]);

  const filteredProducts = useMemo(() => {
    let filtered = products.filter((product) => {
      if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !product.description.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
        return false;
      }
      if (sortParam === 'deals' && !product.originalPrice) {
        return false;
      }
      if (product.price < priceRange.min || product.price > priceRange.max) return false;
      if (inStockOnly && !product.inStock) return false;
      return true;
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low': return a.price - b.price;
        case 'price-high': return b.price - a.price;
        case 'rating': return b.rating - a.rating;
        case 'newest': return Number(b.id) - Number(a.id);
        default: return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [searchQuery, selectedCategories, priceRange, sortBy, inStockOnly, sortParam]);

  const handleCategoryChange = (category: string, checked: boolean) => {
    const next = checked
      ? [...selectedCategories, category]
      : selectedCategories.filter((c) => c !== category);
    setSelectedCategories(next);
    const slug = categories.find((c) => c.name === category)?.slug;
    if (next.length === 1 && slug) {
      setSearchParams((prev) => {
        const p = new URLSearchParams(prev);
        p.set('category', slug);
        return p;
      });
    } else if (next.length === 0) {
      setSearchParams((prev) => {
        const p = new URLSearchParams(prev);
        p.delete('category');
        return p;
      });
    }
  };

  const pageTitle = categoryParam
    ? getCategoryBySlug(categoryParam)?.name ?? 'Products'
    : sortParam === 'deals'
    ? 'Deals'
    : 'All products';

  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="mb-8">
          <h1 className="mb-2">{pageTitle}</h1>
          <p className="text-muted-foreground">{filteredProducts.length} products</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className={`lg:w-72 shrink-0 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <Card className="border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center justify-between">
                  Filters
                  <Button variant="ghost" size="sm" onClick={() => {
                    setSearchQuery('');
                    setSelectedCategories([]);
                    setPriceRange({ min: 0, max: 2000 });
                    setInStockOnly(false);
                    setSearchParams({});
                  }}>Clear</Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div>
                  <Label className="text-sm mb-2 block">Search</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setSearchParams((prev) => {
                          const p = new URLSearchParams(prev);
                          if (e.target.value) p.set('q', e.target.value);
                          else p.delete('q');
                          return p;
                        });
                      }}
                      className="pl-10"
                      placeholder="Search..."
                    />
                  </div>
                </div>
                <Separator />
                <div>
                  <Label className="text-sm mb-2 block">Categories</Label>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category.id} className="flex items-center gap-2">
                        <Checkbox
                          id={category.id}
                          checked={selectedCategories.includes(category.name)}
                          onCheckedChange={(checked) =>
                            handleCategoryChange(category.name, checked as boolean)
                          }
                        />
                        <Label htmlFor={category.id} className="text-sm font-normal">{category.name}</Label>
                      </div>
                    ))}
                  </div>
                </div>
                <Separator />
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label className="text-xs text-muted-foreground">Min</Label>
                    <Input type="number" value={priceRange.min}
                      onChange={(e) => setPriceRange((p) => ({ ...p, min: Number(e.target.value) }))} />
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">Max</Label>
                    <Input type="number" value={priceRange.max}
                      onChange={(e) => setPriceRange((p) => ({ ...p, max: Number(e.target.value) }))} />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="in-stock" checked={inStockOnly}
                    onCheckedChange={(c) => setInStockOnly(c as boolean)} />
                  <Label htmlFor="in-stock" className="text-sm font-normal">In stock only</Label>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6 p-4 rounded-lg border border-border bg-card">
              <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)} className="lg:hidden">
                <Filter className="w-4 h-4 mr-2" /> Filters
              </Button>
              <div className="flex items-center gap-3 ml-auto">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-44"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Name (A–Z)</SelectItem>
                    <SelectItem value="price-low">Price: low to high</SelectItem>
                    <SelectItem value="price-high">Price: high to low</SelectItem>
                    <SelectItem value="rating">Rating</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex border border-border rounded-md">
                  <Button variant={viewMode === 'grid' ? 'default' : 'ghost'} size="sm"
                    onClick={() => setViewMode('grid')}><Grid className="w-4 h-4" /></Button>
                  <Button variant={viewMode === 'list' ? 'default' : 'ghost'} size="sm"
                    onClick={() => setViewMode('list')}><List className="w-4 h-4" /></Button>
                </div>
              </div>
            </div>

            {viewMode === 'grid' ? (
              <ProductGrid products={filteredProducts} />
            ) : (
              <div className="space-y-3">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="flex gap-4 p-4 rounded-lg border border-border bg-card items-center">
                    <Link to={`/product/${product.id}`} className="shrink-0">
                      <img src={product.images[0]} alt={product.name} width={96} height={96}
                        className="w-24 h-24 object-cover rounded-md" loading="lazy" />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-muted-foreground">{product.category}</p>
                      <Link to={`/product/${product.id}`}>
                        <h3 className="font-medium hover:text-accent transition-colors">{product.name}</h3>
                      </Link>
                      <p className="text-sm text-muted-foreground line-clamp-1 mt-0.5">{product.description}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-semibold">${product.price.toFixed(2)}</p>
                      <Button size="sm" className="mt-2" asChild>
                        <Link to={`/product/${product.id}`}>View</Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
