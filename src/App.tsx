import { useEffect, useState } from 'react'
import './App.css'
import { loadClient } from './api/getClients'
import { Clients } from './api/getClients'
import { loadClothes } from './api/getClothes'
import { Clothes } from './api/getClothes'
function App() {

  const [error, setError] = useState("")
  const [clientDatas, setClientDatas] = useState<Clients[] | null>()
  const [clientSearch, setClientSearch] = useState("")
  const [ClothesDatas, setClothesDatas] = useState<Clothes[] | null>()
  const [filteredClothesDatas, setfilteredClothesDatas] = useState<Clothes[] | null>()
  const [typeFilterValue, settypeFilterValue] = useState("")



  const getClients = async () => {
    const response = await loadClient(clientSearch)
    if (!response.success) {
      setError("A szerver nem elérhető")
    } else {
      setClientDatas(response.data)
    }
  }

  const getClothes = async () => {
    const response = await loadClothes()
    if (!response.success) {
      setError("A szerver nem elérhető")
    } else {
      setClothesDatas(response.data)
    }
  }


  useEffect(() => {
    getClients();
    getClothes()
  });



  useEffect(() => {
    if (typeFilterValue == "T-shirts") {
      const filteredData = ClothesDatas?.filter(
        (clothe) =>
          clothe.type.includes(typeFilterValue)
      )
      setfilteredClothesDatas(filteredData)
    } else if (typeFilterValue == "Jeans") {
      const filteredData = ClothesDatas?.filter(
        (clothe) =>
          clothe.type.includes(typeFilterValue)
      )
      setfilteredClothesDatas(filteredData)
    } else if (typeFilterValue == "Shoes") {
      const filteredData = ClothesDatas?.filter(
        (clothe) =>
          clothe.type.includes(typeFilterValue)
      )
      setfilteredClothesDatas(filteredData)
    } else {
      setfilteredClothesDatas(ClothesDatas)
    }
  }, [typeFilterValue, ClothesDatas])



  return (
    <div className='min-h-screen flex justify-evenly items-center flex-col main-container bg-[#B85DCB]'>
      <div>{error}</div>

      <input type="text" placeholder='Type your client'
        onChange={(e) => { setClientSearch(e.target.value) }}
      />
      {clientDatas?.map((client) => (
        <>
          <h1>{client.name}</h1>
          {client.pets.map(pet => (
            <>
              <div className='flex justify-center items-center'>
                <p>{pet.animal}</p>
                <p className='pr-3 pl-3'>{pet.name}</p>
                {pet.isVaccinated ? <p>Be van oltava</p> : <p>Nincs van oltava</p>}
              </div>
            </>
          ))}
        </>
      ))}


      <div className="card-actions justify-end ">
        <div className='flex'>
          <button className="btn btn-primary"
            onClick={() => { settypeFilterValue("T-shirts") }}
          >T-shirts</button>
        </div>
        <div className="card-actions justify-end">
          <button className="btn btn-primary"
            onClick={() => { settypeFilterValue("Jeans") }}
          >Jeans</button>
        </div>
        <div className="card-actions justify-end">
          <button className="btn btn-primary"
            onClick={() => { settypeFilterValue("Shoes") }}
          >Shoes</button>
        </div>
        <div className="card-actions justify-end">
          <button className="btn btn-primary"
            onClick={() => { settypeFilterValue("") }}
          >Remove Filter</button>
        </div>
      </div>
      <div className='flex flex-row flex-wrap'>
        {filteredClothesDatas?.map((clote) => (
          clote.products.map((product) => (
            <div className=' m-5'>

              <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title">{clote.type}</h2>
                  <p>{clote.gender}</p>
                  <ul>
                    <li>{product.brand}</li>
                    <li>{product.color}</li>
                  </ul>
                </div>
              </div>

            </div>
          ))
        ))}
      </div>
    </div>
  )
}

export default App
