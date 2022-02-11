import React from 'react';
import ReactDOM from 'react-dom';
import { useState } from 'react';
import axios from 'axios';
import jwt from 'jsonwebtoken';

import Modal from './Modal';

export default function ZoomCard(props) {
	
	const zoomAPIKey = 'FOOBAR';
	const zoomAPISecret = 'FOOBARBAZ';
	
	const [showSignIn, setShowSignIn] = useState(false);
	const [isSigningIn, setIsSigningIn] = useState(false);
	const [email, setEmail] = useState('');
	
	const signIn = function(e) {
		e.preventDefault();
		setShowSignIn(true);
	}
	
	const handleSignInClose = function() {
		cancelSignIn();
	}
	
	const handleSignInSubmit = async function(e) {
		e.preventDefault();
		setIsSigningIn(true);
		// use string payload to bypass Buffer issue with jsonwebtoken
		const token = jwt.sign(JSON.stringify({
			iss: zoomAPIKey,
			exp: (new Date()).getTime() + 5000,
		}), zoomAPISecret);
		console.log(token);
		console.log(email);
		try {
			const resp = await axios({
				method: 'get',
				url: `https://api.zoom.us/v2/users/${email}?status=active`,
				headers: {
					'content-type': 'application/json',
					'Authorization': `Bearer ${token}`,
					'Referrer-Policy': 'unsafe-url',
				},
				responseType: 'json',
			});
			console.log(resp);
		}
		catch (e) {
			console.log(e);
		}
	}
	
	const cancelSignIn = function() {
		setIsSigningIn(false);
		setShowSignIn(false);
		setEmail('');
	}
	
	const handleCancelSignIn = function(e) {
		e.preventDefault();
		cancelSignIn();
	}
	
	return (
		<>
			<div className="card">
				<button onClick={signIn}>Sign In</button>
			</div>
			{showSignIn && 
				<Modal title="Sign In To Zoom" onClose={handleSignInClose}>
					<label htmlFor="email">Email</label>
					<input id="email"
						className="text-input"
						onChange={(e) => setEmail(e.target.value)}
						placeholder="example@eckerd.edu" />
					<button onClick={handleSignInSubmit} 
						disabled={isSigningIn}>
						{isSigningIn ? 'Signing in...' : 'Sign In'}
					</button>
					<button onClick={handleCancelSignIn}>Cancel</button>
				</Modal>
			}
		</>
	);
}
