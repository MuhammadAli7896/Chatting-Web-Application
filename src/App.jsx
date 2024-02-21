import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Homepage from './Pages/Homepage'
import Chatpage from './Pages/Chatpage'
import "./App.css"

const App = () => {
	return (
		<div className='App'>
				<Routes>
					<Route path="/" element={<Homepage />} exact />
					<Route path="/chats" element={<Chatpage />} />
				</Routes>
		</div>
		
	)
}

export default App