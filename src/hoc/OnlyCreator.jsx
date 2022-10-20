import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const useAuth = () => {
	const userToken = useSelector((state) => state.registerUser.userTokens);
	const isAuthenticated = userToken?.accessToken;
	const user = { loggedIn: isAuthenticated };
	return user && user.loggedIn;
};

const CreatorProtectedRoute = () => {
	const role = useSelector((state) => state.registerUser.currentRole);
	const isAuthenticated = role === 'Creator' ? true : false;

	const isAuth = useAuth();
	return isAuth && isAuthenticated ? <Outlet /> : <Navigate to='/' />;
};

export default CreatorProtectedRoute;
