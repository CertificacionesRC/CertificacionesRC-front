import { config } from '@/utils/auth'
import { getServerSession } from 'next-auth/next'
import ManageTableUserComponent from './manage-tableUser-component'
import { GET_ALL_USERS } from '@/service/api'

const fetchGetUsers = async (token: string) => {
  try {
    return await fetch(GET_ALL_USERS, {
      cache: 'no-store',
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }).then(async (res) => await res.json())
  } catch (err) {
    console.log(err)
  }
}

async function UserPage() {
  const objSession = await getServerSession(config)
  const token = objSession?.user.token
  const users = await fetchGetUsers(token)
  console.log(users)
  return (
    <>
      <ManageTableUserComponent data={users.data} token={token} />
    </>
  )
}

export default UserPage
