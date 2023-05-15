import React from 'react'
import { useParams } from 'react-router-dom';

export default function UserDashboard() {
  const { userId } = useParams();
  return (
    <h1>Dashboard of {userId}</h1>
  )
}
