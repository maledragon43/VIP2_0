import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { userId, preferences } = req.body

    // Get user's preferences and find potential matches
    const user = await prisma.user.findUnique({
      where: { id: userId }
    })

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    // Simple matching algorithm - in production, this would be more sophisticated
    const potentialMatches = await prisma.user.findMany({
      where: {
        id: { not: userId },
        // Add more sophisticated matching criteria here
      },
      take: 10,
      orderBy: {
        createdAt: 'desc'
      }
    })

    // Select a random match
    const randomMatch = potentialMatches[Math.floor(Math.random() * potentialMatches.length)]

    if (!randomMatch) {
      return res.status(404).json({ message: 'No matches found' })
    }

    // Create a match record
    const match = await prisma.match.create({
      data: {
        userId: userId,
        matchedId: randomMatch.id,
        status: 'PENDING'
      }
    })

    // Return match without sensitive data
    const { password: _, ...matchUserWithoutPassword } = randomMatch

    res.status(200).json({
      message: 'Match found',
      match: matchUserWithoutPassword,
      matchId: match.id
    })
  } catch (error) {
    console.error('Match error:', error)
    res.status(500).json({ message: 'Internal server error' })
  } finally {
    await prisma.$disconnect()
  }
}
