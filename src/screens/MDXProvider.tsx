import React from 'react'
import { MDXProvider } from '@mdx-js/react'
import {  P, H1, H2, H3, H4, H5, H6, BlockQuote, UL, LI, Table, THead, TBody, TR, TD, TH, 
  Code, Pre, HR, A, } from '@expo/html-elements' // prettier-ignore
import MarkdownComponent from './mdxComponent.md'

const components = {p: P, h1: H1, h2: H2, h3: H3, h4: H4, h5: H5, h6: H6, blockquote: BlockQuote, 
  ul: UL, li: LI, table: Table, thaed: THead, tbody: TBody, tr: TR, td: TD, th: TH, 
  code: Code, inlinecode: Code, pre: Pre, hr: HR, a: A, image: Image} // prettier-ignore

export default function MDXComp() {
  return (
    <MDXProvider components={components}>
      <div>
        <h1>
          Hello, world rendered by <code>React</code>!
        </h1>
        <MarkdownComponent />
      </div>
    </MDXProvider>
  )
}
