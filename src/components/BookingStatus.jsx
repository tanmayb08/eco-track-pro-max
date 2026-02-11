export default function BookingStatus({ status }) {
  const getStatusConfig = (status) => {
    switch (status) {
      case 'Pending':
        return {
          backgroundColor: '#fef3c7',
          color: '#92400e',
          icon: '⏳'
        }
      case 'Approved':
        return {
          backgroundColor: '#dbeafe',
          color: '#1e40af',
          icon: '✓'
        }
      case 'Out for Pickup':
        return {
          backgroundColor: '#e9d5ff',
          color: '#6b21a8',
          icon: '🚚'
        }
      case 'Returned':
        return {
          backgroundColor: '#d1fae5',
          color: '#065f46',
          icon: '↩️'
        }
      default:
        return {
          backgroundColor: '#f3f4f6',
          color: '#374151',
          icon: '❓'
        }
    }
  }

  const config = getStatusConfig(status)

  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      padding: '6px 12px',
      borderRadius: '9999px',
      fontSize: '14px',
      fontWeight: '500',
      backgroundColor: config.backgroundColor,
      color: config.color,
      gap: '6px'
    }}>
      <span style={{ fontSize: '16px' }}>{config.icon}</span>
      {status}
    </div>
  )
}
