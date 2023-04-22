import { Note, Prompt } from '@/types'
import { OutputData } from '@editorjs/editorjs'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

type State = {
  editNote: Note
  setEditNote: (payload: Note) => void
  resetEditNote: () => void

  editPrompt: Prompt
  setEditPrompt: (payload: Prompt) => void
  resetEditPrompt: () => void
}

export const useStore = create<State>()(
  devtools((set) => ({
    editNote: { id: '', title: '', content: { blocks: [] } },
    setEditNote: (payload) => {
      set({
        editNote: {
          id: payload.id,
          title: payload.title,
          content: payload.content,
        },
      })
    },
    resetEditNote: () => {
      set({
        editNote: {
          id: '',
          title: '',
          content: { blocks: [] },
        },
      })
    },

    editPrompt: { id: '', title: '', content: '' },
    setEditPrompt: (payload) => {
      set({
        editPrompt: {
          id: payload.id,
          title: payload.title,
          content: payload.content,
        },
      })
    },
    resetEditPrompt: () => {
      set({
        editPrompt: {
          id: '',
          title: '',
          content: '',
        },
      })
    },
  }))
)