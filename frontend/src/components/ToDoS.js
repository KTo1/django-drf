import React from "react";


const TodoItem = ({todo}) => {

    return (
        <tr>
            <td>
                {todo.subject}
            </td>
            <td>
                {todo.user}
            </td>
            <td>
                {todo.created}
            </td>
            <td>
                {todo.is_active}
            </td>
        </tr>
    )
}

const TodoList = ({todos}) => {

    return (
        <table>
            <th>
                Subject
            </th>
            <th>
                User
            </th>
            <th>
                Created
            </th>
            <th>
                Active
            </th>

            {todos.map((todo) => <TodoItem todo = {todo}/>)}
        </table>
    )
}

export default TodoList;