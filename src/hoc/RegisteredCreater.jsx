import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const useAuth = () => {
	const userToken = useSelector((state) => state.registerUser.userTokens);
	const isAuthenticated = userToken?.accessToken;
	const isRegistered = useSelector(
		(state) => state.creatorInformation.creartorInformation?.[0]?.user_data
	);
	const user = { loggedIn: isAuthenticated, isRegister: isRegistered };
	return user && user;
};

const CreatorRegisterProtectedRoute = () => {
	const role = useSelector((state) => state.registerUser.currentRole);
	const isAuthenticated = role === 'Creator' ? true : false;

	const isAuth = useAuth();
	return isAuth.loggedIn && isAuth.isRegister && isAuthenticated ? (
		<Outlet />
	) : (
		<Navigate to='/' />
	);
};

export default CreatorRegisterProtectedRoute;
