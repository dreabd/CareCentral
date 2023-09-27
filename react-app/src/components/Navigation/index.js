import { React, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

import ProfileButton from './ProfileButton';

import './Navigation.css';

function Navigation({ isLoaded }) {
	const dispatch = useDispatch()
	const history = useHistory()

	// ------------ Slice of State Selectors -----------
	const sessionUser = useSelector(state => state.session.user);

	return (
		<div class="navbar">
			<div>
				<NavLink exact to="/">Home</NavLink>
			</div>
			{isLoaded && (
				<div class="profile-button-container">
					<ProfileButton user={sessionUser} />
				</div>
			)}
		</div>

	);
}

export default Navigation;
