'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useLoginMutation } from '@/redux/apiSlice'

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, { isLoading, error }] = useLoginMutation();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await login({ email, password }).unwrap();
      console.log("response", response);
      
      localStorage.setItem('token', response.token)
      localStorage.setItem('userId', response.user.id) 

      router.refresh() 
      router.push('/') 
    } catch (err) {
      console.error("Login error:", err)
    }
  }

  return (
    <div className='fixed inset-0 flex justify-center items-center z-50 shadow-lg bg-white backdrop-blur-sm'>
      <form onSubmit={handleSubmit} className='flex flex-col border border-orange-500 px-10 py-10 rounded-md bg-white'>
        <h2 className='text-center text-2xl text-orange-500'>Login</h2>
        <h3 className='text-orange-500'>Email</h3>
        <input type='email' className='border py-2 px-5' placeholder='Emailni kiriting' value={email} onChange={(e) => setEmail(e.target.value)} />
        <h3 className='mt-6 text-orange-500'>Password</h3>
        <input type='password' className='border py-2 px-5' placeholder='Password kiriting' value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type='submit' className='border py-2 px-3 mt-5 bg-orange-500 text-white' disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Send'}
        </button>
        {error && <p className="text-red-500 mt-2">{error.data?.message || 'Login failed'}</p>}
      </form>
    </div>
  )
}
