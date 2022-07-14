import { useState, useRef, useEffect } from 'react'
import TextareaAutosize from 'react-textarea-autosize'

function App() {
  const [blocnote, setBlocnote] = useState("")
  const blocnoteRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (blocnoteRef.current) {
      // resize to fit content
      blocnoteRef.current.style.height = ``
      blocnoteRef.current.style.height = `${blocnoteRef.current.scrollHeight}px`
    }
  }, [blocnoteRef, blocnote])

  return (
    <div className="
      flex justify-center py-4
      min-h-screen h-full
      bg-neutral-900 text-white
      selection:bg-emerald-900 selection:text-emerald-300
    ">
      <div className='
        flex flex-col gap-4
        min-h-full w-full md:w-1/2
      '>
        <h1 className='text-2xl shrink'>
          blocnote
        </h1>
        <textarea
          className='
            grow
            bg-transparent text-neutral-400
            resize-none outline-none
          '
          spellCheck={false}
          placeholder='notes...'
          ref={blocnoteRef}
          name="main"
          id="main"
          value={blocnote}
          onChange={(e) => setBlocnote(e.target.value)}
        />
      </div>
    </div>
  )
}

export default App
