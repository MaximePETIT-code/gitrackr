import PropTypes from "prop-types";

export default function Profil({ name, image, created_at, url }) {

  const date = new Date(created_at).toLocaleDateString('en-GB');

  return (
    <div className="profil">
      <div className="profil__picture">
        <img src={image} alt={`Profile picture of ${name}, a developer and a user on Github `} />
      </div>
      <div className="profil__infos">
        <div className="profil__title">
          <h1>{`${name}'s`} <span>Github dashboard</span></h1>
          <p>{`active since ${date}`}</p>
        </div>
        <div className="secondary-cta">
          <a target="_blank" rel="noreferrer" href={url}>View Github profil</a>
        </div>
      </div>
    </div>
  );
}

Profil.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  created_at: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};
