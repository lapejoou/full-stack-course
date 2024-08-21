import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setNewFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [isError, setError] = useState(null);

  useEffect(() => {
    axios
      .get('/api/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])


  const addName = (event) => {
    event.preventDefault()

    const existingPerson = persons.find(person => person.name === newName);

    if (existingPerson) {
      const nameObject = {
        name: newName,
        number: newNumber
      }
      personService
      .update(existingPerson.id, nameObject)
         .then(returnedPerson => {
          setPersons(persons.map(person => 
            person.id !== existingPerson.id ? person : returnedPerson
          ));
        setNewName('')
        setNewNumber('')
        setError(false)
        setMessage(`Updated '${newName}'`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
    })
    }

    else {
      const nameObject = {
        name: newName,
        number: newNumber
      }

      personService
      .create(nameObject)
        .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setError(false)
        setMessage(`Added '${newName}'`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })

    }
  }

  const deleteName = (id) => {
      const deletedPerson = persons.find(person => person.id === id);
      personService
      .eliminate(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id))
        setError(false)
        setMessage(`Deleted '${deletedPerson.name}'`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
      .catch(error => {
        setError(true);
        setMessage(`Information of '${deletedPerson.name}' has already been removed from the server`);
        setTimeout(() => {
          setMessage(null)
        }, 5000);
      });
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }


  const personsToShow = filter === ''
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} isError = {isError} />
      <Filter  filter = {filter} handleFilterChange = {handleFilterChange}/>
      <h2>Add a new</h2>
      <PersonForm
        addName={addName}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} deleteName ={deleteName}/>
    </div>
  )

}

export default App