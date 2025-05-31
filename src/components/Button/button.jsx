import { StyledButton, StyledOutlineButton } from './styles';

const Button = ({ children, onClick, variant = 'primary' }) => {
  return (
    <>
      {variant === 'primary' ? (
        <StyledButton type="button" onClick={onClick}>
          {children}
        </StyledButton>
      ) : (
        <StyledOutlineButton type="button" onClick={onClick}>
          {children}
        </StyledOutlineButton>
      )}
    </>
  );
};

export default Button;
