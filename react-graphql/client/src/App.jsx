import './App.css'
import {useQuery, gql, useMutation} from '@apollo/client'
import {useState} from "react";

const GET_USERS = gql`
  query GetUsers {
    getUsers {
      id
      age
      name
      isMarried
    }
  }
`;

const GET_USERS_BY_ID = gql`
  query GetUserById($id: ID!) {
    getUserById(id: $id) {
      id
      age
      name
      isMarried
    }
  }
`;

const CREATE_USER = gql`
  mutation CreateUser($name: String!, $age: Int!, $isMarried: Boolean!) {
    createUser(name: $name, age: $age, isMarried: $isMarried) {
      name
    }
  }
`;

function App() {
  const [newUser, setNewUser] = useState({})

  const {
    data: getUsersData,
    error: getUsersError,
    loading: getUsersLoading
  } = useQuery(GET_USERS);

  const {
    data: getUserByIdData,
    error: getUserByIdError,
    loading: getUserByIdLoading
  } = useQuery(GET_USERS_BY_ID, { variables: { id: "2" }});

  const [ createUser ] = useMutation(CREATE_USER)

  if (getUsersLoading) return <p>Loading...</p>;
  if (getUsersError) return <p>Error :(</p>;

  const handleCreateUser = async () => {
    createUser({
      variables: {
        name: newUser.name,
        age: Number(newUser.age),
        isMarried: false
      }
    })
  };

  return (
    <>
      <div>
        <input
          placeholder="Name..."
          onChange={(e) => setNewUser({...newUser, name: e.target.value})}
        />
        <input
          placeholder="Age.."
          type={"number"}
          onChange={(e) => setNewUser({...newUser, age: e.target.value})}
        />
        <button onClick={handleCreateUser}>Create User</button>
      </div>

      <h1>Users</h1>
      <div>
        { getUserByIdLoading ? <p>Loading...</p> : getUserByIdError ? <p>Error :(</p> : (
         <>
           <h2>Choose a user</h2>
           <p>{getUserByIdData.getUserById.name}</p>
           <p>{getUserByIdData.getUserById.age}</p>
         </>
        )}
      </div>
      <div>
        {" "}
        {getUsersData.getUsers.map((user) => (
          <div key={user.id}>
            <p>Name: {user.name}</p>
            <p>Age: {user.age}</p>
            <p>Is married: {user.isMarried ? 'Yes' : 'No'}</p>
          </div>
        ))}
        {" "}
      </div>
    </>
  )
}

export default App
