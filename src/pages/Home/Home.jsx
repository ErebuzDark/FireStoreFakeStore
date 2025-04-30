import React, { useState, useEffect, useContext } from 'react';

// components
import ProductCard from '@components/Card/ProductCard';
import SkeletonProdCard from '@components/Card/SkeletonProdCard';
import Button from '@components/Buttons/Button'

// libraries
import {Modal, ModalBody, ModalFooter, ModalHeader, Select, TextInput} from 'flowbite-react';
import { IoBagCheckOutline } from "react-icons/io5";
import { BsCartPlus } from "react-icons/bs";
import { CiDiscount1 } from "react-icons/ci";

// base url ngaaa
import { API } from '@config/apiConfig';
import { fetchProducts } from '@services/fetchProducts';

// hooks
import useDebounce from '@hooks/useDebounce';

// data
import { CATEGORIES } from '@data/productCatergories';

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [isViewProDuctDetailsVisible, setIsViewProDuctDetailsVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // searching
  const [searchText, setSearchText] = useState('');
  const [searchKey, setSearchKey] = useState("title");
  const [searchProduct, setSearchProduct] = useState([])
  const debouncedSearch = useDebounce(searchText, 1000);
  
  useEffect(() => {
    if (!debouncedSearch) {
      setSearchProduct([]);
      return;
    }
    setLoading(true); 
    const timeout = setTimeout(() => {
      const results = products.filter((product) =>
        product[searchKey].toLowerCase().includes(debouncedSearch.toLowerCase())
      );
      setSearchProduct(results);
      setLoading(false); 
    }, 1000);
  
      clearTimeout(timeout);
  }, [debouncedSearch, products, searchKey]);
  
  // view Details
  const handleViewDetails = (prodID) => {
    setSelectedProduct(products.find(product => product.id === prodID));
    setIsViewProDuctDetailsVisible(!isViewProDuctDetailsVisible);
  }

  // fetch products
  useEffect(() => {
    setLoading(true);
    const getProducts = async () => {
      try {
        const products = await fetchProducts();
        setProducts(products);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
      
    };
    getProducts();
  }, [searchText]);

  const dataToRender = searchProduct.length > 0 ? searchProduct : products;
    
  return (
    <>
      <div className='flex gap-2 w-full p-3 md:p-10'>
        <TextInput onChange={(e) => {setSearchText(e.target.value), setSearchKey('title')}} className='w-full' id="input-gray" placeholder="Search Item" required color="gray" />
        <Select onChange={(e) => {setSearchText(e.target.value), setSearchKey('category')}} className='w-96' id="countries" required>
          {CATEGORIES.map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))}
        </Select>
      </div>
      
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-3 p-3 md:p-10 place-items-center'>
      {loading ? (
        Array(6).fill(0).map((_, index) => (<SkeletonProdCard key={index} />))
      ) : 
        dataToRender.map((product, index) => (
          <ProductCard
            key={index}
            product={product}
            onClick={() => handleViewDetails(product.id)}
          />
        ))
      }

      </div>
      {/* // -------------------------- MODAL -------------------------- */}
      <Modal size='3xl' show={isViewProDuctDetailsVisible} dismissible onClose={() => handleViewDetails(null)}>
        <ModalHeader>Product Details</ModalHeader>
        <ModalBody>
          <div className="space-y-6">
            <img src={selectedProduct?.image} alt="" className='w-1/3 mx-auto my-8' />
            <div>
              <h2 className='text-2xl font-medium'>{selectedProduct?.title}</h2>
              <small className='text-base text-slate-500'>{selectedProduct?.category}</small>
              <div className='flex items-center gap-3'>
                <p className='text-4xl my-5 font-medium'>${selectedProduct?.price}</p>
                <Button color='common' icon={<CiDiscount1 />}>Get Discount</Button>
              </div>
              <p className='my-3 text-xs'><span className={`${selectedProduct?.rating?.rate < 3 && 'text-red-500' || selectedProduct?.rating?.rate <= 3.9 && 'text-yellow-400' || selectedProduct?.rating?.rate >= 4 && 'text-green-400'}`}>{selectedProduct?.rating?.rate}</span> ratings | <span className='text-blue-700'>{selectedProduct?.rating?.count}</span> reviews</p>
            </div>
            <hr />
            <div>
              <h4 className='text-slate-500'>Description</h4>
              <p className='text-sm'>{selectedProduct?.description}</p>
            </div>
          </div>
        </ModalBody>
        <ModalFooter className='flex flex-row justify-end'>
          <Button color='yellow' icon={<BsCartPlus />} >Add to Cart</Button>
          <Button color="amberDark" icon={<IoBagCheckOutline />}>
            But Now
          </Button>
        </ModalFooter>
      </Modal>
    </>
    
  );
}

export default Home;
