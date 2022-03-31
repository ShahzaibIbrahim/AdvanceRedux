import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const DUMMY_PRODUCTS = [
  { id: "p1", price: 6, title: "Book", description: 'Its a book' },
  { id: "p3", price: 7, title: "Car", description: 'Its a Car' },
  { id: "p4", price: 8, title: "Banana", description: 'Its a Banana' },
];

const Products = (props) => {
  
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_PRODUCTS.map((product) => {
          return (
          <ProductItem
          key= {product.id}
          id= {product.id}
          title={product.title}
          price={product.price}
          description={product.description}
        />)
      }
      )}
        
      </ul>
    </section>
  );
};

export default Products;
