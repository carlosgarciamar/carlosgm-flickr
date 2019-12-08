/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { create } from 'react-test-renderer';

import ImageDisplay from '.';

describe('<ImageDisplay />', () => {
  const props = {
    title: 'Photo title',
    author: 'author',
    photoUrl: 'http://www.example.com/photo-url',
    authorUrl: 'http://www.example.com/author-url',
    description: 'Lorem ipsum',
    tags: 'tag1 tag2',
  };

  it('should contain an image with the photoUrl as src', () => {
    const { root } = create(<ImageDisplay {...props} />);
    const { src } = root.findByType('img').props;
    expect(src).toEqual(props.photoUrl);
  });

  it('should contain a link to photoUrl with title as text', () => {
    const { root } = create(<ImageDisplay {...props} />);
    const { href, children } = root.findAllByType('a')[0].props;
    expect(href).toBe(props.photoUrl);
    expect(children).toBe(props.title);
  });

  it('should contain a link to authorUrl with author as text', () => {
    const { root } = create(<ImageDisplay {...props} />);
    const { href, children } = root.findAllByType('a')[1].props;
    expect(href).toBe(props.authorUrl);
    expect(children).toBe(props.author);
  });

  it('should match its snapshot', () => {
    const json = create(<ImageDisplay {...props} />).toJSON();
    expect(json).toMatchSnapshot();
  });
});
