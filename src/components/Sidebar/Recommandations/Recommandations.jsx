import PropTypes from "prop-types";
import { useState } from "react";
import SearchResults from "../../SearchUser/SearchResults/SearchResults";
import SearchUser from "../../../components/SearchUser/SearchUser";
import styles from "./Recommandations.module.scss";
import Button from "../../Button/Button";

export default function Recommandations({ followers }) {
  const [showModal, setShowModal] = useState(false);

  if (followers.length === 0) {
    followers = [
      {
        login: "MaximePETIT-code",
        avatar_url: "https://avatars.githubusercontent.com/u/74910872?v=4",
      },
    ];
  }

  const handleClick = () => {
    setShowModal(!showModal);
  };

  return (
    <div className={styles.recommandations}>
      {!showModal && (
        <>
          <h3 className={styles.recommandations__title}>Recommandations</h3>
          <SearchResults
            users={followers}
            key={followers.map((user) => user.id).join("-")}
            size={"s"}
          />
        </>
      )}

      {showModal && <SearchUser count={2} size={"s"} type={"secondary"} />}
      <div className={styles.recommandations__button}>
        <Button action={handleClick} marginTop="24px" type={showModal ? "rounded" : "primary"}>
          {showModal ? "X" : "Search other user"}
        </Button>
      </div>
    </div>
  );
}

Recommandations.propTypes = {
  followers: PropTypes.array.isRequired,
};
