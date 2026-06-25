import React from 'react';
import { Link, useNavigate } from 'react-router';
import '../style/navbar.scss';
import { useAuth } from '../features/auth/hooks/useAuth';

const Navbar = () => {
    const { handleLogout } = useAuth();
    const navigate = useNavigate();

    const onLogoutClick = async () => {
        await handleLogout();
        navigate('/login');
    }

    return (
        <nav className="navbar">
            <div className="navbar__left">
                <Link to="/" className="navbar__logo">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                    <span>Home</span>
                </Link>
            </div>
            <div className="navbar__middle">
                <span className="navbar__title">
                    Prep<span className="highlight">Builder</span>
                </span>
            </div>
            <div className="navbar__right">
                <Link to="/profile" className="navbar__icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                    <span>Profile</span>
                </Link>
                <button onClick={onLogoutClick} className="navbar__icon logout-btn" title="Logout">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
