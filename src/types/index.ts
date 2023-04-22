import { OutputData } from '@editorjs/editorjs'

export type Note = {
  id: string
  title: string
  content: OutputData
}

export type Prompt = {
  id: string
  title: string
  content: string
}
