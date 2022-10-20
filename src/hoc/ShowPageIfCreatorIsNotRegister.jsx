import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const useAuth = () => {
	const userToken = useSelector((state) => state.registerUser.userTokens);
	const isAuthenticated = userToken?.accessToken;
	const isRegistered = userToken?.data?.status;
	const user = { loggedIn: isAuthenticated, register: isRegistered };
	return user;
};

const CreatorProtectedRouteUnregistered = () => {
	const role = useSelector((state) => state.registerUser.currentRole);
	const isAuthenticated = role === 'Creator' ? true : false;

	const isAuth = useAuth();
	return isAuth.loggedIn && isAuth.register && isAuthenticated ? (
		<Outlet />
	) : (
		<Navigate to='/' />
	);
};

export default CreatorProtectedRouteUnregistered;
