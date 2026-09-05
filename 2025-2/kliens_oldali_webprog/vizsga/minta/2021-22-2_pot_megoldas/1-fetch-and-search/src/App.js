import { useState, useEffect } from "react";

const fetchUsers = async () => {
  const response = await fetch(
    "https://randomuser.me/api?results=200&inc=name"
  );
  const jsonData = await response.json();
  return jsonData.results;
};

export function App() {
  const [users, setUsers] = useState([
    { name: { title: "Miss", first: "Laura", last: "Holmes" } },
    { name: { title: "Mr", first: "James", last: "Bond" } },
  ]);
  const [search, setSearch] = useState("");

  const filteredUsers = users.filter((user) =>
    `${user.name.first} ${user.name.last}`.includes(search)
  );

  useEffect(() => {
    fetchUsers().then((results) => setUsers(results));
  }, []);

  return (
    <div>
      <h1>Fetch and search</h1>
      <input
        value={search}
        placeholder="Search users"
        onChange={(e) => setSearch(e.target.value)}
      />
      {users ? (
        <div>
          {filteredUsers.map((user, i) => (
            <p
              key={i}
            >{`${user.name.title} ${user.name.first} ${user.name.last}`}</p>
          ))}
        </div>
      ) : null}
    </div>
  );
}
