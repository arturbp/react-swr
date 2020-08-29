# react-swr

## Principais tecnologias utilizadas
- [JSON Server](https://github.com/typicode/json-server)
- [SWR](https://swr.vercel.app/)

## Explicação
O SWR salva em cache os dados de uma requisição. Quando a requisição for utilizada da próxima vez, ele retorna os dados salvos em cache e, por debaixo dos panos, revalida esses dados.
Para um bom UX, o SWR facilita nossa vida com seus vários recursos.
No caso desse projeto, foi utilizado o <b>mutate</b>, onde ele vai alterar os dados de uma lista enquanto que não há resposta da requisição. Quando houver o retorno, ele valida os dados salvando em case o resultado.

## Exemplo
```jsx
import { mutate as mutateGlobal } from 'swr';
....
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
```

## Instalação
Baixe o código
```sh
git clone https://github.com/arturbp/react-swr.git
cd react-swr
```
Instale as dependências
```sh
yarn install
```
Execute os scripts em diferentes terminais
```sh
yarn server
yarn start
```
