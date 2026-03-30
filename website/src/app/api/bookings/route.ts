import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

// ── Booking API Stub ───────────────────────────────────────────────────
// Ready for integration with: FareHarbor, Square Appointments, Bokun,
// Checkfront, TripAdvisor Experiences, or a custom system.
//
// To activate:
//   1. Set BOOKING_API_KEY and BOOKING_API_URL in .env.local
//   2. Install the provider's SDK: npm install fareharbor-sdk (or similar)
//   3. Replace the stub responses below with real API calls
// ──────────────────────────────────────────────────────────────────────

export async function GET(_req: NextRequest) {
  // Future: fetch available time slots for a given date and tour
  // const { searchParams } = new URL(_req.url)
  // const date = searchParams.get('date')
  // const tourId = searchParams.get('tourId')
  // const slots = await bookingProvider.getAvailability({ date, tourId })
  return NextResponse.json({
    status: 'coming_soon',
    message: 'Booking integration in progress.',
  })
}

export async function POST(_req: NextRequest) {
  // Future: create a reservation
  // const { tourId, date, time, guests, contact } = await _req.json()
  // const booking = await bookingProvider.createBooking({ tourId, date, time, guests, contact })
  // return NextResponse.json({ bookingId: booking.id, confirmationCode: booking.code })
  return NextResponse.json({
    status: 'coming_soon',
    message: 'Booking integration in progress.',
  })
}
