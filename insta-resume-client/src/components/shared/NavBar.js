import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaFileAlt, FaHistory, FaSignOutAlt } from 'react-icons/fa';

const NavBar = ({ isAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <NavBarContainer>
      <LogoLink onClick={() => navigate('/')}>
        <Logo>InstaResume</Logo>
      </LogoLink>
      <NavLinks>
        {isAuthenticated ? (
          <>
            <NavLink to="/templates">
              <FaFileAlt />
              <span>Templates</span>
            </NavLink>
            <NavLink to="/history">
              <FaHistory />
              <span>History</span>
            </NavLink>
            <LogoutButton onClick={handleLogout}>
              <FaSignOutAlt />
              <span>Logout</span>
            </LogoutButton>
          </>
        ) : (
          <>
            <NavLink to="/login">Login</NavLink>
            <PrimaryButton to="/signup">Sign Up</PrimaryButton>
          </>
        )}
      </NavLinks>
    </NavBarContainer>
  );
};

const NavBarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
`;

const LogoLink = styled.div`
  cursor: pointer;
`;

const Logo = styled.h1`
  font-size: 1.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #6366f1, #4f46e5);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #4a5568;
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  
  svg {
    font-size: 1.1rem;
  }

  &:hover {
    color: #6366f1;
    background: rgba(99, 102, 241, 0.1);
  }
`;

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #4a5568;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border: none;
  background: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  svg {
    font-size: 1.1rem;
  }

  &:hover {
    color: #6366f1;
    background: rgba(99, 102, 241, 0.1);
  }
`;

const PrimaryButton = styled(Link)`
  background: linear-gradient(135deg, #6366f1, #4f46e5);
  color: white;
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  border-radius: 30px;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
  }
`;

export default NavBar; 