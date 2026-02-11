import Link from 'next/link'
import Navbar from '@/components/Navbar'

export default function GetStartedPage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      <Navbar />
      
      <main style={{ 
        maxWidth: '800px', 
        margin: '0 auto', 
        padding: '80px 16px 32px',
        textAlign: 'center'
      }}>
        <h1 style={{ 
          fontSize: '36px', 
          fontWeight: 'bold', 
          color: '#111827',
          marginBottom: '24px'
        }}>
          Welcome to EcoTrack
        </h1>
        
        <p style={{ 
          fontSize: '20px', 
          color: '#6b7280',
          marginBottom: '48px',
          lineHeight: '1.6'
        }}>
          Join your community in sharing tools and equipment. Start saving money and reducing waste today.
        </p>
        
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column',
          gap: '24px',
          alignItems: 'center'
        }}>
          <Link 
            href="/auth/sign-in"
            style={{
              backgroundColor: '#10b981',
              color: '#ffffff',
              padding: '20px 48px',
              borderRadius: '8px',
              fontSize: '20px',
              fontWeight: '600',
              textDecoration: 'none',
              transition: 'all 0.2s',
              display: 'inline-block',
              width: '100%',
              maxWidth: '300px'
            }}
          >
            Sign In
          </Link>
          
          <Link 
            href="/auth/sign-up"
            style={{
              backgroundColor: '#ffffff',
              color: '#10b981',
              padding: '20px 48px',
              borderRadius: '8px',
              fontSize: '20px',
              fontWeight: '600',
              textDecoration: 'none',
              border: '2px solid #10b981',
              transition: 'all 0.2s',
              display: 'inline-block',
              width: '100%',
              maxWidth: '300px'
            }}
          >
            Create Account
          </Link>
        </div>
        
        <div style={{ 
          marginTop: '64px',
          padding: '32px',
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          border: '1px solid #e5e7eb'
        }}>
          <h2 style={{ 
            fontSize: '24px', 
            fontWeight: '600', 
            color: '#111827',
            marginBottom: '16px'
          }}>
            Why Choose EcoTrack?
          </h2>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '24px',
            textAlign: 'left'
          }}>
            <div>
              <div style={{ 
                fontSize: '24px', 
                marginBottom: '8px'
              }}>
                💰
              </div>
              <h3 style={{ 
                fontSize: '18px', 
                fontWeight: '600', 
                color: '#111827',
                marginBottom: '8px'
              }}>
                Save Money
              </h3>
              <p style={{ 
                fontSize: '14px', 
                color: '#6b7280',
                lineHeight: '1.5'
              }}>
                Rent tools for a fraction of the purchase price
              </p>
            </div>
            
            <div>
              <div style={{ 
                fontSize: '24px', 
                marginBottom: '8px'
              }}>
                🌱
              </div>
              <h3 style={{ 
                fontSize: '18px', 
                fontWeight: '600', 
                color: '#111827',
                marginBottom: '8px'
              }}>
                Eco-Friendly
              </h3>
              <p style={{ 
                fontSize: '14px', 
                color: '#6b7280',
                lineHeight: '1.5'
              }}>
                Reduce waste by sharing existing resources
              </p>
            </div>
            
            <div>
              <div style={{ 
                fontSize: '24px', 
                marginBottom: '8px'
              }}>
                🤝
              </div>
              <h3 style={{ 
                fontSize: '18px', 
                fontWeight: '600', 
                color: '#111827',
                marginBottom: '8px'
              }}>
                Build Community
              </h3>
              <p style={{ 
                fontSize: '14px', 
                color: '#6b7280',
                lineHeight: '1.5'
              }}>
                Connect with neighbors in your area
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
