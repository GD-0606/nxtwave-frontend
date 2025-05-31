import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ButtonsContainer,
  ErrorMessage,
  Header,
  ListsGrid,
  PageTitle,
} from "./styles";
import Button from "../../components/Button/button";
import { ListContainer } from "../../components/ListContainer/listContainer";
import {
  cancelListCreation,
  moveItem,
  startListCreation,
  toggleSelectList,
  updateListCreation,
} from "../../redux/features/listsSlice";

export default function HomePage() {
  const dispatch = useDispatch();
  const {
    lists,
    selectedLists,
    status,
    error,
    isCreating,
    newListTitle,
    mode,
    tempLists,
  } = useSelector((state) => state.lists);
  const [creationError, setCreationError] = useState("");
  const handleCreateList = () => {
    if (selectedLists.length !== 2) {
      setCreationError(
        "You should select exactly 2 lists to create a new list"
      );
      return;
    }
    setCreationError("");
    dispatch(startListCreation());
  };

  return (
    <>
      {" "}
      <Header>
        {mode === "view" && (
          <>
            <PageTitle>List Creation</PageTitle>
            <Button primary onClick={handleCreateList}>
              Create a new list
            </Button>
          </>
        )}
      </Header>
      {creationError && <ErrorMessage>{creationError}</ErrorMessage>}
      <ListsGrid>
        {mode === "view" ? (
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
          <>
            {tempLists.map((list, index) => (
              <ListContainer
                key={list.id}
                title={
                  index === 1
                    ? "List3"
                    : `List${selectedLists[index === 0 ? 0 : 1]}`
                }
                items={list.lists}
                showArrows
                onMove={(dir, itemId) => {
                  const from = index;
                  const to = dir === "left" ? index - 1 : index + 1;
                  if (to >= 0 && to <= 2)
                    dispatch(
                      moveItem({
                        fromIndex: from,
                        toIndex: to,
                        itemId,
                      })
                    );
                }}
              />
            ))}
          </>
        )}
      </ListsGrid>
      {mode === "create" && (
        <ButtonsContainer>
          <Button
            onClick={() => {
              dispatch(updateListCreation());
            }}
          >
            Update
          </Button>
          <Button
            onClick={() => {
              dispatch(cancelListCreation());
            }}
          >
            Cancel
          </Button>
        </ButtonsContainer>
      )}
    </>
  );
}
