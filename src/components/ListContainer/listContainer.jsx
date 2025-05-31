import React from "react";
import { Arrow, Checkbox, Container, ListItem, Title } from "./styles";

export function ListContainer({
  title,
  items,
  selectable = false,
  selected = false,
  onSelect,
  showArrows = false,
  onMove,
}) {
  return (
    <React.Fragment>
      {
        <Container>
          {selectable && (
            <Checkbox type="checkbox" checked={selected} onChange={onSelect} />
          )}
          <Title>
            {title}
            {showArrows && ` (${items.length})`}
          </Title>
          {items.length === 0
            ? null
            : items.map((item) => (
                <ListItem key={item.id}>
                  <h5>{item.name}</h5>
                  <span style={{ fontSize: "13px" }}>{item.description}</span>
                  {showArrows && onMove && item.side === "right" && (
                    <Arrow onClick={() => onMove("right", item.id)}>
                      &rarr;
                    </Arrow>
                  )}
                  {showArrows && onMove && item.side === "left" && (
                    <Arrow onClick={() => onMove("left", item.id)}>
                      &larr;
                    </Arrow>
                  )}
                </ListItem>
              ))}
        </Container>
      }
    </React.Fragment>
  );
}
