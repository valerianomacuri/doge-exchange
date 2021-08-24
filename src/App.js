import { useEffect, useState } from 'react'
import axios from 'axios'
// import './App.css'
import Coin from './Coin'

const api = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"

function App() {

  const [coins, setCoins] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    axios
    .get(api)
    .then(res => {
      setCoins(res.data)
    })
    .catch(error => alert('Ha ocurrido un error'))
  }, [])

  const handleChange = e => {
    e.preventDefault()
    setSearch(e.target.value)
  }

  const filteredCoins = coins.filter(coin =>
    coin.name.toString().toLowerCase().includes(search.toLowerCase())
    )
  
  return (
    <div className="App">
      <div className="coin-search">
          <div className="coin-exchange">
            <img src="https://dogecoin.com/assets/img/dogecoin-300.png" />
            <h1>DOGE EXCHANGE</h1>
          </div>
        <form>
          <input 
          type="text" 
          placeholder="Search a currency" 
          className="coin-input"
          onChange={handleChange} 
          />
        </form>
      </div>
      <div className="container">
      {filteredCoins.map(coin => {

return (
  <Coin 
  key={coin.id}
  name={coin.name}
  image={coin.image}
  symbol={coin.symbol.toUpperCase()}
  marketCap={coin.market_cap}
  price={coin.current_price}
  priceChange={coin.price_change_percentage_24h}
  volume={coin.total_volume} />
)
})}
      </div>
      <div className="footer">
        <p>Copyright © The Ðoge Exchange Project 2021</p>
        <p>Creado por Leonardo Valeriano. Diseño de sitio web por Leonardo Valeriano. Logo por Christine Ricks.</p>
      </div>
    </div>
    
  );
}

export default App;