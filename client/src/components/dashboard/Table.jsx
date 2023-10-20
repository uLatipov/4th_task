import React, { useState } from "react";
// import TableRow from "./TableRow";

// const Table = ({ users, setUsers }) => {
//     const [checked, setChecked] = React.useState(true);
//     return (
//         <div className="overflow-x-auto ">
//             <form
//                 action="#"
//                 onSubmit={(e) => {
//                     e.preventDefault();
//                 }}
//             >
//                 <table className="table">
//                     <thead>
//                         <tr>
//                             <th>
//                                 <label>
//                                     <input
//                                         type="checkbox"
//                                         className="checkbox"
//                                         onChange={() => {
//                                             setChecked((state) => !state);
//                                             console.log(checked);
//                                         }}
//                                     />
//                                 </label>
//                             </th>
//                             <th>
//                                 <div>
//                                     <div className="font-bold">Full Name</div>
//                                     <div className="text-sm opacity-50">
//                                         Position
//                                     </div>
//                                 </div>
//                             </th>
//                             <th>E-Mail</th>
//                             <th>Last Login</th>
//                             <th>Status</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {users.map((user) => (
//                             <TableRow
//                                 users={users}
//                                 setUsers={setUsers}
//                                 user={user}
//                                 key={user._id}
//                             />
//                         ))}
//                     </tbody>
//                     <tfoot>
//                         <tr>
//                             <th></th>
//                             <th>
//                                 <div>
//                                     <div className="font-bold">Full Name</div>
//                                     <div className="text-sm opacity-50">
//                                         Position
//                                     </div>
//                                 </div>
//                             </th>
//                             <th>E-Mail</th>
//                             <th>Last Login</th>
//                             <th>Status</th>
//                         </tr>
//                     </tfoot>
//                 </table>
//             </form>
//         </div>
//     );
// };

// export default Table;
