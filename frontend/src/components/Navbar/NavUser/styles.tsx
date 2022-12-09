import styled from "styled-components";
import { IActive } from "../../../interfaces/styledComponents";

export const Container = styled.button<IActive>`
  display: flex;
  align-items: center;
  background-color: ${(props) => (props.active ? "#3f3f3f" : "#444444")};
  border: none;
  padding: 8px;
  border-radius: ${(props) => (props.active ? "6px 6px 0px 0px" : "6px")};
  cursor: pointer;
  gap: 7px;
  position: relative;
  z-index: 999;
  transition: 0.5s;

  &:hover {
    background-color: #3f3f3f;
  }

  .perfil {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    object-fit: cover;
  }

  .seta {
    width: 10px;
    transition: 0.2s;
    transform: ${(props) => (props.active ? "rotate(0deg)" : "rotate(180deg)")};
  }

  p {
    color: var(--text-light);
  }

  @media (max-width: 768px) {
    & {
      margin-bottom: 10px;
    }
  }
`;

export const Content = styled.div<IActive>`
  background-color: #444444;
  position: absolute;
  width: 100%;
  display: ${(props) => (props.active ? "block" : "none")};
  top: 100%;
  right: 0;
  border-radius: 0px 0px 6px 6px;
  overflow: hidden;
  z-index: 998;

  @media (max-width: 768px) {
    padding: 0 !important;
  }

  .links {
    transition: 0.5s;
    display: ${(props) => (props.active ? "block" : "none")};
    width: 100%;
    color: var(--text-light);
    border: none;
    cursor: pointer;
    text-align: right;
    padding: 5px;
    background-color: #444444;

    &:hover {
      background-color: #3f3f3f;
    }
    @media (max-width: 768px) {
      margin: 0 !important;
    }
  }
`;
