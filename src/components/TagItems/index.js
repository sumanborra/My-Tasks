import './index.css'

const TagItems = props => {
  const {tagsList, changedsuccessfull} = props
  const {optionId, displayText, isActive} = tagsList
  const buttonStyle = isActive ? 'background-color-change' : ''
  const changeButton = () => {
    changedsuccessfull(optionId)
  }
  return (
    <li key={optionId} className="list-items-in-tags-button">
      <button
        type="button"
        className={`buttn-tags-list ${buttonStyle}`}
        onClick={changeButton}
      >
        {displayText}
      </button>
    </li>
  )
}
export default TagItems
