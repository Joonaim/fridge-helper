const { createContext, useState, useEffect, useContext } = require('react')

const UserContextHandler = createContext()

export const useUserContext = () => {
    return useContext(UserContextHandler)
}

const UserContext = ({ children }) => {
    const [user, setUser] = useState({ authenticated: null });

    useEffect(() => {

            fetch(process.env.REACT_APP_BACKEND_URL + "/auth/login", {
                credentials: 'include'
            }).catch(err => {
                setUser({ authenticated: false })
                return
            }).then(result => {
                if (!result || !result.ok || result.status >= 400) {
                    setUser({ authenticated: false })
                    return
                }
                return result.json()
            }).then(data => {
                if (!data) {
                    setUser({ authenticated: false })
                    return
                }
                setUser({ ...data });
            })

    }, [])

    return (
        <UserContextHandler.Provider value={{ user, setUser }}>
            {children}
        </UserContextHandler.Provider>
    )
}

export default UserContext;