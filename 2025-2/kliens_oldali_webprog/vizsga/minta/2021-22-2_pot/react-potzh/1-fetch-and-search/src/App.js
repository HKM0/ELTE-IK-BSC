const fetchUsers = async () => {
  const response = await fetch(
    "https://randomuser.me/api?results=200&inc=name"
  );
  const jsonData = await response.json();
  return jsonData.results;
};

export function App() {
  const users = [
    { name: { title: "Miss", first: "Laura", last: "Holmes" } },
    { name: { title: "Mr", first: "James", last: "Bond" } },
  ];
  const search = "";

  return (
    <div>
      <h1>Fetch and search</h1>
      <input placeholder="Search users" />

      <ul>
        <li>Mr Győző Horváth</li>
        <li>Mr Tamás László</li>
        <li>Mr Imre Bende</li>
        <li>Mr Barnabás Végh</li>
      </ul>
    </div>
  );
}
