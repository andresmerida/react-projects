import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getProductById} from "../data/products.js";

export default function ProductDetails() {
  const { id} = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const foundProduct = getProductById(id);

    if (!foundProduct) {
      navigate("/");
      return;
    }

    setProduct(foundProduct);
  }, [id]);

  if (!product) return (
    <div className={"page"}>
      <div className={"container"}>
        <h1>Loading...</h1>
      </div>
    </div>
  )

  return (
    <div className={"page"}>
      <div className={"container"}>
        <div className={"product-detail"}>
          <div className={"product-detail-image"}>
            <img src={product?.image} alt={product?.name}/>
          </div>
          <div className={"product-details-content"}>
            <h1 className={"product-details-name"}>{product?.name}</h1>
            <p className={"product-details-price"}>${product?.price}</p>
            <p className={"product-details-description"}>{product?.description}</p>
            <button className={"btn btn-primary"}>Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}