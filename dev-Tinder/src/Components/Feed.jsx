import axios from 'axios'
import React, { useEffect } from 'react'
import BASE_URL from '../utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/feedSlice'
import Card from './Card'

const Feed = () => {
  const dispatch = useDispatch()
  const datainstore = useSelector((store) => store.feed)

  const feedhander = async () => {
    if (datainstore) {
      return
    }
    try {
      const currentfeed = await axios.get("http://localhost:7777/feed", { withCredentials: true });
      console.log(currentfeed.data);
      
      if (currentfeed ) {
        dispatch(addFeed(currentfeed.data.data))
      }
    } catch (err) {
      console.log(err.message)
    }
  }

  useEffect(() => {
    feedhander()
  }, [])


  return (
    datainstore && datainstore .length > 0 && (
      <div className="flex items-center justify-center my-5">
        <Card user={datainstore[0]} />
      </div>
    )
  )
}

export default Feed
