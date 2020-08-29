import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { mutate as mutateGlobal } from 'swr';
import { useFetch } from '../../hooks/useFetch';
import api from '../../services/api';

interface User {
  id: number;
  name: string;
}

interface RenderUserProps {
  user: User;
  handleNameChange(id: number, name: string): void;
}

const RenderUser: React.FC<RenderUserProps> = ({ user, handleNameChange }) => {
  const [newName, setNewName] = useState<string>('');

  const handleSubmit = () => {
    handleNameChange(user.id, newName);
    setNewName('');
  };

  return (
    <>
      <Link to={`/users/${user.id}`}>
        {user.name}
      </Link>{" "}
      <input value={newName} onChange={({ target: { value } }) => setNewName(value)} />
      <button type="button" onClick={handleSubmit}>
        Alterar nome
          </button>
    </>
  )
}

const UserList: React.FC = () => {
  const { data, mutate } = useFetch<User[]>('users');

  const handleNameChange = useCallback((id: number, name: string) => {
    api.put(`users/${id}`, { name });

    const updatedUsers = data?.map(user => {
      if (user.id === id) {
        return { ...user, name }
      }

      return user;
    })

    mutate(updatedUsers, false)
    mutateGlobal(`users/${id}`, { id, name })
  }, [data, mutate]);

  if (!data) {
    return <p>Carregando...</p>
  };

  return (
    <ul>
      {data.map(user => (
        <li key={user.id}>
          <RenderUser user={user} handleNameChange={handleNameChange} />
        </li>
      ))}
    </ul>
  );
}

export default UserList;