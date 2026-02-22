import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {

  const { productId } = useParams();
  const { products } = useContext(ShopContext);

  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  /* ---------- FETCH PRODUCT ---------- */
  useEffect(() => {
    if (products && products.length > 0) {

      const foundProduct = products.find(
        item => item._id === productId
      );

      if (foundProduct) {
        setProductData(foundProduct);
        setImage(foundProduct.image[0]); // default first image

        // set default size if available
        if (foundProduct.sizes && foundProduct.sizes.length > 0) {
          setSize(foundProduct.sizes[0]);
        }
      }
    }
  }, [productId, products]);

  /* ---------- LOADING STATE ---------- */
  if (!productData) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  return (
    <div className="border-t pt-10 px-5 sm:px-20">

      <div className="flex flex-col sm:flex-row gap-12">

        {/* ================= LEFT SIDE (Images) ================= */}
        <div className="flex flex-1 gap-5">

          {/* Thumbnails */}
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-auto gap-4 sm:gap-3">
            {productData.image.map((item, index) => (
              <img
                key={index}
                onClick={() => setImage(item)}
                src={item}
                alt=""
                className={`w-20 sm:w-24 cursor-pointer border ${
                  image === item ? "border-black" : "border-gray-200"
                }`}
              />
            ))}
          </div>

          {/* Main Image */}
          <div className="flex-1">
            <img
              src={image}
              alt={productData.name}
              className="w-full h-auto"
            />
          </div>

        </div>

        {/* ================= RIGHT SIDE (Details) ================= */}
        <div className="flex-1">

          <h1 className="text-2xl font-semibold">
            {productData.name}
          </h1>

          <p className="mt-5 text-3xl font-medium">
            ${productData.price}
          </p>

          <p className="mt-5 text-gray-600">
            {productData.description || 
            "Premium quality product designed for comfort and style."}
          </p>

          {/* ================= SIZE SECTION ================= */}
          {productData.sizes && productData.sizes.length > 0 && (
            <div className="mt-6">
              <p className="font-medium mb-2">Select Size</p>

              <div className="flex gap-3">
                {productData.sizes.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setSize(item)}
                    className={`border px-4 py-2 text-sm transition ${
                      size === item
                        ? "bg-black text-white"
                        : "hover:bg-black hover:text-white"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ================= ADD TO CART BUTTON ================= */}
          <button className="mt-8 bg-black text-white px-8 py-3 text-sm active:bg-gray-700">
            ADD TO CART
          </button>

          {/* ================= EXTRA INFO SECTION ================= */}
          <hr className="mt-8 sm:w-4/5" />

          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange within 7 days.</p>
          </div>

        </div>
      </div>
      <div className='mt-20'>
        <div className='flex'>
          <b className='border px-5 py-3 text-sm'>Description</b>
          <p className='border px-5 py-3 text-sm'>Reviews(122)</p>
        </div>
        <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
          <p>E-Commerce Website</p>
<p>
  E-Commerce typically describes the buying and selling of goods 
  and services over the internet. It allows customers to browse 
  products, compare prices, and make secure purchases online from 
  anywhere at any time.
</p>
        </div>
      </div>
      <RelatedProducts 
  category={productData.category} 
  subCategory={productData.subCategory}
  currentId={productData._id}
/>
    </div>
  );
};

export default Product;