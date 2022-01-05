import './index.css'

const SkillData = props => {
  const {skillDetails} = props
  const {skillImageUrl, skillName} = skillDetails

  return (
    <li>
      <img src={skillImageUrl} alt={skillName} className="skill-image" />
      <p>{skillName}</p>
    </li>
  )
}

export default SkillData
