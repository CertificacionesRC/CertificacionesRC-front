import { config } from '@/utils/auth'
import { getServerSession } from 'next-auth/next'

async function HomePage() {
  await getServerSession(config)
  return <div>Inicio</div>
}

export default HomePage
