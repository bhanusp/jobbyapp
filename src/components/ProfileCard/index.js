import './index.css'

const ProfileCard = props => {
  const {profileData} = props
  const {profileName, profileImageUrl, shortBio} = profileData

  return (
    <li className="profile-list-container">
      <div className="profile-container">
        <img src={profileImageUrl} alt="profile" className="profile-img" />
        <h1 className="profile-name">{profileName}</h1>
        <p className="short-bio">{shortBio}</p>
      </div>
    </li>
  )
}

export default ProfileCard
