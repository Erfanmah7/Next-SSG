import { notFound } from "next/navigation";
import { useRouter } from "next/router";

function userId({ usersId }) {
  const router = useRouter();

  //loading
  if (router.isFallback) {
    return <h2>Fallback Page!</h2>;
  }

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
  const use = users.slice(0, 4);

  const paths = use.map((user) => ({
    params: {
      userId: user.id.toString(),
    },
  }));

  return {
    // paths: [{ params: { userId: "1" } }],
    paths,
    fallback: true,
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

  if (!usersId.name) {
    return { notFound: true };
  }

  return {
    props: { usersId },
  };
}
