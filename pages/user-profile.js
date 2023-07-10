const UserProfile = (props) => {
  return <h1>{props.username}</h1>;
};

export async function getServerSideProps(context) {
  const { params, req, res } = context;

  console.log("Server side rendered");

  return {
    props: {
      username: "Max",
    },
  };
}

export default UserProfile;
