import React from 'react'
import { ErrorImage } from '../utils/images'

const ErrorPage = () => {
  return (
    <div className='main-error'>
      <div className='error-image'>
        <img src={ErrorImage} alt="404" />
      </div>
    </div>
  )
}

export default ErrorPage