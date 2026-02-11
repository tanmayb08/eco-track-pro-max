'use client'
import { useState } from 'react'
import Navbar from '@/components/Navbar'
import BookingStatus from '@/components/BookingStatus'

const mockBookings = [
  {
    id: 1,
    toolName: 'Power Drill',
    toolId: 1,
    owner: 'John Smith',
    startDate: '2024-01-15',
    endDate: '2024-01-17',
    status: 'Pending',
    totalPrice: 45,
    image: 'drill1.jpg'
  },
  {
    id: 2,
    toolName: 'Circular Saw',
    toolId: 2,
    owner: 'Sarah Johnson',
    startDate: '2024-01-10',
    endDate: '2024-01-12',
    status: 'Approved',
    totalPrice: 60,
    image: 'saw1.jpg'
  },
  {
    id: 3,
    toolName: 'Ladder',
    toolId: 3,
    owner: 'Mike Davis',
    startDate: '2024-01-08',
    endDate: '2024-01-09',
    status: 'Out for Pickup',
    totalPrice: 20,
    image: 'ladder1.jpg'
  },
  {
    id: 4,
    toolName: 'Pressure Washer',
    toolId: 4,
    owner: 'Emily Wilson',
    startDate: '2024-01-05',
    endDate: '2024-01-06',
    status: 'Returned',
    totalPrice: 50,
    image: 'washer1.jpg'
  }
]

const statusFlow = {
  'Pending': 'Approved',
  'Approved': 'Out for Pickup',
  'Out for Pickup': 'Returned',
  'Returned': 'Returned'
}

export default function BookingsPage() {
  const [bookings, setBookings] = useState(mockBookings)

  const advanceStatus = (bookingId) => {
    setBookings(prev => prev.map(booking => {
      if (booking.id === bookingId) {
        const newStatus = statusFlow[booking.status]
        return { ...booking, status: newStatus }
      }
      return booking
    }))
    alert('Status updated! (This is a UI-only demo)')
  }

  const cancelBooking = (bookingId) => {
    setBookings(prev => prev.filter(booking => booking.id !== bookingId))
    alert('Booking cancelled! (This is a UI-only demo)')
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return '#d97706'
      case 'Approved': return '#2563eb'
      case 'Out for Pickup': return '#7c3aed'
      case 'Returned': return '#16a34a'
      default: return '#6b7280'
    }
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      <Navbar />
      
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 16px' }}>
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: '#111827', marginBottom: '8px' }}>
            My Bookings
          </h1>
          <p style={{ color: '#6b7280' }}>
            Manage your tool rentals and booking requests
          </p>
        </div>

        <div style={{ display: 'grid', gap: '24px' }}>
          {bookings.map((booking) => (
            <div key={booking.id} style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', padding: '24px', border: '1px solid #e5e7eb' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr', gap: '24px' }}>
                <div>
                  <img 
                    src={`https://picsum.photos/seed/${booking.image}/200/150.jpg`}
                    alt={booking.toolName}
                    style={{ width: '100%', height: '128px', objectFit: 'cover', borderRadius: '8px' }}
                  />
                </div>
                
                <div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <div>
                      <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', margin: '0' }}>
                        {booking.toolName}
                      </h3>
                      <p style={{ fontSize: '14px', color: '#6b7280', margin: '4px 0 0 0' }}>
                        Owner: {booking.owner}
                      </p>
                    </div>
                    <BookingStatus status={booking.status} />
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#6b7280' }}>Start Date:</span>
                      <span style={{ fontWeight: '500', color: '#111827' }}>{booking.startDate}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#6b7280' }}>End Date:</span>
                      <span style={{ fontWeight: '500', color: '#111827' }}>{booking.endDate}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#6b7280' }}>Total Price:</span>
                      <span style={{ fontWeight: '500', color: '#16a34a' }}>${booking.totalPrice}</span>
                    </div>
                  </div>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: '8px' }}>
                  {booking.status !== 'Returned' && booking.status !== 'Out for Pickup' && (
                    <button
                      onClick={() => advanceStatus(booking.id)}
                      style={{ backgroundColor: '#2563eb', color: 'white', padding: '8px 16px', borderRadius: '6px', fontSize: '14px', fontWeight: '500', cursor: 'pointer', border: 'none' }}
                    >
                      {booking.status === 'Pending' ? 'Approve' : 
                       booking.status === 'Approved' ? 'Mark as Picked Up' : 
                       'Mark as Returned'}
                    </button>
                  )}
                  
                  {booking.status === 'Pending' && (
                    <button
                      onClick={() => cancelBooking(booking.id)}
                      style={{ backgroundColor: '#dc2626', color: 'white', padding: '8px 16px', borderRadius: '6px', fontSize: '14px', fontWeight: '500', cursor: 'pointer', border: 'none' }}
                    >
                      Cancel Booking
                    </button>
                  )}
                  
                  <button
                    style={{ backgroundColor: '#f3f4f6', color: '#374151', padding: '8px 16px', borderRadius: '6px', fontSize: '14px', fontWeight: '500', cursor: 'pointer', border: '1px solid #d1d5db' }}
                    onClick={() => alert(`View details for ${booking.toolName} (UI-only demo)`)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {bookings.length === 0 && (
          <div style={{ textAlign: 'center', padding: '48px 0' }}>
            <div style={{ color: '#9ca3af', marginBottom: '16px' }}>
              <svg width="64" height="64" fill="none" viewBox="0 0 24 24" style={{ margin: '0 auto' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: '500', color: '#111827', marginBottom: '8px' }}>
              No bookings yet
            </h3>
            <p style={{ color: '#6b7280', marginBottom: '16px' }}>
              Start browsing tools to make your first booking
            </p>
            <button
              onClick={() => window.location.href = '/search'}
              style={{ backgroundColor: '#2563eb', color: 'white', padding: '8px 16px', borderRadius: '6px', fontSize: '14px', fontWeight: '500', cursor: 'pointer', border: 'none' }}
            >
              Browse Tools
            </button>
          </div>
        )}

        <div style={{ marginTop: '48px', backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '8px', padding: '24px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1e40af', marginBottom: '12px' }}>
            Booking Status Guide
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px', fontSize: '14px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                <BookingStatus status="Pending" />
              </div>
              <p style={{ color: '#1e40af' }}>
                Booking request sent to tool owner, waiting for approval
              </p>
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                <BookingStatus status="Approved" />
              </div>
              <p style={{ color: '#1e40af' }}>
                Booking approved, ready for pickup
              </p>
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                <BookingStatus status="Out for Pickup" />
              </div>
              <p style={{ color: '#1e40af' }}>
                Tool has been picked up and is in use
              </p>
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                <BookingStatus status="Returned" />
              </div>
              <p style={{ color: '#1e40af' }}>
                Tool has been returned and booking is complete
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
