import React from 'react';
import ReactDOM from 'react-dom';
import { useState } from 'react';
import axios from 'axios';
import jwt from 'jsonwebtoken';

import Modal from './Modal';

export default function ZoomCard(props) {
	
	const zoomTokenKey = 'FOOBAR';
	
	const [showSignIn, setShowSignIn] = useState(false);
	const [isSigningIn, setIsSigningIn] = useState(false);
	
	const signIn = function(e) {
		e.preventDefault();
		setShowSignIn(true);
	}
	
	const handleSignInClose = function() {
		setShowSignIn(false)
	}
	
	const handleSignInSubmit = function(e) {
		e.preventDefault();
		setIsSigningIn(true);
		const token = jwt.sign('', zoomTokenKey);
		console.log(token);
	}
	
	return (
		<>
			<div className="card">
				<button onClick={signIn}>Sign In</button>
			</div>
			{showSignIn && 
				<Modal title="Sign In To Zoom" onClose={handleSignInClose}>
					<p>Something will go here.</p>
					<button onClick={handleSignInSubmit} 
						disabled={isSigningIn}>
						{isSigningIn ? 'Signing in...' : 'Sign In'}
					</button>
				</Modal>
			}
		</>
	);
}
