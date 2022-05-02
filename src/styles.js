import styled from 'styled-components';
import { lighten } from 'polished';

export const Container = styled.div``;

export const InputBasic = styled.input`
  background-color: #ecebf1;
  border-radius: 0.25rem;
  border-color: #9ca3af;
  padding-left: 5px;
  height: 45px;
  width: ${({ width }) => width || '100%'};
  text-align: center;
  outline: 2px solid transparent;
  outline-offset: 2px;
  border: none;
  font-weight: 600;
  color: ${({ color }) => color};

  &::placeholder {
    color: ${({ color }) => lighten(0.2, color)};
  }
`;

export const InputBox = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.375rem;
  color: #d3d3d3;
`;

export const InputContainer = styled.div`
  display: flex;
  width: ${(props) => props.width || '100%'};
  background-color: #ecebf1;
  border-radius: 0.25rem;
`;

export const InputTitle = styled.span`
  display: flex;
  align-items: center;
  font-size: 12px;
  line-height: 14px;
  letter-spacing: -0.085em;
  margin-bottom: ${(props) => props.marginBottom || '4px'}
  color: #525252;
`;
