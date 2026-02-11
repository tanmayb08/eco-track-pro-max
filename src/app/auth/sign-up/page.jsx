'use client'
import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'

export default function SignUpPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Sign up functionality is not implemented in this UI-only demo')
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      <Navbar />
      
      <main style={{ 
        maxWidth: '400px', 
        margin: '0 auto', 
        padding: '80px 16px 32px'
      }}>
        <div style={{ 
          backgroundColor: '#ffffff', 
          borderRadius: '12px', 
          padding: '32px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          border: '1px solid #e5e7eb'
        }}>
          <h1 style={{ 
            fontSize: '28px', 
            fontWeight: 'bold', 
            color: '#111827',
            marginBottom: '8px',
            textAlign: 'center'
          }}>
            Create Account
          </h1>
          
          <p style={{ 
            fontSize: '16px', 
            color: '#6b7280',
            marginBottom: '32px',
            textAlign: 'center'
          }}>
            Join the EcoTrack community
          </p>
          
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '24px' }}>
              <label htmlFor="name" style={{ 
                display: 'block', 
                fontSize: '14px', 
                fontWeight: '500', 
                color: '#374151',
                marginBottom: '8px'
              }}>
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                required
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '16px',
                  boxSizing: 'border-box'
                }}
              />
            </div>
            
            <div style={{ marginBottom: '24px' }}>
              <label htmlFor="email" style={{ 
                display: 'block', 
                fontSize: '14px', 
                fontWeight: '500', 
                color: '#374151',
                marginBottom: '8px'
              }}>
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '16px',
                  boxSizing: 'border-box'
                }}
              />
            </div>
            
            <div style={{ marginBottom: '32px' }}>
              <label htmlFor="password" style={{ 
                display: 'block', 
                fontSize: '14px', 
                fontWeight: '500', 
                color: '#374151',
                marginBottom: '8px'
              }}>
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                required
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '16px',
                  boxSizing: 'border-box'
                }}
              />
            </div>
            
            <button
              type="submit"
              style={{
                width: '100%',
                backgroundColor: '#10b981',
                color: '#ffffff',
                padding: '14px 24px',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s',
                marginBottom: '24px'
              }}
            >
              Create Account
            </button>
          </form>
          
          <div style={{ 
            textAlign: 'center',
            fontSize: '14px',
            color: '#6b7280'
          }}>
            Already have an account?{' '}
            <Link 
              href="/auth/sign-in"
              style={{
                color: '#10b981',
                textDecoration: 'none',
                fontWeight: '500'
              }}
            >
              Sign In
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
