import React from 'react'
import {OrbitProgress} from 'react-loading-indicators'


function Loading() {
  return (
     <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
      <div className="text-center">
        <OrbitProgress 
          color="#32cd32" 
          size="large" 
          text="Loading" 
          textColor="#333" 
        />
      </div>
    </div>
  )
}

export default Loading
