import { useState, useContext, useEffect } from 'react';
import { store } from '../components/context/GlobalProvider';
import styled from 'styled-components';
import { AnimatePresence } from 'framer-motion';
import stopBodyScrolling from '../utils/stopBodyScrolling';
import BudgetGroup from '../components/BudgetGroup';
import { Plus } from '../components/icons';
import Modal from '../components/Modal';
import AddItemForm from '../components/AddItemForm';
import AddButton from '../components/styles/AddButton';

const BudgetSection = () => {
  const [toggle, setToggle] = useState(false);
  const toggleModal = () => {
    setToggle(!toggle);
  };
  const { state } = useContext(store);
  const income = state.items.filter((item) => item.type === 'income');
  const expenses = state.items.filter((item) => item.type === 'expense');
  useEffect(() => {
    stopBodyScrolling(toggle);
  });
  return (
    <>
      <AnimatePresence>
        {toggle && (
          <Modal toggle={toggle}>
            <AddItemForm cancel={toggleModal} />
          </Modal>
        )}
      </AnimatePresence>

      <BudgetContainer>
        <BudgetHeader>
          <BudgetTitle>{state.name}'s Budget</BudgetTitle>
          <MainAddButton onClick={toggleModal}>
            <Plus />
            Add New Item
          </MainAddButton>
        </BudgetHeader>
        <InsetContainer>
          <BudgetGroup type="Income" items={income} />
          <Divider />
          <BudgetGroup type="Expenses" items={expenses} />
        </InsetContainer>
      </BudgetContainer>
    </>
  );
};

export default BudgetSection;

const BudgetContainer = styled.div`
  margin: 0 auto;
  max-width: 800px;
`;

const BudgetHeader = styled.div`
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 500px) {
    flex-direction: column;
    justify-content: center;
  }
`;

const BudgetTitle = styled.h2`
  font-weight: 400;
  color: ${(props) => props.theme.colors.gray700};
`;

const InsetContainer = styled.div`
  background: ${(props) => props.theme.colors.gray100};
  box-shadow: inset 0px 2px 4px rgba(0, 0, 0, 0.06);
  border-radius: 5px;
  max-width: 800px;
  min-height: 70vh;
  /* overflow-y: scroll; */
  margin: 0 auto;
  padding: 2rem;
  @media screen and (max-width: 800px) {
    padding: 2rem 1rem;
  }
`;

const Divider = styled.div`
  border-bottom: 0.5px solid black;
  opacity: 0.1;
  width: 100%;
  height: 1px;
  margin: 2rem 0;
`;

const MainAddButton = styled(AddButton)`
  @media (max-width: 500px) {
    margin: 1rem 2rem;
    justify-content: center;
    width: 100%;
  }
`;
