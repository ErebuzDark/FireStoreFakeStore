import React from "react";

const ProductCard = ({ index, product, onClick }) => {
  return (
    <div key={index} className="p-6 shadow w-full rounded-md bg-white hover:bg-slate-50 duration-300" onClick={onClick}>
      <div className="flex gap-2">
        <img
          src={product.image}
          alt="product-iamge"
          className="size-[80px] p-3 border-[0.5px] border-slate-100"
        />
        <div>
          <p className="text-base md:text-lg font-semibold">
          {product.title.length > 25
            ? product.title.slice(0, 25) + "..."
            : product.title}
          </p>
          <p className="text-xs text-slate-400">{product.rating.rate} ratings | {product.rating.count} stocks</p>
        </div>
       
      </div>
     
      <p className="text-2xl text-end font-semibold">${product.price}</p>
    </div>
  );
};

export default ProductCard;
