import RegisterForm from '@/components/auth/register-form'
import React from 'react'

const Register = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] w-full flex items-center justify-center overflow-hidden border-b border-accent">
      <RegisterForm />
    </div>
  )
}

export default Register
