import { OutputData } from '@editorjs/editorjs'

export type Note = {
  id: string
  title: string
  content: OutputData
  created_at: string
}

export type Prompt = {
  id: string
  title: string
  content: string
}
