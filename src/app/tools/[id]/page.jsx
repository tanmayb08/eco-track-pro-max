'use client'
import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import BookingStatus from '@/components/BookingStatus'

const mockTool = {
  id: 1,
  name: 'Power Drill',
  category: 'Power Tools',
  description: 'Professional-grade cordless drill with 20V battery and fast charger. Perfect for drilling holes in wood, metal, and plastic. Features LED light for dark spaces and variable speed control.',
  pricePerDay: 15,
  owner: {
    name: 'John Smith',
    email: 'john.smith@email.com',
    phone: '+1 (555) 123-4567',
    rating: 4.8,
    totalRentals: 42
  },
  images: [
    'https://picsum.photos/seed/drill1/600/400.jpg',
    'https://picsum.photos/seed/drill2/600/400.jpg',
    'https://picsum.photos/seed/drill3/600/400.jpg'
  ],
  specifications: {
    brand: 'DeWalt',
    model: 'DCD771C2',
    power: '20V',
    battery: '2.0 Ah',
    chuckSize: '1/2 inch',
    weight: '3.6 lbs'
  },
  availability: {
    available: true,
    nextAvailable: '2024-01-15'
  }
}

export default function ToolDetailsPage({ params }) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [bookingStatus, setBookingStatus] = useState('Pending')

  const handleBooking = () => {
    alert('Booking functionality is not implemented in this UI-only demo')
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      <Navbar />
      
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 16px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
          <div>
            <div style={{ backgroundColor: 'white', borderRadius: '12px', overflow: 'hidden', border: '1px solid #e5e7eb' }}>
              <img 
                src={mockTool.images[selectedImage]}
                alt={mockTool.name}
                style={{ width: '100%', height: '400px', objectFit: 'cover', display: 'block' }}
              />
              
              <div style={{ display: 'flex', gap: '8px', padding: '16px', overflowX: 'auto' }}>
                {mockTool.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    style={{
                      border: 'none',
                      padding: '0',
                      cursor: 'pointer',
                      opacity: selectedImage === index ? 1 : 0.6,
                      transition: 'opacity 0.2s'
                    }}
                  >
                    <img 
                      src={image}
                      alt={`${mockTool.name} ${index + 1}`}
                      style={{ 
                        width: '80px', 
                        height: '80px', 
                        objectFit: 'cover',
                        borderRadius: '4px',
                        border: selectedImage === index ? '2px solid #10b981' : '2px solid transparent'
                      }}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div>
            <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', border: '1px solid #e5e7eb', marginBottom: '24px' }}>
              <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#111827', marginBottom: '8px' }}>
                {mockTool.name}
              </h1>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                <span style={{ 
                  backgroundColor: '#dcfce7', 
                  color: '#166534', 
                  fontSize: '14px', 
                  fontWeight: '500', 
                  padding: '4px 8px', 
                  borderRadius: '4px' 
                }}>
                  {mockTool.category}
                </span>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" style={{ color: '#f59e0b' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 01-.69.928l-2.855-.704a.32.32 0 00-.322.18l2.01 5.66a.32.32 0 00.36.242l2.855-.704a1 1 0 01.89.69l-1.083 3.342" />
                  </svg>
                  <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#111827' }}>
                    {mockTool.owner.rating}
                  </span>
                  <span style={{ fontSize: '14px', color: '#6b7280' }}>
                    ({mockTool.owner.totalRentals} rentals)
                  </span>
                </div>
              </div>
              
              <p style={{ fontSize: '16px', color: '#6b7280', lineHeight: '1.6', marginBottom: '24px' }}>
                {mockTool.description}
              </p>
              
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#10b981', marginBottom: '24px' }}>
                ${mockTool.pricePerDay}
                <span style={{ fontSize: '16px', color: '#6b7280', fontWeight: 'normal' }}>
                  /day
                </span>
              </div>
              
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', marginBottom: '12px' }}>
                  Specifications
                </h3>
                <div style={{ display: 'grid', gap: '8px' }}>
                  {Object.entries(mockTool.specifications).map(([key, value]) => (
                    <div key={key} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                      <span style={{ color: '#6b7280', textTransform: 'capitalize' }}>
                        {key.replace(/([A-Z])/g, ' $1').trim()}:
                      </span>
                      <span style={{ fontWeight: '500', color: '#111827' }}>
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', marginBottom: '12px' }}>
                  Owner Information
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <div style={{ 
                    width: '48px', 
                    height: '48px', 
                    backgroundColor: '#e5e7eb', 
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="#6b7280">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <div style={{ fontSize: '16px', fontWeight: '500', color: '#111827' }}>
                      {mockTool.owner.name}
                    </div>
                    <div style={{ fontSize: '14px', color: '#6b7280' }}>
                      {mockTool.owner.email}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', border: '1px solid #e5e7eb' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', marginBottom: '16px' }}>
                Book This Tool
              </h3>
              
              <div style={{ marginBottom: '16px' }}>
                <label htmlFor="status" style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                  Booking Status
                </label>
                <select
                  id="status"
                  value={bookingStatus}
                  onChange={(e) => setBookingStatus(e.target.value)}
                  style={{ 
                    width: '100%', 
                    padding: '8px 12px', 
                    border: '1px solid #d1d5db', 
                    borderRadius: '6px',
                    fontSize: '14px'
                  }}
                >
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Out for Pickup">Out for Pickup</option>
                  <option value="Returned">Returned</option>
                </select>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <BookingStatus status={bookingStatus} />
                <span style={{ fontSize: '14px', color: '#6b7280' }}>
                  {mockTool.availability.available ? 'Available now' : `Available from ${mockTool.availability.nextAvailable}`}
                </span>
              </div>
              
              <button
                onClick={handleBooking}
                disabled={!mockTool.availability.available}
                style={{
                  width: '100%',
                  backgroundColor: mockTool.availability.available ? '#10b981' : '#9ca3af',
                  color: '#ffffff',
                  padding: '14px 24px',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '600',
                  border: 'none',
                  cursor: mockTool.availability.available ? 'pointer' : 'not-allowed',
                  transition: 'all 0.2s'
                }}
              >
                {mockTool.availability.available ? 'Book Now' : 'Currently Unavailable'}
              </button>
            </div>
          </div>
        </div>
        
        <div style={{ marginTop: '32px' }}>
          <Link 
            href="/search"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              color: '#10b981',
              textDecoration: 'none',
              fontSize: '16px',
              fontWeight: '500'
            }}
          >
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Search
          </Link>
        </div>
      </main>
    </div>
  )
}
