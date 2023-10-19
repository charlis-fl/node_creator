import styled from 'styled-components';

export const LoaderLayout = styled.div<{width: string, height: string}>`
  position: fixed;   
  left: 50%;
  top:50%;
  transform: translate(-50%, -50%); 
  .render-loader {
    width: ${({ width }) => width};
    height: ${({ height }) => height};
  }
`;
