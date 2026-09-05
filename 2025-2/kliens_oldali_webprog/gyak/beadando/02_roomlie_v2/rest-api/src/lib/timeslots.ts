import { db } from '../db.js'

export const TIMESLOTS = [
  { startTime: '08:00', endTime: '10:00' },
  { startTime: '10:00', endTime: '12:00' },
  { startTime: '12:00', endTime: '14:00' },
  { startTime: '14:00', endTime: '16:00' },
  { startTime: '16:00', endTime: '18:00' },
  { startTime: '18:00', endTime: '20:00' },
]

export async function getAvailableTimeslots(tableId: number, date: string) {
  const booked = await db.booking.findMany({
    where: {
      tableId,
      date,
      status: { not: 'DECLINED' },
    },
    select: { startTime: true },
  })

  const bookedTimes = new Set(booked.map((b) => b.startTime))

  return TIMESLOTS.map((slot) => ({
    startTime: slot.startTime,
    endTime: slot.endTime,
    isAvailable: !bookedTimes.has(slot.startTime),
  }))
}
