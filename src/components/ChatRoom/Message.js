import { Avatar, Typography } from "antd";
import { formatRelative } from "date-fns";
import React from "react";
import styled from "styled-components";

const WrapperStyled = styled.div`
  margin-bottom: 10px;

  .author {
    margin-left: 5px;
    font-weight: boid;
  }

  .date {
    margin-left: 10px;
    font-size: 11px;
    color: #a7af7a;
  }

  .content {
    margin-left: 30px;
  }
`;

function formatDate(seconds) {
  let formatDate = "";

  if (seconds) {
    formatDate = formatRelative(new Date(seconds * 1000), new Date());

    formatDate = formatDate.charAt(0).toUpperCase() + formatDate.slice(1);
  }
  return formatDate;
}
export default function Message({ text, displayName, createAt, photoURL }) {
  return (
    <WrapperStyled>
      <div>
        <Avatar size={"small"} src={photoURL}>
          {photoURL ? "" : displayName.charAt(0)?.toUpperCase()}
        </Avatar>
        <Typography.Text className="author">{displayName}</Typography.Text>
        <Typography.Text className="date">
          {formatDate(createAt?.seconds)}
        </Typography.Text>
      </div>
      <div className="content">{text}</div>
    </WrapperStyled>
  );
}
