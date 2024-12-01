import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const HistoryPage = () => {
  const navigate = useNavigate();

  return (
    <PageContainer>
      <NavBar>
        <LogoLink to="/">
          <Logo>InstaResume</Logo>
        </LogoLink>
        <NavLinks>
          <NavLink to="/templates">Templates</NavLink>
          <NavLink to="/history">History</NavLink>
          <LogoutButton onClick={() => {
            localStorage.removeItem('token');
            navigate('/login');
          }}>
            Logout
          </LogoutButton>
        </NavLinks>
      </NavBar>

      <ContentSection>
        <HeaderSection>
          <BackButton onClick={() => navigate('/')}>
            ← Back to Home
          </BackButton>
          <Title>Resume History</Title>
          <CreateNewButton
            as={motion.button}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/templates')}
          >
            Create New Resume
          </CreateNewButton>
        </HeaderSection>

        {/* Empty state */}
        <EmptyState>
          <EmptyIcon>📄</EmptyIcon>
          <EmptyText>No resumes found</EmptyText>
          <EmptyDescription>
            Start creating your professional resume today!
          </EmptyDescription>
          <CreateNewButton
            as={motion.button}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/templates')}
          >
            Create New Resume
          </CreateNewButton>
        </EmptyState>
      </ContentSection>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  min-height: 100vh;
  background: #f8fafc;
`;

const NavBar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const LogoLink = styled(Link)`
  text-decoration: none;
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
  color: #4a5568;
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  
  &:hover {
    color: #6366f1;
    background: rgba(99, 102, 241, 0.1);
  }
`;

const LogoutButton = styled.button`
  color: #4a5568;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border: none;
  background: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    color: #6366f1;
    background: rgba(99, 102, 241, 0.1);
  }
`;

const ContentSection = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 2rem;
`;

const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const BackButton = styled.button`
  color: #6366f1;
  background: none;
  border: none;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(99, 102, 241, 0.1);
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0;
`;

const CreateNewButton = styled.button`
  background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 30px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(99, 102, 241, 0.2);

  &:hover {
    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  margin-top: 2rem;
`;

const EmptyIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
`;

const EmptyText = styled.h2`
  font-size: 1.5rem;
  color: #4a5568;
  margin-bottom: 0.5rem;
`;

const EmptyDescription = styled.p`
  color: #718096;
  margin-bottom: 2rem;
`;

const ResumeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

export default HistoryPage; 