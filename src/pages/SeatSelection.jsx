import { useState } from 'react'
import './SeatSelection.css'

const TICKET_RATE = 201

const generateSeats = () =>
Array.from({ length: 30 }, (_, i) => {
const id = i + 1
// Pre-set some booked seats to match Figma
const booked = [2, 8, 11, 14, 15, 17, 18, 20, 26, 27, 29, 30]
return { id, status: booked.includes(id) ? 'booked' : 'empty' }
})

const SeatSelection = ({ onBack, onNext }) => {
const [seats, setSeats] = useState(generateSeats())

const selectedSeats = seats.filter(s => s.status === 'selected')
const totalAmount = selectedSeats.length * TICKET_RATE

const removeLastSeat = () => {
if (selectedSeats.length === 0) return
const lastId = selectedSeats[selectedSeats.length - 1].id
setSeats(prev => prev.map(s =>
s.id === lastId ? { ...s, status: 'empty' } : s
))
}

const toggleSeat = (id) => {
setSeats(prev => prev.map(seat => {
if (seat.id !== id) return seat
if (seat.status === 'booked') return seat
if (seat.status === 'selected') return { ...seat, status: 'empty' }
return { ...seat, status: 'selected' }
}))
}

const leftIds = [1,2,3,6,7,8,11,12,13,16,17,18,21,22,23,26,27,28]
const rightIds = [4,5,9,10,14,15,19,20,24,25,29,30]
const leftSeats = seats.filter(s => leftIds.includes(s.id))
const rightSeats = seats.filter(s => rightIds.includes(s.id))

return (
<div className="seat-page">
  {/* Header */}
  <div className="seat-header">
    <button className="back-btn" onClick={onBack}>←</button>
    <h1 className="seat-title">Select your Seat</h1>
  </div>

  {/* Seat Counter */}
  <div className="seat-counter">
    <span className="seat-counter-label">No. of Seat</span>
    <div className="seat-counter-controls">
      {selectedSeats.length > 0 && (
        <>
          <button className="counter-btn minus" onClick={removeLastSeat}>−</button>
          <span className="counter-value">{String(selectedSeats.length).padStart(2, '0')}</span>
          <button className="counter-btn plus" onClick={() => {}}>+</button>
        </>
      )}
      {selectedSeats.length === 0 && (
        <span className="counter-value">00</span>
      )}
    </div>
  </div>

  {/* Venue Images */}
  <div className="venue-images">
    <div className="venue-img venue-img--aerial">
      <div className="venue-img-placeholder">
        <span>🏟</span>
        <p>Aerial View</p>
      </div>
    </div>
    <div className="venue-img venue-img--interior">
      <div className="venue-img-placeholder dark">
        <span>🏀</span>
        <p>Interior View</p>
      </div>
    </div>
  </div>

  {/* Legend */}
  <div className="seat-legend">
    <div className="legend-item">
      <div className="legend-box booked"></div>
      <span>Booked Seats</span>
    </div>
    <div className="legend-item">
      <div className="legend-box selected"></div>
      <span>Selected Seats</span>
    </div>
    <div className="legend-item">
      <div className="legend-box empty"></div>
      <span>Empty Seats</span>
    </div>
  </div>

  {/* Seat Grid Header */}
  <div className="seat-grid-header">
    <div className="seat-grid-label">
      <span className="ticket-icon">🎟</span>
      <strong>Tickets</strong>
    </div>
    <span className="seat-grid-empty-label">Empty</span>
  </div>

  {/* Seat Grid */}
  <div className="seat-grid-wrapper">
    {/* Left block */}
    <div className="seat-col">
      {leftSeats.map(seat => (
        <button
          key={seat.id}
          className={`seat-btn seat--${seat.status}`}
          onClick={() => toggleSeat(seat.id)}
          disabled={seat.status === 'booked'}
        >
          {String(seat.id).padStart(2, '0')}
        </button>
      ))}
    </div>

    {/* Divider */}
    <div className="seat-col-divider"></div>

    {/* Right block */}
    <div className="seat-col seat-col--right">
      {rightSeats.map(seat => (
        <button
          key={seat.id}
          className={`seat-btn seat--${seat.status}`}
          onClick={() => toggleSeat(seat.id)}
          disabled={seat.status === 'booked'}
        >
          {String(seat.id).padStart(2, '0')}
        </button>
      ))}
    </div>
  </div>
  {/* Footer Summary */}
  <div className="seat-summary">
    <div className="summary-item">
      <span className="summary-label">Ticket Rate</span>
      <strong className="summary-value">${TICKET_RATE}</strong>
    </div>
    <div className="summary-item">
      <span className="summary-label">No. of Ticket</span>
      <strong className="summary-value">{String(selectedSeats.length).padStart(2, '0')}</strong>
    </div>
    <div className="summary-item">
      <span className="summary-label">Total Amount</span>
      <strong className="summary-value">${totalAmount}</strong>
    </div>
  </div>

  {/* Next Button */}
  <button
    className="next-btn"
    onClick={() => onNext && onNext({ selectedSeats, totalAmount, seatCount })}
    disabled={selectedSeats.length === 0}
  >
    Next
  </button>

</div>

)
}

export default SeatSelection