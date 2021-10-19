import styled, { createGlobalStyle } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const bgVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};

const modalVariants = {
  hidden: { opacity: 0, y: 100, transition: { duration: 0.2 } },
  visible: { opacity: 1, y: 0, transition: { duration: 0.2 } }
};

const Modal = props => {
  return (
    <>
      <motion.div initial="hidden" animate="visible" exit="hidden">
        <ModalBackground key="bg" variants={bgVariants}>
          <ModalCard key="modal" variants={modalVariants}>
            {props.children}
          </ModalCard>
        </ModalBackground>
      </motion.div>
      <OverflowHidden />
    </>
  );
};

export default Modal;

const ModalBackground = styled(motion.div)`
  position: fixed;
  overflow: auto;
  overflow-y: scroll;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: ${props => props.theme.colors.gray700};
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 5;
`;
const ModalCard = styled(motion.div)`
  background: white;
  border-radius: 5px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
  margin: auto;
  padding: 20px;
  max-width: 700px;
  min-height: 70vh;
  width: 100%;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media screen and (max-width: 500px) {
    position: absolute;
    top: 0;
    min-height: 100vh;
    border-radius: 0px;
  }
`;

const OverflowHidden = createGlobalStyle`
  body {
    height: 100vh;
    overflow-y: hidden;
  }
`;
