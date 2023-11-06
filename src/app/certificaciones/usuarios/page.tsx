import { getSession } from '@/utils/actions'
import ManageTableUserComponent from './manage-tableUser-component'
import { GET_ALL_USERS } from '@/service/api'

const fetchGetUsers = async (token: string) => {
  try {
    return await fetch(GET_ALL_USERS, {
      next: { tags: ['all_users'] },
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
  const session = await getSession()
  const users = await fetchGetUsers(session?.token ?? '')

  return (
    <>
      <ManageTableUserComponent data={users?.data} token={session?.token ?? ''} />
    </>
  )
}

export default UserPage
