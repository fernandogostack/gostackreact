import React from "react";
import api from './services/api'
import "./styles.css";
import { useEffect, useState } from "react";

function App() {
  const [repositories, setRepositories] = useState([])
  useEffect(()=>{
  
  api.get('repositories').then(response=>

     setRepositories(response.data)
  )

  }, []); 
  
  async function handleAddRepository() {
    // TODO
      const response = await api.post('repositories', {
        
        title: "me",
        url: "http://tokenizabens.com",
        techs: "blockchain"
      })
      setRepositories([...repositories, response.data])
  }

  async function handleRemoveRepository(id) {
    // TODO
    await api.delete(`repositories/${id}`)
    setRepositories(repositories.filter((repository) => { 
    return repository.id !== id 
    } ))
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => ( 

       
        <li key={repository.id}>
          {repository.title} 
         
          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
