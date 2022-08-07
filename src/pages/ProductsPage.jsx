import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/navbar/Navbar";
import Products from "../components/product/Products";
import Content from "../components/ui/Content";

const ProductsPage = () => {
  return (
    <>
      <Navbar />
      <Content>
        <Products />
      </Content>
      <Footer />
    </>
  );
};

export default ProductsPage;
