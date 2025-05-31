import styled from 'styled-components';

export const Container = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 15px;
  background-color: #eff6ff;
  height: 500px;
  width: 350px;
  overflow-y: scroll;
  /* Media queries */
  @media (max-width: 1280px) {
    width: 300px;
    height: 400px;
  }
`;

export const Title = styled.h2`
  font-size: 20px;
  margin-left: 10px;
  display: inline;
`;

export const ListItem = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 20px 8px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin: 10px 0px;
`;

export const Arrow = styled.div`
  cursor: pointer;
  text-align: end;
  margin: 0 5px;
`;

export const Checkbox = styled.input`
  margin-bottom: 10px;
`;
