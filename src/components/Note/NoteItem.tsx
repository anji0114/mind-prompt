// import { useSupabaseClient } from '@supabase/auth-helpers-react'
// import { Router } from 'next/router'
// import { FC } from 'react'

// type Props = {
//   id: string
//   title: string
// }

// export const NoteItem: FC<Props> = ({ id, title }) => {
//   const supabase = useSupabaseClient()

//   const handleDeleteNote = async (id: string) => {
//     const { error } = await supabase.from('notes').delete().eq('id', id)
//     if (error) {
//       alert(error.message)
//       return
//     }

//     Router.reload()
//   }

//   return (
//     <li key={note.id} className={styles.item}>
//       <Link href={`note/${note.id}`}>{note.title}</Link>
//       <button
//         className={styles.delete}
//         onClick={() => handleDeleteNote(note.id)}
//       >
//         削除
//       </button>
//     </li>
//   )
// }
