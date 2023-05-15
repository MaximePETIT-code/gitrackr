import { Helmet, HelmetProvider } from "react-helmet-async";

import { MetaDescriptions } from "../../constants/MetaDescriptions";

export default function Home() {
  // console.log(MetaDescriptions);
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
        Welcome on Git Dash !
      </HelmetProvider>
    </>
  );
}
