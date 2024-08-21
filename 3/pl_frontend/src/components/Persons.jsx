const Persons = ({ persons, deleteName }) => {
    return (
      <ul>
        {persons.map(person =>
          <li key={person.id}>
            {person.name} {person.number}
            <button onClick={() => deleteName(person.id)}>Delete</button>
          </li>
        )}
      </ul>
    )
  }
  
  export default Persons;
  