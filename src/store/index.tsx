import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

type Note = {
  id: string
  title: string
  content: string
}

type State = {
  editNote: Note
  setNote: (payload: Note) => void
  resetNote: () => void
}

export const useStore = create<State>()(
  devtools((set) => ({
    editNote: { id: '', title: '', content: '' },
    setNote: (payload) => {
      set({
        editNote: {
          id: payload.id,
          title: payload.title,
          content: payload.content,
        },
      })
    },
    resetNote: () => {
      set({
        editNote: {
          id: '',
          title: '',
          content: '',
        },
      })
    },
  }))
)
