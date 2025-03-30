export const APP_NAME_TITLE = 'Lifestyle Medicine'
export const JWT_TOKEN = 'token'

export const DOMAIN_API_URL = import.meta.env.VITE_DOMAIN_API_URL
export const API_URL = DOMAIN_API_URL + '/api'

export const getJwt = () => {
    return localStorage.getItem(JWT_TOKEN)
}

export const getOptions = (withAuth = true) => {
    const options = {
        method: 'GET',
    }
    if (withAuth) {
        const jwt = localStorage.getItem(JWT_TOKEN);
        if (jwt) {
            options['headers'] = { 'Authorization': `Bearer ${jwt}` }
        }
    }
    return options
}

export const reqOptions = (body, method = 'POST', withAuth = true) => {
    const options = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(body)
    }
    if (withAuth) {
        const jwt = localStorage.getItem(JWT_TOKEN);
        if (jwt) {
            options.headers['Authorization'] = `Bearer ${jwt}`
        }
    }
    return options
}
export const postOptions = (body, withAuth = true) => {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(body)
    }
    if (withAuth) {
        const jwt = localStorage.getItem(JWT_TOKEN);
        if (jwt) {
            options.headers['Authorization'] = `Bearer ${jwt}`
        }
    }
    return options
}
export const deleteOptions = (body, withAuth = true) => {
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(body)
    }
    if (withAuth) {
        const jwt = localStorage.getItem(JWT_TOKEN);
        if (jwt) {
            options.headers['Authorization'] = `Bearer ${jwt}`
        }
    }
    return options
}
export const putOptions = (body, withAuth = true) => {
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(body)
    }
    if (withAuth) {
        const jwt = localStorage.getItem(JWT_TOKEN);
        if (jwt) {
            options.headers['Authorization'] = `Bearer ${jwt}`
        }
    }
    return options
}