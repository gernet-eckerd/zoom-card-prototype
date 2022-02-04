import React from 'react';
import ReactDOM from 'react-dom';

export default function Modal(props) {
	
	const handleClose = function(e) {
		e.preventDefault();
		props.onClose();
	}
	
	return (
		<div className="modal-container">
			<div className="modal">
				<h2 className="modal-title">{ props.title }</h2>
				<a className="modal-close" href="#" onClick={handleClose}>X</a>
				<div className="modal-body">
					{props.children}
				</div>
			</div>
		</div>
	);
}
