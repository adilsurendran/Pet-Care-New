import ShopSidebar from "./ShopSidebar";

export default function ShopLayout({ children }) {
  return (
    <div className="shop-layout">
      <ShopSidebar />
      <main className="shop-main">
        {children}
      </main>
    </div>
  );
}
