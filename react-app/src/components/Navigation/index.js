import { React, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

import ProfileButton from './ProfileButton';

import { getPatientsSearchThunk } from '../../store/patient';

import './Navigation.css';

function Navigation({ isLoaded }) {
	const dispatch = useDispatch()
	const history = useHistory()

	// ---------------- State Variables----------------
	const [search, setSearch] = useState("")

	// ------------ Slice of State Selectors -----------
	const sessionUser = useSelector(state => state.session.user);

	return (
		<ul>
			<li>
				<NavLink exact to="/">Home</NavLink>
			</li>
			<li>
				<div className='search-bar-container'>
					<input
						type='search'
						className='search-bar'
						placeholder='Search for Patients'
						onChange={async (e) => {
							setSearch(e.target.value)
						}}
						onKeyDown={async (e) => {
							if (e.key === 'Enter') {
								await dispatch(getPatientsSearchThunk(search))
								history.push("/")
							}
						}}
					/>
					{/* dispatch the search thunk here, passing it e.target.value */}
					<button className='search-button'
						onClick={async (e) => {
							await dispatch(getPatientsSearchThunk(search))
							history.push("/")
						}}>
						<i class="icon-search"></i>
					</button>
				</div>
			</li>
			{isLoaded && (
				<li>
					<ProfileButton user={sessionUser} />
				</li>
			)}
		</ul>
	);
}

export default Navigation;
