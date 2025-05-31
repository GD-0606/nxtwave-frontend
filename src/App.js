import './App.css';
import styled from 'styled-components';
import HomePage from './pages/HomePage/homePage';
import Loader from './components/Loader/loader';

import useFetchLists from './hooks/useFetchLists';
import { Errorpage } from './pages/ErrorPage/errorPage';
const PageContainer = styled.div`
  padding: 24px;
  position: relative;
  min-height: 100vh;
`;
function App() {
  const { status, error, retry } = useFetchLists();

  if (status === 'loading') return <Loader />;
  if (status === 'failed') return <Errorpage message={error || 'Failed to load data'} onRetry={retry} />;
  return (
    <PageContainer>
      <HomePage />
    </PageContainer>
  );
}

export default App;
