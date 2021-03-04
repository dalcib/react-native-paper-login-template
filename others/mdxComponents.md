| Tag             | Name                                                                 | Syntax                                              |          | 
| --------------- | -------------------------------------------------------------------- | --------------------------------------------------- |----------|
| `p`             | [Paragraph](https://github.com/syntax-tree/mdast#paragraph)          |                                                     |`<P />`   |
| `h1`            | [Heading 1](https://github.com/syntax-tree/mdast#heading)            | `#`                                                 |`<H1 />`  |
| `h2`            | [Heading 2](https://github.com/syntax-tree/mdast#heading)            | `##`                                                |`<H2 />`  |
| `h3`            | [Heading 3](https://github.com/syntax-tree/mdast#heading)            | `###`                                               |`<H3 />`  |
| `h4`            | [Heading 4](https://github.com/syntax-tree/mdast#heading)            | `####`                                              |`<H4 />`  |
| `h5`            | [Heading 5](https://github.com/syntax-tree/mdast#heading)            | `#####`                                             |`<H5 />`  |
| `h6`            | [Heading 6](https://github.com/syntax-tree/mdast#heading)            | `######`                                            |`<H6 />`  |
| `blockquote`    | [Blockquote](https://github.com/syntax-tree/mdast#blockquote)        | `>`                                                 |`<BlockQuote />`|
| `ul`            | [List](https://github.com/syntax-tree/mdast#list)                    | `-`                                                 |`<Ul />`  |
| `ol`            | [Ordered list](https://github.com/syntax-tree/mdast#list)            | `1.`                                                |
| `li`            | [List item](https://github.com/syntax-tree/mdast#listitem)           |                                                     |`<Li />`  |
| `table`         | [Table](https://github.com/syntax-tree/mdast#table)                  |                                                     |`<Table />`|
| `thead`         | [Table head](https://github.com/syntax-tree/mdast#table)             |                                                     |`<THead />`   |
| `tbody`         | [Table body](https://github.com/syntax-tree/mdast#table)             |                                                     |`<TBody />`   |
| `tr`            | [Table row](https://github.com/syntax-tree/mdast#tablerow)           |                                                     |`<Tr />`   |
| `td`/`th`       | [Table cell](https://github.com/syntax-tree/mdast#tablecell)         |                                                     |`<Td/Th />`   |
| `code`          | [Code](https://github.com/syntax-tree/mdast#code)                    | ` ```code``` `                                      |`<Code />`   |
| `inlineCode`    | [InlineCode](https://github.com/syntax-tree/mdast#inlinecode)        | `` `inlineCode` ``                                  |`<Code* />`   |
| `pre`           | [Code](https://github.com/syntax-tree/mdast#code)                    | ` ```code``` `                                      |`<Pre />`   |
| `em`            | [Emphasis](https://github.com/syntax-tree/mdast#emphasis)            | `_emphasis_`                                        |`<Em />`   |
| `strong`        | [Strong](https://github.com/syntax-tree/mdast#strong)                | `**strong**`                                        |`<Strong />`   |
| `del`           | [Delete](https://github.com/syntax-tree/mdast#delete)                | `~~strikethrough~~`                                 |`<Del />`   |
| `hr`            | [Thematic break](https://github.com/syntax-tree/mdast#thematicbreak) | `---` or `***`                                      |`<Hr />`   |
| `a`             | [Link](https://github.com/syntax-tree/mdast#link)                    | `<https://mdxjs.com>` or `[MDX](https://mdxjs.com)` |`<A />`   |
| `img`           | [Image](https://github.com/syntax-tree/mdast#image)                  | `![alt](https://mdx-logo.now.sh)`                   |`<Image />`   |

import {P, H1, H2, H3, H4, H5, H6, BlockQuote, Ul, Li, Table, THead, TBody, Tr, Td, Th, Code, Pre, Hr, A} from '@expo/html-elements'
import {Image} from 'react-native'
const Ol = ({ children }) => {return <View style={[styles.list, styles.listOrdered]}>{children}</View>;} 
const components = {p: P, h1: H1, h2: H2, h3: H3, h4: H4, h5: H5, h6: H6, blockquote: BlockQuote, ul: Ul, li: Li, table: Table, thaed: THead, tbody: TBody, tr: Tr, td: Td, th: Th, code: Code, inlinecode: Code, pre: Pre, hr: Hr, a: A, image: Image}


   