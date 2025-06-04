import axios from 'axios'
import React, { useEffect } from 'react'
import BASE_URL from '../utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/feedSlice'
import Card from './Card'
import { current } from '@reduxjs/toolkit'
import { data } from 'react-router-dom'

const Feed = () => {
  const dispatch = useDispatch()
  const datainstore = useSelector((store) => store.feed)
  const feedhander = async () => {
    if (datainstore) {
      return
    }
    try {
      const currentfeed = await axios.get("http://localhost:7777/feed", { withCredentials: true })
      if (currentfeed ) {
        console.log(currentfeed.data.data);
        
        dispatch(addFeed(currentfeed?.data?.data))
      }
    } catch (err) {
       return<div>error</div>
    }
  }

  useEffect(() => {
    feedhander()
  }, [])

  if (!Array.isArray(datainstore)) {
  return <div className='text-center font-bold my-15 text-4xl' ></div>;
}

  return (
    datainstore && datainstore .length > 0 && (
      <div className="flex items-center justify-center my-5">
        <Card user={datainstore[0]} />
      </div>
    )
  )
}

export default Feed
