import { useEffect, useState } from 'react'
import './App.css'
import { loadClient } from './api/getClients'
import { Clients } from './api/getClients'

function App() {

  const [error, setError] = useState("")
  const [clientDatas, setClientDatas] = useState<Clients[] | null>()


  const getClients = async () => {
    const response = await loadClient("a")
    console.log('Response:', response);
    if (!response.success) {

      setError("A szerver nem elérhető")
    } else {
      setClientDatas(response.data)
    }
  }

  useEffect(() => {
    getClients();
  }, []);
  



  return (
    <div>
      <div>{error}</div>

      <div>Itt vagyok?</div>
      {clientDatas?.map((client) => (
        <div>
          <h1>Itt kellene megjelennie : {client.name}</h1>
        </div>
      ))}
    </div>
  )
}

export default App
