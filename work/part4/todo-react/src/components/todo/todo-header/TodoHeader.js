import React, { Component } from 'react';
import './TodoHeader.scss';

// class TodoHeader extends Component {
//   render() {
//     return (
//       <section>
//         <div className="jumbotron bg-white pb-2 mb-2 bg">
//           <h1 className="display-4">To Do List</h1>
//           <p className="lead">Manage your tasks easily.</p>
//         </div>
//       </section>
//     );
//   }
// }

// https://velopert.com/2994
const TodoHeader = (props) => {
    return (
      <section>
        <div className="jumbotron bg-white pb-2 mb-2 bg">
          <h1 className="display-4">To Do List</h1>
          <p className="lead">Manage your tasks easily.</p>
        </div>
      </section>
    );
};

export default TodoHeader;
