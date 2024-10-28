import React from 'react'
import { useState, useCallback, useEffect } from 'react'
import {useSocket } from '../context/SocketProvider'
import { useNavigate } from 'react-router-dom'
import './Lobby.css'


const LobbyScreen = () => {

  const [email,setEmail] = useState("")
  const [room,setRoom] = useState("")

  const socket = useSocket()
  const navigate = useNavigate()

  const handleSubmitForm = useCallback((e)=>{
    e.preventDefault();
    socket.emit('room:join',{email,room});
  },[email,room,socket]);

  const handleJoinRoom = useCallback((data)=>{
    const {email, room} = data;
    navigate(`/room/${room}`)
    
  },[navigate])

  useEffect(()=>{
    socket.on('room:join', handleJoinRoom);
    return ()=>{
      socket.off('room:join',handleJoinRoom)
    }
      
    },[socket,handleJoinRoom]);

  return (
    <>
    <div className='container'>
      <h1>Lobby</h1>
      <form onSubmit={handleSubmitForm} className='form'>
        <label htmlFor='email'>Email</label>
        <input type="email" required id="email" value={email} onChange={(e)=> setEmail(e.target.value)} />
        <label htmlFor='room'>Room Number</label>
        <input type="text" required id="room" value={room} onChange={(e)=> setRoom(e.target.value)} />
        <button>Join</button>
        
      </form>
    </div>
    </>
  )
}

export default LobbyScreen
