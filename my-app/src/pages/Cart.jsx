import React, { useContext, useMemo } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';
import { useNavigate } from 'react-router-dom';

const Title = ({ text1, text2 }) => (
  <div>
    <span>{text1} </span>
    <span>{text2}</span>
  </div>
);

const Cart = () => {

  const { products, currency, cartItems, updateQuantity } = useContext(ShopContext);
  const navigate = useNavigate();

  // ✅ UseMemo instead of useState + useEffect
  const cartData = useMemo(() => {
    const tempData = [];

    for (const productId in cartItems) {
      for (const size in cartItems[productId]) {
        if (cartItems[productId][size] > 0) {
          tempData.push({
            _id: productId,
            size,
            quantity: cartItems[productId][size]
          });
        }
      }
    }

    return tempData;

  }, [cartItems]);

  return (
    <div className='border-t pt-14'>

      <div className='text-2xl mb-3'>
        <Title text1={'YOUR'} text2={'CART'} />
      </div>

      <div>
        {cartData.length === 0 && (
          <p className="text-gray-500 py-10">Your cart is empty.</p>
        )}

        {cartData.map((item) => {

          const productData = products.find(
            (product) => product._id === item._id
          );

          if (!productData) return null;

          return (
            <div key={`${item._id}-${item.size}`}>
              <div className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_1fr_1fr_1fr] items-center gap-4'>

                {/* Product Info */}
                <div className='flex items-start gap-6'>
                  <img
                    className='w-16 sm:w-20'
                    src={productData.image[0]}
                    alt={productData.name}
                  />
                  <div>
                    <p className='text-xs sm:text-lg font-medium'>
                      {productData.name}
                    </p>
                    <p className='text-sm text-gray-500'>
                      Size: {item.size}
                    </p>
                  </div>
                </div>

                {/* Price */}
                <div className='text-center'>
                  <p>{currency}{productData.price}</p>
                </div>

                {/* Quantity */}
                <input
                  className='border max-w-16 text-center'
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    if (value >= 1) {
                      updateQuantity(item._id, item.size, value);
                    }
                  }}
                />

                {/* Delete */}
                <img
                  onClick={() => updateQuantity(item._id, item.size, 0)}
                  className='w-4 sm:w-5 cursor-pointer justify-self-center'
                  src={assets.bin_icon}
                  alt="delete"
                />

              </div>
            </div>
          )
        })}
      </div>

      {cartData.length > 0 && (
        <div className='flex justify-end my-20'>
          <div className='w-full sm:w-[450px]'>

            <CartTotal />

            <div className='w-full text-end'>
              <button
                onClick={() => navigate('/checkout')}
                className='bg-black text-white text-sm my-8 px-8 py-3 hover:bg-gray-800 transition'
              >
                PROCEED TO CHECKOUT
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  )
}

export default Cart;