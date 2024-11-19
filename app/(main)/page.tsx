import { auth } from '@/auth'
import React from 'react'

type Props = {}

const page = async (props: Props) => {
  const session = await auth()
  return (
    <div>page</div>
  )
}

export default page