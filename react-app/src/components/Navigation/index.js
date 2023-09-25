import { React, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
	const [search, setSearch] = useState("")
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
								// await dispatch(searchAllProjectsThunk(search))
							}
						}}
					/>
					{/* dispatch the search thunk here, passing it e.target.value */}
					<button className='search-button'
						onClick={async (e) => {
							// await dispatch(searchAllProjectsThunk(search))
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
