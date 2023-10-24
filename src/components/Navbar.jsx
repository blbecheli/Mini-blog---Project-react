import { NavLink } from "react-router-dom"

import styles from "./Navbar.module.css"

import { useAuthentication } from "../hooks/useAuthentication"

import { useAuthValue } from "../context/AuthContext"

const Navbar = () => {
    const { user } = useAuthValue()
    const { logout } = useAuthentication()

    return (
        <nav className={styles.navbar}>
            <NavLink to="/" className={styles.brand}>
                Mini <span>Blog</span>
            </NavLink>
            <ul className={styles.links_list}>
                <li>
                    <NavLink className={({ isActive }) => (isActive ? styles.active : "")} to="/">
                        Home
                    </NavLink>
                </li>
                {!user && (
                    <>
                        <li>
                            <NavLink className={({ isActive }) => (isActive ? styles.active : "")} to="/login">
                                Login
                            </NavLink>
                        </li>
                        <li>
                            <NavLink className={({ isActive }) => (isActive ? styles.active : "")} to="/register">
                                Register
                            </NavLink>
                        </li>
                    </>
                )}
                {user && (
                    <>
                        <li>
                            <NavLink className={({ isActive }) => (isActive ? styles.active : "")} to="/post/create">
                                New Post
                            </NavLink>
                        </li>
                        <li>
                            <NavLink className={({ isActive }) => (isActive ? styles.active : "")} to="/dashboard">
                                Dashboard
                            </NavLink>
                        </li>
                    </>
                )}
                <li>
                    <NavLink className={({ isActive }) => (isActive ? styles.active : "")} to="/about">
                        About
                    </NavLink>
                </li>
                {user && (
                    <li>
                        <button onClick={logout}>Sair</button>
                    </li>
                )}

            </ul>
        </nav>
    )
}

export default Navbar