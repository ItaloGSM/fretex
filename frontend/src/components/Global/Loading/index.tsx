import styled from 'styled-components';

interface ILoading {
  color?: string;
  width?: string;
  height?: string;
}

const Loading = ({ color, width, height }: ILoading): JSX.Element => {
  return (
    <LoadingStyled color={color} width={width} height={height}>
      <div></div>
      <div></div>
      <div></div>
    </LoadingStyled>
  );
};
const LoadingStyled = styled.div<ILoading>`
  display: inline-block;
  position: relative;
  width: ${({ width }) => width ?? '80px'};
  height: ${({ height }) => height ?? '80px'};

  div {
    display: inline-block;
    position: absolute;
    left: 8px;
    width: 16px;
    background: ${({ color }) => color ?? 'var(--theme-primary)'};
    animation: lds-facebook 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
  }
  div:nth-child(1) {
    left: 8px;
    animation-delay: -0.24s;
  }
  div:nth-child(2) {
    left: 32px;
    animation-delay: -0.12s;
  }
  div:nth-child(3) {
    left: 56px;
    animation-delay: 0;
  }
  @keyframes lds-facebook {
    0% {
      top: 8px;
      height: 64px;
    }
    100% {
      top: 24px;
      height: 32px;
    }
  }
`;

export default Loading;
