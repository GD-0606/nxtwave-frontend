import styled from 'styled-components';

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 24px;
`;

export const PageTitle = styled.h1`
  font-size: 24px;
  color: #334155;
`;

export const ListsGrid = styled.div`
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  justify-content: center;
`;

export const ErrorMessage = styled.p`
  color: #dc2626;
  margin-top: 8px;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  height: 70px;
  align-items: center;
`;
