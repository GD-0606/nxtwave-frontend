import "./App.css";
import styled from "styled-components";
import HomePage from "./pages/HomePage/homePage";
import { useDispatch } from "react-redux";
import { getLists } from "./redux/features/listsSlice";
import Loader from "./components/Loader/loader";

import useFetchLists from "./hooks/useFetchLists";
import { Errorpage } from "./pages/ErrorPage/errorPage";
const PageContainer = styled.div`
  padding: 24px;
  border: 1px solid red;
  position: relative;
  min-height: 100vh;
`;
function App() {
  const {
    lists,
    selectedLists,
    status,
    error,
    isCreating,
    newListTitle,
    retry,
  } = useFetchLists();

  if (status === "loading") return <Loader />;
  if (status === "failed")
    return (
      <Errorpage message={error || "Failed to load data"} onRetry={retry} />
    );
  return (
    <PageContainer>
      <HomePage />
    </PageContainer>
  );
}

export default App;
