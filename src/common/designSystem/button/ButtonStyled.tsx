/* eslint-disable no-nested-ternary */
import styled from 'styled-components';
import { StyledButtonProps } from 'common/designSystem/button/types';

export const ButtonStyled = styled.button<StyledButtonProps>`
  background: ${(p) => p.usage === 'primary' ? 'var(--default-interface-indigo-500)' : 'var(--default-interface-gray-100)'};
  color: ${(p) => p.usage === 'primary' ? 'var(--default-interface-white)' : 'var(--default-interface-navy-400)'};
  border: ${(p) => p.usage === 'primary' ? '2px solid var(--default-interface-indigo-400)' : '2px solid var(--default-interface-gray-700)'};
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-family: 'Inter', sans-serif;
`;
