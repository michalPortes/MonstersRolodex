import { Component } from 'react'

import CardList from './components/card-list/card-list.components'
import SearchBox from './components/search-box/search-box.components'
import './App.css'

//Código para estudo, comentado e aplicado

class App extends Component {
  constructor() {
    super()

    this.state = {
      monsters: [], // monsters é a lista que está vindo da API que se encontra em 'componentDidMount'
      searchField: '' // paramentro que recebe a lista atualizada dos monstros, pra atualização ser realmente um filtro e não uma perda total da lista atual de monstros
    }
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users') // URL onde se encontra o código que possui a API
      .then(response => response.json())
      .then(users =>
        this.setState(() => {
          return { monsters: users } // desde o primeiro parametro then, ele resgata o .json depois o user e assim atribui o user na lista monsters
        })
      )
  }

  onSearchChange = event => {
    const searchField = event.target.value.toLocaleLowerCase() //toLocaleLowerCase "impede" a mudaça de letras minusculas para maiusculas
    this.setState(() => {
      return { searchField }
    })
  }

  render() {
    const { monsters, searchField } = this.state
    const { onSearchChange } = this

    const filteredMonsters = monsters.filter(monster => {
      return monster.name.toLocaleLowerCase().includes(searchField) //filtragem dos monstros no seach
    })

    return (
      <div className="App">
        <h1 className="app-title">Monsters Rolidex</h1>
        <SearchBox
          className="monsters-search-box"
          onChangeHandler={onSearchChange}
          placeholder="Search monster"
        />
        <CardList monsters={filteredMonsters} />
      </div>
    )
  }
}

export default App
