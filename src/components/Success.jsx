import { useHistory } from "react-router-dom";
import { Button } from "reactstrap";

export default function Success() {
  let history = useHistory();

  function handleClick() {
    console.log("handle");
    history.push("/trial");
  }

  return (
    <>
      <h1>Register Success!</h1>
      <h2>Loading...</h2>
      <Button onClick={handleClick}>Redirect to Trial Page</Button>
    </>
  );
}
