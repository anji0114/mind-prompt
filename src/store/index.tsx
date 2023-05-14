import { Note, Prompt } from '@/types'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

type State = {
  note: Note
  setNote: (payload: Note) => void
  resetNote: () => void

  editPrompt: Prompt
  setEditPrompt: (payload: Prompt) => void
  resetEditPrompt: () => void
}

export const useStore = create<State>()(
  devtools((set) => ({
    // note, note template
    note: { id: '', title: '', content: { blocks: [] } },
    setNote: (payload) => {
      set({
        note: {
          id: payload.id,
          title: payload.title,
          content: payload.content,
        },
      })
    },
    resetNote: () => {
      set({
        note: {
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
