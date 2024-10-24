import Image from 'next/image'
import React from 'react'
import image from "../../public/Images/30bc3a50-a6d2-426d-946e-4975ad0e1f20.png"
export default function SkeletonLoading() {
  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-4">
      <p className="text-gray-400 mb-8">Fetching data, please wait</p>
      
      <Image src={image} alt="dlka" />
    </div>
  )
}