import React, { useState } from "react";

// const TableRow = ({ user, users, setUsers }) => {
//     const { fullName, position, email, lastLogin, isBlocked } = user;
//     const [checked, setChecked] = useState(false);

//     return (
//         <tr>
//             <th>
//                 <label>
//                     <input
//                         type="checkbox"
//                         className="checkbox"
//                         name="checked"
//                         checked={checked}
//                         onChange={() => {
//                             const x = users.findIndex((a) => a == user);
//                             users[x].checked = !users[x].checked;
//                             setUsers(users);
//                             setChecked((state) => !state);
//                         }}
//                     />
//                 </label>
//             </th>
//             <td>
//                 {fullName}
//                 <br />
//                 <span className="badge badge-ghost badge-sm">{position}</span>
//             </td>

//             <td>
//                 <div>
//                     <div className="font-bold">{email}</div>
//                 </div>
//             </td>
//             <td>{lastLogin}</td>
//             <th>{isBlocked ? "Blocked" : "Active"}</th>
//         </tr>
//     );
// };

// export default TableRow;
