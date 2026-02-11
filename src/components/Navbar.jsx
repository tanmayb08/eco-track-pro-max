'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => {
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  return (
    <nav style={{ 
      backgroundColor: '#ffffff',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      padding: '16px 0'
    }}>
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: '0 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Link href="/" style={{ 
            fontSize: '24px', 
            fontWeight: 'bold', 
            color: '#10b981', 
            textDecoration: 'none'
          }}>
            EcoTrack
          </Link>
        </div>
        
        {/* Desktop Navigation - Hidden on mobile */}
        <div style={{ 
          display: isMobile ? 'none' : 'flex', 
          alignItems: 'center', 
          gap: '32px'
        }}>
          <Link href="/" style={{ 
            color: '#374151', 
            textDecoration: 'none',
            fontSize: '16px',
            padding: '8px 12px',
            borderRadius: '6px',
            transition: 'all 0.2s'
          }}>
            Home
          </Link>
          <Link href="/search" style={{ 
            color: '#374151', 
            textDecoration: 'none',
            fontSize: '16px',
            padding: '8px 12px',
            borderRadius: '6px',
            transition: 'all 0.2s'
          }}>
            Search
          </Link>
          <Link href="/get-started" style={{ 
            color: '#374151', 
            textDecoration: 'none',
            fontSize: '16px',
            padding: '8px 12px',
            borderRadius: '6px',
            transition: 'all 0.2s'
          }}>
            Get Started
          </Link>
          <Link href="/add-tool" style={{ 
            color: '#374151', 
            textDecoration: 'none',
            fontSize: '16px',
            padding: '8px 12px',
            borderRadius: '6px',
            transition: 'all 0.2s'
          }}>
            List Tool
          </Link>
          <Link href="/auth/sign-in" style={{ 
            color: '#374151', 
            textDecoration: 'none',
            fontSize: '16px',
            padding: '8px 12px',
            borderRadius: '6px',
            transition: 'all 0.2s'
          }}>
            Sign In
          </Link>
          <Link href="/auth/sign-up" style={{ 
            color: '#374151', 
            textDecoration: 'none',
            fontSize: '16px',
            padding: '8px 12px',
            borderRadius: '6px',
            transition: 'all 0.2s'
          }}>
            Sign Up
          </Link>
        </div>

        {/* Mobile Hamburger - Only visible on mobile */}
        <div style={{ 
          display: isMobile ? 'flex' : 'none'
        }}>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{ 
              background: 'none', 
              border: 'none', 
              color: '#374151', 
              cursor: 'pointer',
              padding: '8px',
              borderRadius: '6px'
            }}
          >
            {/* Hamburger Icon */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div style={{ 
                width: '24px', 
                height: '2px', 
                backgroundColor: '#374151',
                borderRadius: '2px'
              }}></div>
              <div style={{ 
                width: '24px', 
                height: '2px', 
                backgroundColor: '#374151',
                borderRadius: '2px'
              }}></div>
              <div style={{ 
                width: '24px', 
                height: '2px', 
                backgroundColor: '#374151',
                borderRadius: '2px'
              }}></div>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu - Only visible on mobile when toggled */}
      {isMobile && isMenuOpen && (
        <div style={{ 
          display: 'block', 
          backgroundColor: '#ffffff',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          borderRadius: '0 0 8px 8px',
          margin: '0 24px',
          position: 'absolute',
          right: '24px',
          top: '80px',
          minWidth: '200px'
        }}>
          <div style={{ padding: '8px 0' }}>
            <Link href="/" style={{ 
              display: 'block', 
              padding: '12px 16px', 
              color: '#374151', 
              textDecoration: 'none', 
              fontSize: '16px' 
            }}>
              Home
            </Link>
            <Link href="/search" style={{ 
              display: 'block', 
              padding: '12px 16px', 
              color: '#374151', 
              textDecoration: 'none', 
              fontSize: '16px' 
            }}>
              Search
            </Link>
            <Link href="/get-started" style={{ 
              display: 'block', 
              padding: '12px 16px', 
              color: '#374151', 
              textDecoration: 'none', 
              fontSize: '16px' 
            }}>
              Get Started
            </Link>
            <Link href="/add-tool" style={{ 
              display: 'block', 
              padding: '12px 16px', 
              color: '#374151', 
              textDecoration: 'none', 
              fontSize: '16px' 
            }}>
              List Tool
            </Link>
            <Link href="/auth/sign-in" style={{ 
              display: 'block', 
              padding: '12px 16px', 
              color: '#374151', 
              textDecoration: 'none', 
              fontSize: '16px' 
            }}>
              Sign In
            </Link>
            <Link href="/auth/sign-up" style={{ 
              display: 'block', 
              padding: '12px 16px', 
              color: '#374151', 
              textDecoration: 'none', 
              fontSize: '16px' 
            }}>
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
