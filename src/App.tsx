import Card from './components/Card/Index';

import { ChangeEvent, useState, useEffect } from 'react';

import './App.css';

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
}

function App() {
  const [todoInput, setTodoInput] = useState('');
  const [todos, setTodos] = useState<Todo[]>(() => {
    const storedTodos = localStorage.getItem('@devList:todos');

    if (storedTodos) {
      return JSON.parse(storedTodos);
    }

    return [];
  });//<> generics
  //se é um estado do react precisa estar dentro do componente

  useEffect(() => {
    localStorage.setItem('@devList:todos', JSON.stringify(todos))
  }, [todos])

  function addTodo() {//onclick aciona essa função
    setTodos((previousTodo) => [...previousTodo, { id: Math.random(), title:todoInput, completed: false}]);//atualização baseada no estado anterior 
    /*
    previous - Em React, uma função de atualização é uma função que você passa para o hook de estado (useState) para atualizar o valor do estado. Essa função é usada para alterar o estado existente, fornecendo um novo valor.

    .significa que eu vou querer as coisas qu eu ja tinha e vou ter também as novas coisas*/

    setTodoInput('')//deixar meu input vazio novamente sempre que o usuário clica em adicionar
  }

  function handleInputChange (e: ChangeEvent<HTMLInputElement>) {
    setTodoInput(e.target.value);      
  }//O TypeScript fornece uma definição de tipo chamada ChangeEvent q importei do react para especificar esse tipo desse evento (e)

  function completeTodo(id: number) {
    setTodos((previousTodos) => //setTodos recebe e passa p/ todos
      previousTodos.map((todo) => todo.id != id ? todo : { ...todo, completed: !todo.completed})

      //Por exemplo, você poderia usar esse padrão para exibir ou ocultar um menu dropdown ao clicar no botão. Quando o botão é clicado, o estado booleano é alternado, e você pode usar o valor booleano para controlar a visibilidade do menu.

      //Em resumo, essa função completeTodo é responsável por marcar uma tarefa como concluída ou não concluída na lista de tarefas. Ela recebe um id como parâmetro e utiliza a função setTodos para atualizar o estado da lista de tarefas. A função map é usada para iterar sobre as tarefas existentes e, quando o id da tarefa corresponde ao id fornecido, a propriedade completed dessa tarefa é invertida, indicando que ela foi concluída ou não concluída, dependendo do seu estado anterior.
    );
  }

  function deleteTodo(id: number ){
    setTodos((previousTodos) => previousTodos.filter((todo) => todo.id != id));
    //se tudo.id != id o filter quer se não, se for igual a id ele não quer(false). que no caso seria eu apagando o que não quero.

    //a função deleteTodo recebe um id como parâmetro e utiliza o filter() para criar um novo array excluindo a tarefa com o ID correspondente. Em seguida, atualiza o estado da lista de tarefas com o novo array, efetivamente excluindo a tarefa do conjunto de tarefas.
  }

  return (
    <div className='App'>
      <div className='add-todo'>
        <input placeholder='Fazer café' value={todoInput} onChange={handleInputChange} /*onChange={(e) => setTodoInput(e.target.value)} o pessoal também faz assim*/ />
          <button onClick={addTodo}>Adicionar</button>      
      </div>

      {
        todos.map((todo) => (//em loops de dados lembre da key
          <Card key={todo.id} todo={todo} completeTodo={completeTodo} deleteTodo={deleteTodo}/>
        ))
      }

    </div>
  )
}

export default App
