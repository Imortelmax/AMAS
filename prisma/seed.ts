// prisma/seed.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Début du seeding...')

  // On crée un événement test pour le 22 février 2026
  const event = await prisma.event.upsert({
    where: { id: 'test-event-1' },
    update: {},
    create: {
      id: 'test-event-1',
      title: 'Le RDV des pétoires',
      description: 'Une balade matinale pour les passionnés de mécaniques anciennes. Café offert au départ de la place de la mairie.',
      location: 'Place de la Mairie, Marseille',
      date: new Date('2026-02-22T09:00:00Z'),
      imageUrl: 'https://imgs.search.brave.com/icYkPZ6VjVSDhzWVUcUAdnrZL5DH8ebpMxKXWVJ-VEA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3RpL3Bob3Rv/cy1ncmF0dWl0ZS90/Mi8yMjE0NTYwMi1j/bGFzc2lxdWUtc3R5/bGUtbW90by1zdXIt/cm91dGUtYXZlYy1s/ZS1jb3VjaGVyLWR1/LXNvbGVpbC1ncmF0/dWl0LXBob3RvLmpw/Zw',
    },
  })

  console.log({ event })
  console.log('Seeding terminé !')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })