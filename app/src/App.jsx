import './index.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import PromoBanner from './components/PromoBanner'
import Calendar from './components/Calendar'
import UnitCards from './components/UnitCards'
import Chatbot from './components/Chatbot'
import Footer from './components/Footer'
import { useState } from 'react'

function App() {
  const [lang, setLang] = useState('en')
  const [chatOpen, setChatOpen] = useState(false)

  return (
    <div>
      <Navbar lang={lang} setLang={setLang} />
      <Hero lang={lang} />
      <PromoBanner lang={lang} />
      <Calendar lang={lang} />
      <UnitCards lang={lang} onInquire={() => setChatOpen(true)} />
      <Chatbot lang={lang} open={chatOpen} setOpen={setChatOpen} />
      <Footer lang={lang} />
    </div>
  )
}

export default App