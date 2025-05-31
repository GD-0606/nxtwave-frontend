import './App.css';
import HomePage from './pages/HomePage/homePage';
import Loader from './components/Loader/loader';
import useFetchLists from './hooks/useFetchLists';
import { Errorpage } from './pages/ErrorPage/errorPage';
import { PageContainer } from './pages/HomePage/styles';

function App() {
  const { status, error, retry } = useFetchLists();
  switch (status) {
    case 'loading':
      return <Loader />;
    case 'failed':
      return <Errorpage message={error || 'Failed to load data'} onRetry={retry} />;
    case 'succeeded':
      return (
        <PageContainer>
          <HomePage />
        </PageContainer>
      );
    default:
      return null;
  }
}

export default App;
