import MediaCard from '@/components/Card'
import Computers from '@/components/Computers'
import Hero from '@/components/Hero'
import Phone from '@/components/Phone'
import Tv from '@/components/Televizor'
import React from 'react'
export default function page() {
  return (
    <div>
      <Hero/>
      <Phone/>
      <Computers/>
      <Tv/>
    </div>
  )
}
