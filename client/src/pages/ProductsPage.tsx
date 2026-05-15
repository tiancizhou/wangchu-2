import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getCategories, getProducts, getSiteProfile, type Product, type ProductCategory, type SiteProfile } from '../api/publicApi';

export function ProductsPage() {
  const [params, setParams] = useSearchParams();
  const active = params.get('category') || '';
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [profile, setProfile] = useState<SiteProfile | null>(null);
  const [total, setTotal] = useState(0);
  const page = Math.max(Number(params.get('page') || 1), 1);

  useEffect(() => {
    getCategories().then(setCategories).catch(() => {});
    getSiteProfile().then(setProfile).catch(() => {});
  }, []);

  useEffect(() => {
    const query = new URLSearchParams({ page: String(page), pageSize: '5' });
    if (active) query.set('category', active);
    getProducts(`?${query.toString()}`).then((data) => { setProducts(data.items); setTotal(data.total); });
  }, [active, page]);

  function selectCategory(category: string) {
    setParams(category ? { category, page: '1' } : { page: '1' });
  }

  return (
    <main className="gray-page product-center-page product-list-page">
      <div className="breadcrumb container">当前位置：<Link to="/">首页</Link> › 产品分类</div>
      <div className="product-center-shell container">
        <CategorySide title="产品分类" categories={categories} active={active} hotline={profile?.hotline || profile?.phone} products={products.slice(0, 3)} onSelect={selectCategory} />
        <section className="list-section product-panel">
          <div className="product-panel-title"><h1>产品详情</h1></div>
          <div className="product-list-stack">
            {products.map((product) => <ProductListItem product={product} key={product.id} />)}
            {products.length === 0 && <div className="empty-state">暂无产品，请在后台添加。</div>}
          </div>
          <Pager total={total} page={page} pageSize={5} active={active} />
        </section>
      </div>
    </main>
  );
}

export function CategorySide({ title, categories, active, hotline, products, onSelect }: { title: string; categories: ProductCategory[]; active: string; hotline?: string; products?: Product[]; onSelect?: (category: string) => void }) {
  return (
    <aside className="category-side">
      <h2>{title}</h2>
      <div className="category-list">
        {categories.map((category) => <button type="button" className={category.slug === active || category.name === active ? 'active' : ''} onClick={() => onSelect?.(category.slug)} key={category.id}>{category.name}<span>›</span></button>)}
      </div>
      {products && products.length > 0 && (
        <div className="side-product-list">
          {products.map((product) => <ProductSideItem product={product} key={product.id} />)}
        </div>
      )}
      <div className="hotline"><small>资讯热线</small><b>{hotline || '0519-68288220'}</b></div>
    </aside>
  );
}

function ProductListItem({ product }: { product: Product }) {
  return (
    <Link className="product-row-card" to={`/products/${product.slug}`}>
      <figure>{(product.listCoverImageUrl || product.coverImageUrl) ? <img src={product.listCoverImageUrl || product.coverImageUrl} alt={product.name} /> : <div className="product-fallback">K</div>}</figure>
      <div>
        <h2>{product.name}</h2>
        <p>{product.topSubtitle || product.detailDescription || product.performanceText}</p>
      </div>
    </Link>
  );
}

function ProductSideItem({ product }: { product: Product }) {
  return (
    <Link className="side-product-card" to={`/products/${product.slug}`}>
      <figure>{(product.listCoverImageUrl || product.coverImageUrl) ? <img src={product.listCoverImageUrl || product.coverImageUrl} alt={product.name} /> : <div className="product-fallback">K</div>}</figure>
      <div>
        <h3>{product.name}</h3>
        <p>{product.topSubtitle || product.detailDescription || product.performanceText}</p>
      </div>
    </Link>
  );
}

function Pager({ total, page, pageSize, active }: { total: number; page: number; pageSize: number; active: string }) {
  const pages = Math.max(Math.ceil(total / pageSize), 1);
  if (pages <= 1) return null;

  const start = Math.max(1, Math.min(page - 2, pages - 4));
  const pageNumbers = Array.from({ length: Math.min(5, pages) }, (_, index) => start + index);
  const href = (pageNumber: number) => `/products?${new URLSearchParams({ ...(active ? { category: active } : {}), page: String(pageNumber) }).toString()}`;

  return (
    <nav className="pager product-pager" aria-label="产品列表分页">
      <Link className={page === 1 ? 'disabled' : ''} to={href(Math.max(page - 1, 1))}>上一页</Link>
      {pageNumbers.map((pageNumber) => <Link className={page === pageNumber ? 'active' : ''} to={href(pageNumber)} key={pageNumber}>{pageNumber}</Link>)}
      <Link className={page === pages ? 'disabled' : ''} to={href(Math.min(page + 1, pages))}>下一页</Link>
    </nav>
  );
}
