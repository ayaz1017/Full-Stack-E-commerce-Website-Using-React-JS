import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { toast } from 'react-toastify'

const PlaceOrder = () => {

  const [paymentMethod, setPaymentMethod] = useState('stripe')
  const { setCartItems } = useContext(ShopContext)
  const navigate = useNavigate()

  const handlePlaceOrder = () => {

    // Simple validation (optional)
    if (!paymentMethod) {
      toast.error("Select a payment method")
      return
    }

    // Simulate order success
    toast.success("Order Placed Successfully!")

    // Clear cart
    setCartItems({})

    // Redirect to home after short delay
    setTimeout(() => {
      navigate('/')
    }, 1500)
  }

  return (
    <div className='flex flex-col lg:flex-row justify-between gap-16 pt-10 border-t min-h-[80vh] px-4 lg:px-12'>

      {/* ================= LEFT SIDE ================= */}
      <div className='flex flex-col gap-5 w-full lg:w-1/2'>

        <div className='text-2xl mb-6'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>

        <div className='flex gap-4'>
          <input className='border border-gray-300 rounded py-2 px-3 w-full focus:outline-none focus:ring-1 focus:ring-black' placeholder='First name' />
          <input className='border border-gray-300 rounded py-2 px-3 w-full focus:outline-none focus:ring-1 focus:ring-black' placeholder='Last name' />
        </div>

        <input className='border border-gray-300 rounded py-2 px-3 w-full focus:outline-none focus:ring-1 focus:ring-black' placeholder='Email address' />
        <input className='border border-gray-300 rounded py-2 px-3 w-full focus:outline-none focus:ring-1 focus:ring-black' placeholder='Street' />

        <div className='flex gap-4'>
          <input className='border border-gray-300 rounded py-2 px-3 w-full focus:outline-none focus:ring-1 focus:ring-black' placeholder='City' />
          <input className='border border-gray-300 rounded py-2 px-3 w-full focus:outline-none focus:ring-1 focus:ring-black' placeholder='State' />
        </div>

        <div className='flex gap-4'>
          <input className='border border-gray-300 rounded py-2 px-3 w-full focus:outline-none focus:ring-1 focus:ring-black' placeholder='Zipcode' />
          <input className='border border-gray-300 rounded py-2 px-3 w-full focus:outline-none focus:ring-1 focus:ring-black' placeholder='Country' />
        </div>

        <input className='border border-gray-300 rounded py-2 px-3 w-full focus:outline-none focus:ring-1 focus:ring-black' placeholder='Phone' />

      </div>

      {/* ================= RIGHT SIDE ================= */}
      <div className='w-full lg:w-[420px]'>

        {/* -------- CART TOTALS -------- */}
        <div className='mb-10'>
          <CartTotal />
        </div>

        {/* -------- PAYMENT METHOD -------- */}
        <div className='mb-8'>
          <div className='text-xl mb-4'>
            <Title text1={'PAYMENT'} text2={'METHOD'} />
          </div>

          <div className='flex flex-col gap-3'>

            {/* Stripe */}
            <button
              onClick={() => setPaymentMethod('stripe')}
              className={`border px-6 py-3 flex items-center justify-between transition
              ${paymentMethod === 'stripe' ? 'border-black' : 'border-gray-300'}`}
            >
              <div className='flex items-center gap-3'>
                <div className={`w-4 h-4 rounded-full border flex items-center justify-center
                  ${paymentMethod === 'stripe' ? 'border-green-500' : 'border-gray-400'}`}>
                  {paymentMethod === 'stripe' && (
                    <div className='w-2.5 h-2.5 bg-green-500 rounded-full'></div>
                  )}
                </div>
                <img src={assets.stripe_logo} alt="stripe" className='h-5' />
              </div>
            </button>

            {/* Razorpay */}
            <button
              onClick={() => setPaymentMethod('razorpay')}
              className={`border px-6 py-3 flex items-center justify-between transition
              ${paymentMethod === 'razorpay' ? 'border-black' : 'border-gray-300'}`}
            >
              <div className='flex items-center gap-3'>
                <div className={`w-4 h-4 rounded-full border flex items-center justify-center
                  ${paymentMethod === 'razorpay' ? 'border-green-500' : 'border-gray-400'}`}>
                  {paymentMethod === 'razorpay' && (
                    <div className='w-2.5 h-2.5 bg-green-500 rounded-full'></div>
                  )}
                </div>
                <img src={assets.razorpay_logo} alt="razorpay" className='h-5' />
              </div>
            </button>

            {/* Cash On Delivery */}
            <button
              onClick={() => setPaymentMethod('cod')}
              className={`border px-6 py-3 flex items-center justify-between transition
              ${paymentMethod === 'cod' ? 'border-black' : 'border-gray-300'}`}
            >
              <div className='flex items-center gap-3'>
                <div className={`w-4 h-4 rounded-full border flex items-center justify-center
                  ${paymentMethod === 'cod' ? 'border-green-500' : 'border-gray-400'}`}>
                  {paymentMethod === 'cod' && (
                    <div className='w-2.5 h-2.5 bg-green-500 rounded-full'></div>
                  )}
                </div>
                <span className='font-medium'>Cash on Delivery</span>
              </div>
            </button>

          </div>
        </div>


        <button
          onClick={handlePlaceOrder}
          className='bg-black text-white w-full py-3 hover:bg-gray-800 transition'
        >
          PLACE ORDER
        </button>

      </div>

    </div>
  )
}

export default PlaceOrder