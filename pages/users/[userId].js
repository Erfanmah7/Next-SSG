function userId({ usersId }) {
  return (
    <div>
      <h3>{usersId.name}</h3>
      <p>{usersId.email}</p>
    </div>
  );
}

export default userId;

//1 dynamic route
export async function getStaticPaths() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await res.json();

  const paths = users.map((user) => ({
    params: {
      userId: user.id.toString(),
    },
  }));

  return {
    // paths: [{ params: { userId: "1" } }],
    paths,
    fallback: false,
  };
}

//2
export async function getStaticProps(context) {
  //userId
  const { params } = context;
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/users/${params.userId}`
  );
  const usersId = await res.json();

  return {
    props: { usersId },
  };
}
