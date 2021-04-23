import React from 'react'
import { Text, View } from 'react-native'
//import { MDXProvider } from '@mdx-js/react'
//import {  P, H1, H2, H3, H4, H5, H6, BlockQuote, UL, LI, Table, THead, TBody, TR, TD, TH,
//  Code, Pre, HR, A, } from '@expo/html-elements' // prettier-ignore

//@ts-ignore
//import MarkdownComponent from './mdxComponent.md'

/* import MDX from '@mdx-js/runtime'
async function getMD() {
  const bob = await fetch('./mdxComponent.md')
  return await bob.text()
}
const textMD = getMD()
const MarkdownComponent = () => <MDX children={textMD} /> */

/* const components = {p: P, h1: H1, h2: H2, h3: H3, h4: H4, h5: H5, h6: H6, blockquote: BlockQuote, 
  ul: UL, li: LI, table: Table, thaed: THead, tbody: TBody, tr: TR, td: TD, th: TH, 
  code: Code, inlinecode: Code, pre: Pre, hr: HR, a: A,   image: Image  } // prettier-ignore
  */

// <MDXProvider components={components}>
export default function MDXComp() {
  return (
    <View>
      <Text>Hello, world rendered by React!</Text>
      {/*  <MarkdownComponent /> */}
    </View>
    /* </MDXProvider> */
  )
}
