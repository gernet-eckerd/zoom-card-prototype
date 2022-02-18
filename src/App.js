import { useState, useEffect } from 'react';

import logo from './logo.svg';
import './App.css';
import ZoomCard from './ZoomCard';
import JwtForm from './JwtForm';


function App() {
	const [jwt, setJwt] = useState('');	
	const [showZoomCard, setShowZoomCard] = useState(false);
	
	return (
		<div className="App">
			<JwtForm onChange={setJwt} jwt={jwt} />
			<button onClick={() => {setShowZoomCard(true)}}>Show Zoom Card</button>
			{showZoomCard && <ZoomCard jwt={jwt} />}
		</div>
	);
}

export default App;
