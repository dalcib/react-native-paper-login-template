import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import { H1, P } from '@expo/html-elements';

import MarkdownComponent from './example.md';

export function MDXComp() {
  return (
    <MDXProvider components={{ h1: H1, p: P }}>
      <div>
        <h1>
          Hello, world rendered by <code>React</code>!
        </h1>
        <MarkdownComponent />
      </div>
    </MDXProvider>
  );
}
