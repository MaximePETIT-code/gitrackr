import { Helmet, HelmetProvider } from "react-helmet-async";
import { MetaDescriptions } from "../../constants/MetaDescriptions";
import Logo from "../../components/Logo/Logo";
import SearchUser from "../../components/SearchUser/SearchUser";
import styles from "./Home.module.scss";

export default function Home() {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>{MetaDescriptions.home.title}</title>
          <meta
            name="description"
            content={MetaDescriptions.home.description}
          />
        </Helmet>
        <div className={styles.home}>
          <header className={styles.home__header}>
            <Logo />
            <h2 className={styles.home__header__subtitle}>
              Find and explore GitHub users statistics
            </h2>
          </header>
          <section className={styles.home__search}>
            <SearchUser />
          </section>
        </div>
      </HelmetProvider>
    </>
  );
}
