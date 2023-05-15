import { Helmet } from "react-helmet";
import { MetaDescriptions } from "../../constants/MetaDescriptions";

export default function Home() {
  // console.log(MetaDescriptions);
  return (
    <>
      <Helmet>
        <title>{MetaDescriptions.home.title}</title>
        <meta name="description" content={MetaDescriptions.home.description} />
      </Helmet>
    </>
  );
}
