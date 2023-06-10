import './styles.css';
import { Todo } from '../../App.tsx';//chaves - significa que você está importando um membro específico do módulo em vez de importar o módulo inteiro. Quando se trata de importar Hooks do React, você também precisa usar as chaves.

type CardProps = {
    todo: Todo;
    completeTodo: (id: number) => void;
    deleteTodo: (id: number) => void;
}

export default function Card ({ todo, completeTodo, deleteTodo }: CardProps) {//desestruturei props

    function handleCompleteTodo() {
        completeTodo(todo.id)//como essa propriedade recebeu uma função, eu passei o parametro dela por aqui
    }

    function handleDeleteTodo() {
        deleteTodo(todo.id)
    }

    return (
        //adicionei uma classe de forma dinámica.
        <div className={`card ${todo.completed ? 'done' : ''}`}>
            <h2>{todo.title}</h2>
            <div className="card-buttons">
                <button onClick={handleCompleteTodo} >{todo.completed ? 'Retomar' : 'Completar'}</button>
                <button onClick={handleDeleteTodo}>Deletar</button>
            </div>
        </div>
    )
}