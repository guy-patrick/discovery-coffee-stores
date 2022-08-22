import styles from "./card.module.css";
import Link from "next/link";
import Image from "next/image";

function Card({ coffeeStore }) {
  const {
    cardLink,
    cardHeader,
    cardHeaderWrapper,
    cardImage,
    cardImageWrapper,
    container,
  } = styles;

  const { name, imgUrl } = coffeeStore;

  return (
    <Link href={`/coffee-store/${coffeeStore.id}`}>
      <a className={cardLink}>
        <div className={`${container} glass`}>
          <div className={cardHeaderWrapper}>
            <h2 className={cardHeader}>{name}</h2>
          </div>
          <div className={cardImageWrapper}>
            <Image
              className={cardImage}
              src={imgUrl}
              alt="coffee store card"
              width={260}
              height={160}
            />
          </div>
        </div>
      </a>
    </Link>
  );
}

export default Card;
