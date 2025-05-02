import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "@contexts/ContextProvider";

// icons
import { IoBagCheckOutline } from "react-icons/io5";
import { CiCircleRemove } from "react-icons/ci";
import { IoIosRemove } from "react-icons/io";
import { IoAddSharp } from "react-icons/io5";

// services
import { getCartsItem } from "@services/cartService";

// components
import Button from "@components/Buttons/Button";
import Checkbox from "@components/Checkboxes/Checkbox";

const Cart = () => {
  const [loading, setLoading] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [cartItems, setCartItems] = useState([]);

  const [selectedProducts, setSelectedProducts] = useState([]);
  const [totalSelected, setTotalSelected] = useState(0);

  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
      try {
        const carts = await getCartsItem();
        setCartItems(carts);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const handleCheckboxChange = (uniqueID, price, quantity) => {
    setSelectedProducts((prevSelected) => {
      const isSelected = prevSelected.some(
        (item) => item.uniqueID === uniqueID
      );
      let newSelectedProducts;

      if (isSelected) {
        newSelectedProducts = prevSelected.filter(
          (item) => item.uniqueID !== uniqueID
        );
        setTotalSelected(newSelectedProducts.length);
      } else {
        newSelectedProducts = [...prevSelected, { uniqueID, price, quantity }];
        setTotalSelected(newSelectedProducts.length);
      }
      const newTotalPrice = newSelectedProducts.reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0);
      setTotalAmount(newTotalPrice.toFixed(2));

      return newSelectedProducts;
    });
  };

  const handleRemoveItem = (uniqueID) => {
    setCartItems((prevCarts) => {
      const updatedCarts = prevCarts.map((cart) => {
        return {
          ...cart,
          products: cart.products.filter(
            (product) => product.uniqueID !== uniqueID
          ),
        };
      });
      return updatedCarts;
    });
    console.log(cartItems);
    setSelectedProducts((prevSelected) => {
      const newSelectedProducts = prevSelected.filter(
        (item) => item.uniqueID !== uniqueID
      );
      setTotalSelected(newSelectedProducts.length);
      const newTotalPrice = newSelectedProducts.reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0);
      setTotalAmount(newTotalPrice.toFixed(2));
      return newSelectedProducts;
    });
    setCartItems((prevCarts) => {
      return prevCarts.filter((cart) => cart.products.length > 0);
    });
  };

  return (
    <>
      <div className="p-3 md:p-10 ">
        <div className="flex flex-col gap-4">
          {!loading ? 
            cartItems.map((cart) =>
              cart.products.map((product) => (
                <Link to={`/?viewProduct=true&productId=${product.productId}`} key={product.productId}>
                  <div
                    className={`flex items-center gap-4 p-2 py-4 hover:bg-slate-50 rounded-md shadow 
                      ${
                        selectedProducts.some(
                          (item) => item.uniqueID === product.uniqueID
                        )
                          ? "bg-slate-100"
                          : ""
                      }`}
                  >
                    <div className="flex justify-between w-full items-center">
                      <div className="flex gap-4 items-center">
                        <div className="flex jutify-center items-center p-3">
                          <Checkbox
                            onChange={() =>
                              handleCheckboxChange(
                                product.uniqueID,
                                product.price,
                                product.quantity
                              )
                            }
                            checked={selectedProducts.some(
                              (item) => item.uniqueID === product.uniqueID
                            )}
                          />
                        </div>
                        <img
                          src={product.image}
                          alt={product.title}
                          className="size-16"
                        />
                        <div>
                          <div>
                            <p className="font-medium">{product.title}</p>
                            <p>Price: ${product.price}</p>
                            <small className="text-slate-500">Quantity</small>
                          </div>
                          <div className="flex gap-2 items-center">
                            <Button
                              color="common"
                              size="xs"
                              icon={<IoIosRemove />}
                              onClick={() => console.log("downs")}
                            />
                            <div className="w-14 border-[0.1px] border-slate-400 bg-white px-3 py-1 rounded-md text-center">
                              {product.quantity}
                            </div>
                            <Button
                              color="common"
                              size="xs"
                              icon={<IoAddSharp />}
                              onClick={() => console.log("ups")}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-3">
                      <Button
                        color="red"
                        size="small"
                        icon={<CiCircleRemove />}
                        onClick={() => handleRemoveItem(product.uniqueID)}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                </Link>
              ))
            ): (
              (Array(4).fill(0).map((_, index) => (
                <div key={index} className="flex items-center gap-4 p-2 py-4 hover:bg-slate-50 rounded-md shadow">
                  <div className="flex gap-4 w-full items-center opacity-40">
                    <div className="size-20 bg-slate-300 ml-16 rounded-md animate-pulse"></div>
                    <div className="flex flex-col gap-1 ">
                      <div className="flex justify-between w-56 h-6 rounded-md bg-slate-300 animate-pulse items-center"></div>
                      <div className="flex justify-between w-24 h-4 rounded-md bg-slate-300 animate-pulse items-center"></div>
                      <div className="flex justify-between w-14 h-4 rounded-md bg-slate-300 animate-pulse items-center"></div>
                      <div className="flex gap-2">
                        <div className="flex justify-between w-7 h-7 rounded-md bg-slate-300 animate-pulse items-center"></div>
                        <div className="flex justify-between w-16 h-7 rounded-md bg-slate-300 animate-pulse items-center"></div>
                        <div className="flex justify-between w-7 h-7 rounded-md bg-slate-300 animate-pulse items-center"></div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between w-24 h-9 mx-7 rounded-md bg-slate-300 animate-pulse items-center"></div>
                  </div>
                </div>
              ))
              )
            )
          }
          {}
        </div>
      </div>

      {/* below bar para sa total amount */}
      {totalAmount > 0 && (
        <div className="fixed bottom-0 right-13 bg-white p-4 shadow-2xl border-t-[4px] border-l-[0.2px] border-r-[0.2px] border-amber-950 rounded-tl-2xl rounded-tr-2xl flex flex-col justify-between items-start">
          <p>Selected items: {totalSelected}</p>
          <div className="flex gap-4 items-center">
            <h3 className="w-full text-end text-3xl text-amber-950 font-semibold">
              Total: ${totalAmount}
            </h3>
            <Button
              className="w-1/2"
              color="common"
              icon={<IoBagCheckOutline />}
              size="large"
            >
              Checkout
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
