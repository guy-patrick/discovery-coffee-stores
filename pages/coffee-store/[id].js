import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/coffee-store.module.css";
import retrieveCoffeeStores from "../../utils/coffee-store.utils";

function CoffeeStore({ coffeeStore }) {
  const router = useRouter();
  const { name, imgUrl, address, neighbourhood } = coffeeStore;
  const {
    layout,
    container,
    col1,
    col2,
    backToHomeLink,
    nameWrapper,
    storeImg,
    iconWrapper,
    text,
    upvoteButton,
  } = styles;

  function upvoteHandler() {
    return;
  }

  return (
    <div className={layout}>
      <Head>
        <title>{name}</title>
      </Head>
      <div className={container}>
        <div className={col1}>
          <div className={backToHomeLink}>
            <Link href="/">
              <a>← Back to home</a>
            </Link>
          </div>
          <div className={nameWrapper}>
            <h1>{name}</h1>
          </div>
          <Image
            src={imgUrl}
            alt={name}
            width={600}
            height={360}
            className={storeImg}
          />
        </div>
        <div className={`${col2} glass`}>
          <div className={iconWrapper}>
            <Image
              src="/static/icons/places.svg"
              alt="good image"
              width={24}
              height={24}
            />
            <p className={text}>{address}</p>
          </div>
          <div className={iconWrapper}>
            <Image
              src="/static/icons/nearMe.svg"
              alt="good image"
              width={24}
              height={24}
            />
            <p className={text}>{neighbourhood}</p>
          </div>
          <div className={iconWrapper}>
            <Image
              src="/static/icons/star.svg"
              alt="good image"
              width={24}
              height={24}
            />
            <p className={text}>1</p>
          </div>
          <button className={upvoteButton} onClick={upvoteHandler}>
            Up vote!
          </button>
        </div>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  var coffeeStores = await retrieveCoffeeStores();

  const paths = coffeeStores.map((coffeeStore) => {
    return { params: { id: coffeeStore.id.toString() } };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  var coffeeStores = await retrieveCoffeeStores();
  coffeeStores = JSON.parse(JSON.stringify(coffeeStores));

  const coffeeStore = coffeeStores.find((coffeeStore) => {
    return coffeeStore.id == context.params.id;
  });

  return {
    props: {
      coffeeStore,
    },
  };
}

export default CoffeeStore;
