import React from 'react'
import { Spacer } from '@heroui/react'

function Sideline() {
    return (
      <>
        <div
          className="inline-block bg-yellow-400 h-[500px] w-[10px] absolute left-[-10px] rounded-lg"
          style={{ backgroundColor: "gold" }}
        ></div>
        <div
          className="inline-block bg-yellow-400 h-[200px] w-[10px] absolute left-[-10px] top-[-40px] rounded-lg"
          style={{ backgroundColor: "gold " }}
        ></div>
        <div
          className="inline-block bg-yellow-400 h-[11px] w-[22px] absolute left-[-10px] top-[534px] rounded-lg rounded-br-none"
          style={{ backgroundColor: "gold " }}
        ></div>
      </>
    )
  }

export default Sideline
