import { useState, useRef, useEffect } from 'react'

// https://gist.github.com/kt3k/a74755d3b27ce54a619cf3bb2f0f7184
const useLocalStorage = <T,>(key: string, initialValue: T): [T, (x: T) => void] => {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value: T): void => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };

  return [storedValue, setValue];
}

const App = () => {
  const [blocnote, setBlocnote] = useLocalStorage<string>("blocnote","")
  const blocnoteRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (blocnoteRef.current) {
      // resize to fit content
      blocnoteRef.current.style.height = `${blocnoteRef.current.scrollHeight}px`
    }
  }, [blocnoteRef, blocnote])

  useEffect(() => {
    if (blocnoteRef.current) {
      const end = blocnoteRef.current.value.length;
      blocnoteRef.current.focus()
      blocnoteRef.current.setSelectionRange(end, end);
    }
  }, [blocnoteRef.current])

  return (
    <div className="
      flex justify-center p-4
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
