import './index.css'
import Navbar from './components/Navbar'
import Calendar from './components/Calendar'
import UnitCards from './components/UnitCards'
import Chatbot from './components/Chatbot'
import PromoBanner from './components/PromoBanner'
import { useState } from 'react'

function App() {
  const [lang, setLang] = useState('en')
  const [chatOpen, setChatOpen] = useState(true)

  return (
    <div className="app-shell">
      <Navbar lang={lang} setLang={setLang} />
      <div className="main-content">
        <div className="panel">
          <UnitCards lang={lang} onInquire={() => setChatOpen(true)} />
          <PromoBanner lang={lang} />
        </div>
        <div className="panel">
          <Calendar lang={lang} />
        </div>
        <div className="panel">
          <Chatbot lang={lang} open={chatOpen} setOpen={setChatOpen} />
        </div>
      </div>
    </div>
  )
}

export default App