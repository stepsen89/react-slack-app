import React from 'react';
import moment from 'moment';
import { Comment } from 'semantic-ui-react';

const isOwnMessage = (message, user) => message.user.id === user.uid ? 'message__self' : '';

const timeFromNow = timeStamp => {
  console.log(moment(timeStamp));
  return moment(timeStamp).fromNow()
};

const Message = ({ message, user }) => (
  <Comment>
    <Comment.Avatar src={message.user.avatar} />
    <Comment.Content className={isOwnMessage(message, user)}>
      <Comment.Author as="a">{message.user.name}</Comment.Author>
      <Comment.Metadata> {timeFromNow(message.timeStamp)}</Comment.Metadata>
      <Comment.Text>{message.content}</Comment.Text>
    </Comment.Content>

  </Comment>
);

export default Message;