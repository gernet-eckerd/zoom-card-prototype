import React from 'react';
import ReactDOM from 'react-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';

import Modal from './Modal';

export default function ZoomCard(props) {
	
	const [isLoading, setIsLoading] = useState(true);
	const [user, setUser] = useState({});
	const [schedule, setSchedule] = useState([]);
	
	useEffect(async () => {
		const headers = {
			'Authorization': 'Bearer '+props.jwt,
		};
		const userResp = await axios.get('http://localhost:8001/api/connectors/zoom/user', {
			headers,
		});
		setUser(userResp.data.data);
		const scheduleResp = await axios.get('http://localhost:8001/api/connectors/zoom/user/schedule', {
			headers,
		});
		setSchedule(scheduleResp.data.data.meetings);
		setIsLoading(false);
	}, [true]);
	
	return (
		<>
			<div className="card">
				{isLoading ? (
					<div>Loading...</div>
				) : (<>
						<h3>{user.email}</h3>
						<p><a href={user.personal_meeting_url}>Personal Meeting Room</a></p>
						<h4>Schedule:</h4>
						<ul>
							{schedule.map((meeting) => (
								<li>
									<strong>{meeting.topic}</strong><br />
									<em>{moment(meeting.start_time).format('MM/DD h:mm a')} ({meeting.duration} min.)</em><br />
									<a href={meeting.join_url}>Join</a>
								</li>
							))}
						</ul>
				</>)}
			</div>
			{/*
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
			*/}
		</>
	);
}
