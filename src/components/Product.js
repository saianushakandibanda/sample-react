import ProductData from "./ProductData";
import FormComponent from "./FormComponent";
import { lazy, useState, Suspense } from "react";
import FormDataProvider from "../context/FormDataContext";
import { useNavigate } from 'react-router-dom';
import "../styles/productGrid.css"
const Product = () => {
  const [load, setLoad] = useState(false);
  const LazyComp = lazy(() => import("./Lazy"));
  const navigate = useNavigate();
  const handleLoad = () => {
    load === true ? setLoad(false) : setLoad(true);
  };
  
  const redirect = ()=>{
    navigate('/about');
  }

  return (
    <>
      <FormDataProvider>
        <FormComponent />
        <ProductData />
      </FormDataProvider>
      <button onClick={handleLoad}>Load Component</button>
      <button onClick={redirect}>Redirect</button>
      {load ? (
         <Suspense fallback={<div>Loading...</div>}>
         <div>
           <LazyComp />
         </div>
       </Suspense>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default Product;
