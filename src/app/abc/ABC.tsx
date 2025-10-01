"use client";

import { useCallback, useRef, useState } from "react";
import {
  Container,
  Card,
  CardGroup,
  Col,
  CardProps,
  Button,
  Row,
  Alert,
} from "react-bootstrap";

import TaskLayout from "@/components/Layout/TaskLayout";
import sortWordsByHungarianAlphabet from "@/components/utils/sortBy";

import styles from "./ABC.module.css";

interface DraggableWrapperProps extends CardProps {
  isActive?: boolean;
}

const DraggableWrapper = (props: DraggableWrapperProps) => {
  const { isActive, ...restProps } = props;
  const background = isActive ? "secondary" : "light";

  return (
    <Card
      {...restProps}
      className={styles.draggableCardWrapper}
      bg={background}
      style={props.style}
    >
      {props.children}
    </Card>
  );
};

interface DraggableCardProps extends CardProps {
  text: string;
}

const DraggableCard = (props: DraggableCardProps) => {
  return (
    <Card
      {...props}
      border="secondary"
      text="primary"
      bg="light"
      className={`${styles.draggableCard} m-2 p-0`}
      draggable
    >
      <Card.Body className="m-2 p-0">{props.children}</Card.Body>
    </Card>
  );
};

interface DragableCardListProps {
  items: string[];
  onChange?: (sortedItems: string[]) => void;
  direction: "column" | "row";
}

const DragableCardList = (props: DragableCardListProps) => {
  const { direction, items } = props;
  const [sortedItems, setSortedItems] = useState(items);
  const [selectedWrapperIndex, setSelectedWrapperIndex] = useState<
    number | null
  >(null);

  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(
    null
  );

  const onDragStart = (index: number) => {
    setSelectedCardIndex(index);
  };

  const createNewItems = () => {
    if (
      selectedCardIndex === null ||
      selectedWrapperIndex === null ||
      selectedCardIndex === selectedWrapperIndex
    ) {
      return null;
    }
    const newItems = [...sortedItems];
    const item = newItems[selectedCardIndex];
    newItems.splice(selectedCardIndex, 1);
    newItems.splice(selectedWrapperIndex, 0, item);

    return newItems;
  };

  const onDragEnd = () => {
    const newItems = createNewItems();
    if (newItems) {
      props.onChange?.(newItems);
      setSortedItems(newItems);
    }

    setSelectedWrapperIndex(null);
    setSelectedCardIndex(null);
  };

  const onDragEnter = (wrapperIndex: number) => {
    setSelectedWrapperIndex(wrapperIndex);
  };

  const flexDirection = direction === "row" ? "flex-row" : "flex-column";

  return (
    <CardGroup className={`justify-content-center`}>
      <Col className={`d-flex flex-wrap align-content-center ${flexDirection}`}>
        {sortedItems.map((item, index) => (
          <DraggableWrapper
            key={item}
            isActive={selectedWrapperIndex === index}
            onDragEnter={() => {
              onDragEnter(index);
            }}
            style={{
              minWidth: direction === "column" ? "480px" : "auto",
            }}
          >
            <DraggableCard
              text={item}
              onDragStart={() => onDragStart(index)}
              onDragEnd={onDragEnd}
            >
              {item}
            </DraggableCard>
          </DraggableWrapper>
        ))}
      </Col>
    </CardGroup>
  );
};

export interface AbcProps {
  randomWords: string[];
}

export const Abc = (props: AbcProps) => {
  const randomWords = useRef<string[]>(props.randomWords || []);
  const expectedResult = sortWordsByHungarianAlphabet([...randomWords.current]);
  const [sortedItems, setSortedItems] = useState(randomWords.current);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);

  const onChange = useCallback((newItems: string[]) => {
    setSortedItems(newItems);
  }, []);

  const onSubmit = () => {
    const isCorrect =
      sortedItems.every((item, index) => item === expectedResult[index]) &&
      sortedItems.length === expectedResult.length;

    setIsCorrect(isCorrect);
    setIsCompleted(true);
  };

  const abc = (
    <Container fluid>
      <Container className="mt-4">
        <DragableCardList
          direction="row"
          items={randomWords.current}
          onChange={onChange}
        />
      </Container>
      <Container>
        <div className="row mt-3">
          <Col>
            <Button
              type="submit"
              variant="primary"
              size="lg"
              onClick={onSubmit}
            >
              OK
            </Button>
          </Col>
        </div>
      </Container>
    </Container>
  );

  return (
    <TaskLayout title="ABC" isStarted={true}>
      <>
        {abc}

        {isCompleted && (
          <Row className="align-items-center justify-content-center mt-4">
            <Col className="col">
              <Alert variant={isCorrect ? "success" : "danger"}>
                {expectedResult.join(", ")}
              </Alert>
            </Col>
          </Row>
        )}
      </>
    </TaskLayout>
  );
};

export default Abc;
