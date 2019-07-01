import React from 'react';

const CommonForm = ({ onEmailChange, onPasswordChange }) => {
	return (
		<div>
			<div className="mt3">
				<label className="db fw6 lh-copy f6" htmlFor="email-address">
					Email
				</label>
				<input
					onChange={onEmailChange}
					className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
					type="email"
					name="email-address"
					id="email-address"
				/>
			</div>
			<div className="mv3">
				<label className="db fw6 lh-copy f6" htmlFor="password">
					Password
				</label>
				<input
					onChange={onPasswordChange}
					className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
					type="password"
					name="password"
					id="password"
				/>
			</div>
		</div>
	);
};

export default CommonForm;
