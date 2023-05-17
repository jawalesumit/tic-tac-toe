import { styled } from "styled-components";
import { Button, ButtonProps, Col, Row } from "antd";
import useBoard from "../hooks/useBoard";
import { useMemo } from "react";

const StyledRow = styled(Row)`
  text-align: center;
`;

type CustomButtonProps = {
  highlighted: boolean;
} & ButtonProps;
const CustomButton = ({ highlighted, ...rest }: CustomButtonProps) => (
  <Button {...rest} />
);
const StyledCell = styled(CustomButton)`
  height: 150px;
  width: 150px;
  font-size: 50px;
  border-radius: 10px;
  border-color: ${(props) =>
    props.highlighted ? "#52c41a" : "#d9d9d9"} !important;
`;

const Board = () => {
  const { pause, board, winningCells, onCellClick } = useBoard();
  const winningCellsByIndex = useMemo<Array<number>>(
    () =>
      winningCells.reduce<Array<number>>((acc, l) => {
        acc.push(l[0] * 3 + l[1]);
        return acc;
      }, []),
    [winningCells]
  );

  return (
    <StyledRow gutter={[16, 16]}>
      {board.flat().map((p, i) => (
        <Col key={`col-${i}`} span={8}>
          <StyledCell
            highlighted={winningCellsByIndex.includes(i)}
            disabled={pause || p !== ""}
            onClick={() => onCellClick(i)}
          >
            {p}
          </StyledCell>
        </Col>
      ))}
    </StyledRow>
  );
};

export default Board;
