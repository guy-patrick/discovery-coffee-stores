import { useRouter } from "next/router";
import Link from "next/link";
import { Fragment } from "react";

function CoffeeStore() {
  const router = useRouter();

  return (
    <Fragment>
      <h1>This is the path value: {router.query.id}</h1>
      <Link href="/">Return to Homepage</Link>
    </Fragment>
  );
}

export default CoffeeStore;
