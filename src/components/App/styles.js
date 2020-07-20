import styled from 'styled-components';

export const CardContainer = styled.section`
  width: 100%;
  max-width: 1180px;
  margin-top: 20px;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 32px;
`;

export const Card = styled.div`
  background: ${({ total }) => (total ? '#FF872C' : '#fff')};
  padding: 22px 32px;
  border-radius: 5px;
  color: ${({ total }) => (total ? '#fff' : '#363F5F')};

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    p {
      font-size: 16px;
    }
  }

  h1 {
    margin-top: 14px;
    font-size: 36px;
    font-weight: normal;
    line-height: 54px;
  }
`;

export const TableContainer = styled.section`
  margin-top: 20px;
  width: 100%;

  display: flex;
  justify-content: center;
  align-self: flex-start;

  table {
    width: 100%;
    max-width: 1180px;
    border-spacing: 0 8px;

    thead {
      background: #5636D3;
    }

    th {
      color: #fff;
      font-weight: bold;
      padding: 20px 32px;
      font-size: 16px;
      line-height: 24px;
    }

    tbody {
      tr {
        cursor: pointer;
        transition: transform .4s;

        &:hover {
          transform: scale(1.01);
        }

        &.selected {
          td {
            border-color: #5636D3;
          }
        }
      }

      td {
        padding: 20px 32px;
        border: 0;
        background: #fff;
        font-size: 16px;
        font-weight: normal;
        color: #969cb3;
        text-align: center;
        text-transform: capitalize;
        border: 2px solid #fff;

        &.title {
          color: #363f5f;
          font-weight: bold;
        }

        &.income {
          color: #12a454;
        }

        &.outcome {
          color: #e83f5b;
        }

        &:first-child {
          border-right: 0;
        }

        &:nth-child(2) {
          border-left: 0;
          border-right: 0;
        }

        &:nth-child(3) {
          border-left: 0;
          border-right: 0;
        }

        &:last-child {
          border-left: 0;
        }
      }
    }
  }
`;

export const InputContainer = styled.section`
  position: fixed;
  bottom: 0;
  width: 100%;
  background: #fff;
  padding: 1rem 4rem;

  display: flex;

  input {
    width: 100%;
    border: 0;
    background: #F0F2F5;
    border-radius: 5px;
    padding: 12px;
    margin: 0 10px;
  }

  button {
    width: 100%;
    margin: 0 5px;
    border: 0;
    font-size: 1rem;
    font-weight: bold;
    color: #fff;

    display: flex;
    justify-content: center;
    align-items: center;

    svg {
      margin-left: 8px;
    }

    &.deposit {
      background: #12A454;
    }

    &.withdraw {
      background: #E83F5B;
    }

    &.delete {
      background: #c4c4c4;
    }

    &.delete.hide {
      display: none;
    }
  }
`;
