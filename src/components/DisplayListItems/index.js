import './index.css'

const DisplayListItems = props => {
  const {taskList} = props
  const {tagName, name} = taskList
  return (
    <li className="list-items-display-of-list">
      <p className="text-name-item">{name}</p>
      <p className="item-button">
        {tagName}
      </p>
    </li>
  )
}
export default DisplayListItems
