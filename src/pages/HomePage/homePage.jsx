import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ButtonsContainer, ErrorMessage, Header, ListsGrid, PageTitle } from './styles';
import Button from '../../components/Button/button';
import { ListContainer } from '../../components/ListContainer/listContainer';
import { cancelListCreation, moveItem, startListCreation, toggleSelectList, updateListCreation } from '../../redux/features/listsSlice';

export default function HomePage() {
  const dispatch = useDispatch();
  const { lists, selectedLists, mode, tempLists } = useSelector((state) => state.lists);
  const [creationError, setCreationError] = useState('');
  const [error, setError] = useState('');
  const handleCreateList = () => {
    if (selectedLists.length !== 2) {
      setCreationError('You should select exactly 2 lists to create a new list');
      return;
    }
    setCreationError('');
    dispatch(startListCreation());
  };
  const handleMoveItem = (dir, itemId, index) => {
    const from = index;
    const to = dir === 'left' ? index - 1 : index + 1;
    if (to >= 0 && to <= 2)
      dispatch(
        moveItem({
          fromIndex: from,
          toIndex: to,
          itemId
        })
      );
  };
  const handleUpdateList = () => {
    if (tempLists[1].lists.length !== 0) {
      setError('Complete the operations in list3.To see updated list containers.');
      return;
    }
    setError('');
    dispatch(updateListCreation());
  };
  const handleCancelList = () => {
    setError('');
    dispatch(cancelListCreation());
  };

  useEffect(() => {
    if (tempLists.length > 0 && tempLists[1].lists.length !== 0) {
      setError('Complete the operations in list3.To see updated list containers.');
    } else {
      setError('');
    }
  }, [tempLists]);

  return (
    <React.Fragment>
      {' '}
      <Header>
        {mode === 'view' && (
          <React.Fragment>
            <PageTitle>List Creation</PageTitle>
            <Button primary onClick={handleCreateList}>
              Create a new list
            </Button>
          </React.Fragment>
        )}
      </Header>
      {creationError && <ErrorMessage>{creationError}</ErrorMessage>}
      <ListsGrid>
        {mode === 'view' ? (
          [1, 2].map((listNum) => {
            return (
              <ListContainer
                key={listNum}
                title={`List ${listNum}`}
                selectable
                items={lists.filter((item) => item.list_number === listNum)}
                selected={selectedLists.includes(listNum)}
                onSelect={() => dispatch(toggleSelectList(listNum))}
              />
            );
          })
        ) : (
          <React.Fragment>
            {tempLists.map((list, index) => (
              <ListContainer
                key={list.id}
                title={index === 1 ? 'List3' : `List${selectedLists[index === 0 ? 0 : 1]}`}
                items={list.lists}
                showArrows
                onMove={(dir, itemId) => {
                  handleMoveItem(dir, itemId, index);
                }}
              />
            ))}
          </React.Fragment>
        )}
      </ListsGrid>
      {mode === 'create' && error && <ErrorMessage>{error}</ErrorMessage>}
      {mode === 'create' && (
        <ButtonsContainer>
          <Button onClick={handleUpdateList}>Update</Button>
          <Button variant="secondary" onClick={handleCancelList}>
            Cancel
          </Button>
        </ButtonsContainer>
      )}
    </React.Fragment>
  );
}
