import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  width: 100%;
  height: 100vh;
  display: flex;
  position: relative;
  overflow: hidden;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: #000000;
  color: white;
  padding: 5vh 5vw;
`;

const AnimatedShape = styled(motion.div)`
  position: absolute;
  width: 30vw;
  height: 60vw;
  background-image: linear-gradient(to top, #4CAF50, #2196F3);
  filter: blur(40px);
  z-index: 1;
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const FooterLeft = styled.div`
  display: flex;
  flex-direction: column;
`;

const FooterRight = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  font-size: 20px;
  font-weight: 500;
`;

const BoldParagraph = styled.p`
  font-weight: 700;
  margin: 0;
`;

const StyledInput = styled.input`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 4px;
  color: white;
  padding: 12px 15px;
  width: 250px;
  font-size: 16px;
  transition: all 0.3s ease;

  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }

  &:focus {
    outline: none;
    background: rgba(255, 255, 255, 0.2);
    border-color: white;
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
  }
`;

const CenterSection = styled.div`
  font-size: 10vw;
  text-align: center;
  margin-top: auto;
  margin-bottom: auto;
`;

const BottomSection = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  border-top: 1px solid white;
  padding-top: 20px;
`;

const LogoStyle = {
  fontFamily: "'Montserrat', sans-serif",
  fontSize: '2rem',
  fontWeight: 'bold',
  background: 'linear-gradient(45deg, #4CAF50, #2196F3)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  padding: '0.5rem 1rem',
  border: '3px solid #4CAF50',
  borderRadius: '8px',
  textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
  letterSpacing: '1px',
  display: 'inline-block',
  whiteSpace: 'nowrap',
  width: 'fit-content',
  marginBottom: '1rem',
};

export default function Footer() {
  return (
    <FooterContainer>
      <AnimatedShape
        initial={{ top: '-68%', left: '-7%', rotate: 60, borderRadius: '0%' }}
        animate={{ 
          top: '-10%', 
          left: '10%', 
          rotate: 0, 
          borderRadius: '50%',
          width: '30vw',
          height: '30vw'
        }}
        transition={{ 
          duration: 5,
          repeat: Infinity,
          repeatType: 'reverse'
        }}
      />
      <AnimatedShape
        initial={{ top: '-68%', right: '6%', rotate: 297, borderRadius: '0%' }}
        animate={{ 
          rotate: 280,
          scaleY: 1.5,
          borderRadius: '30%'
        }}
        transition={{ 
          duration: 3,
          repeat: Infinity,
          repeatType: 'reverse'
        }}
        style={{ right: '6%' }}
      />
      <ContentWrapper>
        <TopSection>
          <FooterLeft>
            {/* g */}
          </FooterLeft>
          <FooterRight>
            <BoldParagraph>
              Get industry insights and creative inspiration straight to your inbox.
            </BoldParagraph>
            <StyledInput type="email" placeholder="Email Address →" />
          </FooterRight>
        </TopSection>
        <CenterSection>
          Carbon Credit X-Change
        </CenterSection>
        <BottomSection>
          <span>@Capstone2025</span>
          <span>poddar.aditya24@gmail.com</span>
          <span>Not All rights reserved</span>
        </BottomSection>
      </ContentWrapper>
    </FooterContainer>
  );
}