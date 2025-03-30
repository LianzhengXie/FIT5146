import { useEffect } from 'react'
import { JWT_TOKEN } from "../../constants";
import Loading from '../../components/loading'
import { useNavigate, useParams } from 'react-router-dom'
import NotFound from '../Error/NotFound'
import { API_URL } from '../../constants';

const LoginWithId = () => {
    // Get patient_id from query parameter
    const { patient_id } = useParams()
    const navigate = useNavigate();

    useEffect(() => {
        if (!patient_id) {
            return <NotFound />
        }
        let body = {
            patient_id,
        }
        let ENDPOINT = API_URL + '/login-with-id';
        fetch(ENDPOINT, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        })
            .then(response => {
                if (!response.ok) {
                    return <NotFound />
                }
                return response.json()
            })
            .then(result => {
                const data = result.data;
                localStorage.setItem(JWT_TOKEN, data.token);
                navigate("/home", { replace: true });
            })
    }, [])

    return (
        <>
            <Loading />
        </>
    )
}

export default LoginWithId
