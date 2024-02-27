import React from 'react'
import { Link } from 'react-router-dom'

const ButtonWarnning = ({label, linkText , to}) => {
  return (
      <div className="py-2 text-sm flex justify-center">
          <div>
              {label}
          </div>
          <Link className="pointer underline pl-1 cursor-pointer" to={to}>
              {linkText}
          </Link>
    </div>
  )
}

export default ButtonWarnning