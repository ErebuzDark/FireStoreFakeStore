import React from "react";

const ProductCard = ({ index, product, onClick }) => {
  return ( 
    <div key={index} className="flex justify-between p-6 shadow w-full rounded-md bg-white hover:bg-slate-50 duration-300 group" onClick={onClick}>
      <div className="flex gap-2">
        <div className="flex items justify-center size-[80px] p-3 bg-white border border-slate-200 rounded-md group-hover:shadow-md duration-300">
          <img
            src={product.image}
            alt="product-iamge"
            className="size-[50px] border-[0.5px bg-white group-hover:scale-105 duration-300"
          />
        </div>
        <div>
          <p className="text-base md:text-lg font-semibold text-nowrap">
          {product.title.length > 25
            ? product.title.slice(0, 25) + "..."
            : product.title}
          </p>
          <p className="text-xs text-slate-400">{product.rating.rate} ratings | {product.rating.count} stocks</p>
        </div>
        
      </div>
      <div className="flex w-fit justify-end items-center">
        <p className="text-2xl text-end font-semibold">${product.price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
