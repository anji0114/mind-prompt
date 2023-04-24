//./components/EditorTools.js
import Code from '@editorjs/code'
import Header from '@editorjs/header'
import Paragraph from '@editorjs/paragraph'
import List from '@editorjs/list'
import InlineCode from '@editorjs/inline-code'

export const EDITOR_TOOLS = {
  inlineCode: InlineCode,
  paragraph: {
    class: Paragraph,
    InlineCode: true,
  },
  header: {
    class: Header,
    config: { levels: [1, 2, 3] },
    defaultLevel: 2,
  },
  list: List,
  code: Code,
}

export const I18N = {
  messages: {
    toolNames: {
      Text: 'テキスト',
      Heading: '見出し',
      Code: 'コード',
      List: 'リスト',
    },

    blockTunes: {
      delete: {
        Delete: '削除',
      },
      moveUp: {
        'Move up': '上に移動',
      },
      moveDown: {
        'Move down': '下に移動',
      },
      heading: {
        'Heading 1': 'タイトル1',
      },
    },
  },
}
