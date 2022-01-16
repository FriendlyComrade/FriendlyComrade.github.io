import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import { RootState } from '../../redux/store/store';

type Props = {
    redirectPath: string,
    component: JSX.Element
}

const PrivateRoute = ({redirectPath, component}: Props): JSX.Element => {
    const userEmail = useSelector((state: RootState) => state.userSlice.email)
    const isLogIn = Boolean(userEmail)

    if (isLogIn) {
        return component;
    }

    return <Navigate to={redirectPath}/>
};

export default PrivateRoute;