import React from "react";
import {Link} from "react-router-dom";


const ProjectItem = ({item}) => {

    return (
        <tr>
            <td>
                <Link to={`project/${item.id}`}>{item.name}</Link>
            </td>
            <td>
                {item.repo}
            </td>
            <td>
                {item.users}
            </td>
        </tr>
    )

}

const ProjectList = ({items}) => {

    return (
        <table>
            <th>
                Name
            </th>
            <th>
                Repo
            </th>
            <th>
                Users
            </th>
            {items.map((item) => <ProjectItem item = {item}/>)}
        </table>
    )
}

export default ProjectList;