import './styles/App.css';
import React from 'react';
import Nav from './components/Nav';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Program from './Program';
import Contact from './Contact';
import Show from './Show';

function App() {
	return (
		<BrowserRouter>
			<Nav />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="program" element={<Program />} />
				<Route path="contact" element={<Contact />} />
				<Route path="/program/:id" element={<Show />} />
			</Routes>
		</BrowserRouter>
	);
}
export default App;
