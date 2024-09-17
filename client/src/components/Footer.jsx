import React from 'react';
import { motion, useInView } from 'framer-motion';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

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

const ContentWrapper = styled(motion.div)`
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

const CenterSection = styled(motion.div)`
  font-size: 7vw;
  text-align: center;
  margin-top: auto;
  margin-bottom: auto;
`;

const ClickableCenterSection = styled(CenterSection)`
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #4CAF50;
  }
`;

const BottomSection = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  width: 100%;
  border-top: 1px solid white;
  padding-top: 20px;
`;

const AnimatedText = styled(motion.span)`
  display: inline-block;
`;

const AnimatedInput = styled(motion.div)`
  width: 250px;
`;

export default function Footer() {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/main');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <FooterContainer ref={ref}>
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
      <ContentWrapper
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <TopSection>
          <FooterLeft>
            {/* Add content here if needed */}
          </FooterLeft>
          <FooterRight>
            <motion.div variants={itemVariants}>
              <BoldParagraph>
                <AnimatedText>
                  Get industry insights and creative inspiration straight to your inbox.
                </AnimatedText>
              </BoldParagraph>
            </motion.div>
            <AnimatedInput
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <StyledInput type="email" placeholder="Email Address →" />
            </AnimatedInput>
          </FooterRight>
        </TopSection>
        <ClickableCenterSection 
          variants={itemVariants}
          onClick={handleClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Carbon Credit X-Change
        </ClickableCenterSection>
        <BottomSection variants={containerVariants}>
          <motion.span variants={itemVariants}>@Capstone2025</motion.span>
          <motion.span variants={itemVariants}>poddar.aditya24@gmail.com</motion.span>
          <motion.span variants={itemVariants}>Not All rights reserved</motion.span>
        </BottomSection>
      </ContentWrapper>
    </FooterContainer>
  );
}