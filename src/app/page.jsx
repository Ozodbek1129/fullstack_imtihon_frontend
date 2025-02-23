import MediaCard from '@/components/Card'
import Computers from '@/components/Computers'
import Hero from '@/components/Hero'
import Phone from '@/components/Phone'
import SliderComponent from '@/components/Slider'
import Tv from '@/components/Televizor'
import React from 'react'
export default function page() {
  return (
    <div>
      <Hero/>
      <SliderComponent/>
      <Phone/>
      <Computers/>
      <Tv/>
    </div>
  )
}
