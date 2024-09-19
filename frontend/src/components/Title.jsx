import React from 'react'

const Title = ({title,title2}) => {
  return (
  
      <div className="inline-flex gap-2 items-center mb-3">
        <p className='text-[#009e3e]'>{title} <span className='text-[#e3642a] font-medium'>{title2}</span></p>
        <p className='w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700'></p>
      </div>

   
  )
}

export default Title
