import Button from '../../components/Button/button';
import { Container, ErrorImage, ErrorText } from './styles';

export const Errorpage = ({ message, onRetry }) => {
  return (
    <Container>
      <ErrorImage src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png" alt="error" />
      <ErrorText>{message || 'Something went wrong. Please try again.'}</ErrorText>
      <Button onClick={onRetry}>Try Again</Button>
    </Container>
  );
};
