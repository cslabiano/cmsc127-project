import React, { useEffect, useState } from 'react'

function App() {
  const [data, setData] = useState([]);

  useEffect(()=>{
    fetch('http://localhost:3001/users')
    .then(res => res.json())
    .then(data => setData(data))
    .catch(err => console.log(err));
  }, [])
  return (
    <div>
      <table>
        <thead>
          <th>Username</th>
          <th>Password</th>
        </thead>
        <tbody>
          {data.map( (d, i) => (
            <tr key={i}>
              <td>{d.user_name}</td>
              <td>{d.password}</td>
            </tr>
          ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default App