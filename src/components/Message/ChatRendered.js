import React from 'react';
import { Message } from './Message';
import { ImageMessage } from './ImageMessage';

export const ChatRendered = (row) => {
  const { index, item } = row;
  if (item.type === 'image') return <ImageMessage {...item} />;
  return <Message {...item} />;
};
