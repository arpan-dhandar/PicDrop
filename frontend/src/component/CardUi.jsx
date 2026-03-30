import React from 'react'

const CardUi = ({ image, caption }) => {
  return (
    <div className="group flex flex-col space-y-3 cursor-pointer">
      {/* Premium Frame */}
      <div className="relative aspect-square overflow-hidden rounded-[2.5rem] bg-zinc-900 border border-zinc-800/50 transition-all duration-500 group-hover:border-zinc-500 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]">
        <img 
          src={image} 
          alt={caption} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Subtle Overlay on Hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
      </div>

      {/* Caption Styling */}
      <div className="px-2">
        <p className="text-zinc-400 text-sm font-medium tracking-tight truncate group-hover:text-white transition-colors duration-300">
          {caption}
        </p>
      </div>
    </div>
  )
}

export default CardUi