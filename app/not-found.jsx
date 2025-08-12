import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button' // Adjust the path if needed

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center px-4">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-6">
        Page Not Found
      </h2>
      <p className="text-gray-600 mb-8">
        Sorry, the page you are looking for does not exist or has been moved.
      </p>
      <Link href="/" passHref>
        <Button>Go back home</Button>
      </Link>
    </div>
  )
}

export default NotFound
