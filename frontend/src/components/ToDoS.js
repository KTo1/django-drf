import React from "react";


const TodoItem = ({item}) => {

    return (
        <tr>
            <td>
                {item.subject}
            </td>
            <td>
                {item.user}
            </td>
            <td>
                {item.created}
            </td>
            <td>
                {item.is_active}
            </td>
        </tr>
    )
}

const TodoList = ({items}) => {

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

            {items.map((item) => <TodoItem item = {item}/>)}
        </table>
    )
}

export default TodoList;