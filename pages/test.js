import { useState, useEffect } from 'react'
import useSWR from 'swr'
const fetcher = (...args) => fetch(...args).then((res) => res.json())


export default function Test() {

    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(false)
  
    useEffect(() => {
      setLoading(true)
      fetch('api/issues/abc')
        .then((res) => res.json())
        .then((data) => {
          setData(data)
          setLoading(false)
        })
    }, [])

    if (isLoading) return <div>Still loading...</div>
    if (!data) return <div>Loading...</div>

    return <div>{JSON.stringify(data)}</div>
}