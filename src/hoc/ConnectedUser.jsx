import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ProtectedRoute({ component: Component, ...restOfProps }) {
	const userToken = useSelector((state) => state.registerUser.userTokens);
	const isAuthenticated = userToken?.accessToken;

	return (
		<Route
			{...restOfProps}
			render={(props) =>
				isAuthenticated ? <Component {...props} /> : <Navigate to='/' />
			}
		/>
	);
}

export default ProtectedRoute;
