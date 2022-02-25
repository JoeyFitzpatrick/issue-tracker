import { useState, useEffect } from 'react'
import { useUser } from "@auth0/nextjs-auth0";

export default function Test() {
    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(false)
    const { user, loading } = useUser();
  
    useEffect(() => {
      setLoading(true)
      if (user) {
        fetch(`api/issues/${user.sub}`)
        .then((res) => res.json())
        .then((data) => {
          setData(data)
          setLoading(false)
        })
      }
    }, [user])

    if (loading) return <div>Loading from user</div>
    if (isLoading) return <div>Still loading...</div>
    if (!data) return <div>Loading...</div>

    return <div>{JSON.stringify(data)}</div>
}