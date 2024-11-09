import { Star, StarHalf } from "lucide-react";
import styles from "./ProductItem.module.css";
function Rating({ rating }) {
  const fullStar = parseInt(rating);
  const partStar = parseInt((parseFloat(rating) - fullStar) * 10);

  return (
    <div className={styles.rating_container}>
      {Array.from({ length: fullStar }).map((_, i) => (
        <Star key={i} size={16} />
      ))}
      {partStar >= 3 ? <StarHalf size={16} /> : null}
    </div>
  );
}

export default Rating;
