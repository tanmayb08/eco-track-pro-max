'use client'
import { useState } from 'react'
import Navbar from '@/components/Navbar'

const mockUser = {
  name: 'Jane Doe',
  email: 'jane.doe@email.com',
  phone: '+1 (555) 123-4567',
  location: 'San Francisco, CA',
  joinDate: 'January 2024',
  avatar: 'user1.jpg',
  bio: 'DIY enthusiast and home improvement lover. Happy to share my tools with the community!',
  rating: 4.9,
  totalRentals: 23,
  totalListings: 8,
  verificationStatus: 'Verified'
}

const mockUserTools = [
  {
    id: 1,
    name: 'Power Drill',
    category: 'Power Tools',
    pricePerDay: 15,
    status: 'Available',
    totalRentals: 12
  },
  {
    id: 2,
    name: 'Circular Saw',
    category: 'Power Tools',
    pricePerDay: 20,
    status: 'Rented',
    totalRentals: 8
  },
  {
    id: 3,
    name: 'Socket Set',
    category: 'Hand Tools',
    pricePerDay: 8,
    status: 'Available',
    totalRentals: 15
  }
]

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('about')
  const [editMode, setEditMode] = useState(false)
  const [userProfile, setUserProfile] = useState(mockUser)

  const handleSaveProfile = (e) => {
    e.preventDefault()
    setEditMode(false)
    alert('Profile updated! (This is a UI-only demo)')
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setUserProfile(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      <Navbar />
      
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 16px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '32px' }}>
          <div>
            <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', padding: '24px', border: '1px solid #e5e7eb' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ width: '96px', height: '96px', backgroundColor: '#d1d5db', borderRadius: '50%', margin: '0 auto 24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="48" height="48" fill="none" stroke="#6b7280" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                
                <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', marginBottom: '8px' }}>
                  {userProfile.name}
                </h2>
                
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                  <span style={{ color: '#f59e0b' }}>⭐</span>
                  <span style={{ marginLeft: '4px', fontWeight: '600', color: '#111827' }}>{userProfile.rating}</span>
                  <span style={{ marginLeft: '4px', fontSize: '14px', color: '#6b7280' }}>({userProfile.totalRentals} rentals)</span>
                </div>
                
                {userProfile.verificationStatus === 'Verified' && (
                  <div style={{ display: 'inline-flex', alignItems: 'center', backgroundColor: '#dcfce7', color: '#166534', fontSize: '14px', fontWeight: '500', padding: '6px 12px', borderRadius: '9999px', marginBottom: '16px' }}>
                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20" style={{ marginRight: '4px' }}>
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Verified
                  </div>
                )}
                
                <div style={{ fontSize: '14px', color: '#6b7280', textAlign: 'left', lineHeight: '1.6' }}>
                  <div style={{ marginBottom: '8px' }}>📧 {userProfile.email}</div>
                  <div style={{ marginBottom: '8px' }}>📱 {userProfile.phone}</div>
                  <div style={{ marginBottom: '8px' }}>📍 {userProfile.location}</div>
                  <div>📅 Joined {userProfile.joinDate}</div>
                </div>
              </div>
              
              <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid #e5e7eb' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', textAlign: 'center' }}>
                  <div>
                    <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827' }}>{userProfile.totalListings}</div>
                    <div style={{ fontSize: '14px', color: '#6b7280' }}>Tools Listed</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827' }}>{userProfile.totalRentals}</div>
                    <div style={{ fontSize: '14px', color: '#6b7280' }}>Total Rentals</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <div style={{ borderBottom: '1px solid #e5e7eb', marginBottom: '24px' }}>
              <nav style={{ display: 'flex', gap: '32px' }}>
                <button
                  onClick={() => setActiveTab('about')}
                  style={{ 
                    padding: '8px 0', 
                    borderBottom: activeTab === 'about' ? '2px solid #16a34a' : '2px solid transparent', 
                    fontSize: '14px', 
                    fontWeight: '500', 
                    color: activeTab === 'about' ? '#16a34a' : '#6b7280',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  About
                </button>
                <button
                  onClick={() => setActiveTab('tools')}
                  style={{ 
                    padding: '8px 0', 
                    borderBottom: activeTab === 'tools' ? '2px solid #16a34a' : '2px solid transparent', 
                    fontSize: '14px', 
                    fontWeight: '500', 
                    color: activeTab === 'tools' ? '#16a34a' : '#6b7280',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  My Tools
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  style={{ 
                    padding: '8px 0', 
                    borderBottom: activeTab === 'settings' ? '2px solid #16a34a' : '2px solid transparent', 
                    fontSize: '14px', 
                    fontWeight: '500', 
                    color: activeTab === 'settings' ? '#16a34a' : '#6b7280',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  Settings
                </button>
              </nav>
            </div>
            
            {activeTab === 'about' && (
              <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', padding: '24px', border: '1px solid #e5e7eb' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', margin: '0' }}>
                    About Me
                  </h3>
                  <button
                    onClick={() => setEditMode(!editMode)}
                    style={{ backgroundColor: '#f3f4f6', color: '#374151', padding: '8px 16px', borderRadius: '6px', fontSize: '14px', fontWeight: '500', cursor: 'pointer', border: '1px solid #d1d5db' }}
                  >
                    {editMode ? 'Cancel' : 'Edit Profile'}
                  </button>
                </div>
                
                {editMode ? (
                  <form onSubmit={handleSaveProfile}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                          Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={userProfile.name}
                          onChange={handleInputChange}
                          style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '6px' }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={userProfile.email}
                          onChange={handleInputChange}
                          style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '6px' }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                          Phone
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={userProfile.phone}
                          onChange={handleInputChange}
                          style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '6px' }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                          Location
                        </label>
                        <input
                          type="text"
                          name="location"
                          value={userProfile.location}
                          onChange={handleInputChange}
                          style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '6px' }}
                        />
                      </div>
                    </div>
                    
                    <div style={{ marginBottom: '16px' }}>
                      <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                        Bio
                      </label>
                      <textarea
                        name="bio"
                        value={userProfile.bio}
                        onChange={handleInputChange}
                        style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '6px', minHeight: '100px' }}
                        rows="4"
                      ></textarea>
                    </div>
                    
                    <button type="submit" style={{ backgroundColor: '#2563eb', color: 'white', padding: '8px 16px', borderRadius: '6px', fontSize: '14px', fontWeight: '500', cursor: 'pointer', border: 'none' }}>
                      Save Changes
                    </button>
                  </form>
                ) : (
                  <div>
                    <p style={{ color: '#6b7280', marginBottom: '24px', lineHeight: '1.6' }}>
                      {userProfile.bio}
                    </p>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                      <div>
                        <h4 style={{ fontSize: '16px', fontWeight: '500', color: '#111827', marginBottom: '12px' }}>Contact Information</h4>
                        <div style={{ fontSize: '14px', color: '#6b7280', lineHeight: '1.6' }}>
                          <div style={{ marginBottom: '4px' }}><span style={{ fontWeight: '500' }}>Email:</span> {userProfile.email}</div>
                          <div style={{ marginBottom: '4px' }}><span style={{ fontWeight: '500' }}>Phone:</span> {userProfile.phone}</div>
                          <div><span style={{ fontWeight: '500' }}>Location:</span> {userProfile.location}</div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 style={{ fontSize: '16px', fontWeight: '500', color: '#111827', marginBottom: '12px' }}>Account Details</h4>
                        <div style={{ fontSize: '14px', color: '#6b7280', lineHeight: '1.6' }}>
                          <div style={{ marginBottom: '4px' }}><span style={{ fontWeight: '500' }}>Member Since:</span> {userProfile.joinDate}</div>
                          <div style={{ marginBottom: '4px' }}><span style={{ fontWeight: '500' }}>Verification:</span> {userProfile.verificationStatus}</div>
                          <div><span style={{ fontWeight: '500' }}>Average Rating:</span> ⭐ {userProfile.rating}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {activeTab === 'tools' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', margin: '0' }}>
                    My Tools
                  </h3>
                  <button
                    onClick={() => window.location.href = '/add-tool'}
                    style={{ backgroundColor: '#2563eb', color: 'white', padding: '8px 16px', borderRadius: '6px', fontSize: '14px', fontWeight: '500', cursor: 'pointer', border: 'none' }}
                  >
                    Add New Tool
                  </button>
                </div>
                
                <div style={{ display: 'grid', gap: '16px' }}>
                  {mockUserTools.map((tool) => (
                    <div key={tool.id} style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', padding: '16px', border: '1px solid #e5e7eb' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <img 
                            src={`https://picsum.photos/seed/${tool.id}/80/80.jpg`}
                            alt={tool.name}
                            style={{ width: '64px', height: '64px', objectFit: 'cover', borderRadius: '8px', marginRight: '16px' }}
                          />
                          <div>
                            <h4 style={{ fontSize: '16px', fontWeight: '500', color: '#111827', margin: '0 0 4px 0' }}>{tool.name}</h4>
                            <p style={{ fontSize: '14px', color: '#6b7280', margin: '0' }}>{tool.category}</p>
                            <p style={{ fontSize: '16px', fontWeight: 'bold', color: '#16a34a', margin: '4px 0 0 0' }}>${tool.pricePerDay}<span style={{ fontSize: '14px', color: '#6b7280', fontWeight: 'normal' }}>/day</span></p>
                          </div>
                        </div>
                        
                        <div style={{ textAlign: 'right' }}>
                          <span style={{ display: 'inline-block', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: '500', marginBottom: '4px', backgroundColor: tool.status === 'Available' ? '#dcfce7' : '#fef3c7', color: tool.status === 'Available' ? '#166534' : '#92400e' }}>
                            {tool.status}
                          </span>
                          <p style={{ fontSize: '12px', color: '#6b7280', margin: '0' }}>
                            {tool.totalRentals} rentals
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {activeTab === 'settings' && (
              <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', padding: '24px', border: '1px solid #e5e7eb' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', marginBottom: '24px' }}>
                  Account Settings
                </h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <div>
                    <h4 style={{ fontSize: '16px', fontWeight: '500', color: '#111827', marginBottom: '12px' }}>Notifications</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <label style={{ display: 'flex', alignItems: 'center' }}>
                        <input type="checkbox" style={{ marginRight: '8px' }} defaultChecked />
                        <span style={{ fontSize: '14px', color: '#374151' }}>Email notifications for new bookings</span>
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center' }}>
                        <input type="checkbox" style={{ marginRight: '8px' }} defaultChecked />
                        <span style={{ fontSize: '14px', color: '#374151' }}>SMS notifications for booking updates</span>
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center' }}>
                        <input type="checkbox" style={{ marginRight: '8px' }} />
                        <span style={{ fontSize: '14px', color: '#374151' }}>Promotional emails and offers</span>
                      </label>
                    </div>
                  </div>
                  
                  <div>
                    <h4 style={{ fontSize: '16px', fontWeight: '500', color: '#111827', marginBottom: '12px' }}>Privacy</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <label style={{ display: 'flex', alignItems: 'center' }}>
                        <input type="checkbox" style={{ marginRight: '8px' }} defaultChecked />
                        <span style={{ fontSize: '14px', color: '#374151' }}>Show my profile to other users</span>
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center' }}>
                        <input type="checkbox" style={{ marginRight: '8px' }} defaultChecked />
                        <span style={{ fontSize: '14px', color: '#374151' }}>Display my general location (neighborhood only)</span>
                      </label>
                    </div>
                  </div>
                  
                  <div style={{ paddingTop: '24px', borderTop: '1px solid #e5e7eb' }}>
                    <button style={{ backgroundColor: '#dc2626', color: 'white', padding: '8px 16px', borderRadius: '6px', fontSize: '14px', fontWeight: '500', cursor: 'pointer', border: 'none' }}>
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
