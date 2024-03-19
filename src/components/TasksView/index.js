import {v4 as uuidv4} from 'uuid'
import {Component} from 'react'
import TagItems from '../TagItems'
import DisplayListItems from '../DisplayListItems'

import './index.css'

class TasksView extends Component {
  state = {
    inputValue: '',
    tagName: this.props.tagsList[0].optionId,
    taskList: [],
    displayText: '',
    tagsList: [],
  }

  componentDidMount() {
    const {tagsList} = this.props
    console.log('component')
    const updateList = tagsList.map(each => ({...each, isActive: false}))
    this.setState({tagsList: updateList})
  }

  changeInput = event => {
    this.setState({inputValue: event.target.value})
  }

  changeTagOption = event => {
    this.setState({tagName: event.target.value})
  }

  submitForm = event => {
    event.preventDefault()
    const {inputValue, tagName, tagsList} = this.state
    if (inputValue !== '' && tagName !== '') {
      // const {inputValue, tagName, tagsList} = this.state
      const newObject = {id: uuidv4(), name: inputValue, tagName}

      this.setState(prevState => ({
        taskList: [...prevState.taskList, newObject],
        inputValue: '',
        tagName: tagsList[0].optionId,
      }))
    }
  }

  changedsuccessfull = id => {
    this.setState(prevState => ({
      tagsList: prevState.tagsList.map(each => {
        if (each.optionId === id) {
          return {
            optionId: each.optionId,
            displayText: each.displayText,
            isActive: !each.isActive,
          }
        }
        return {
          optionId: each.optionId,
          displayText: each.displayText,
          isActive: false,
        }
      }),
      displayText: id,
    }))
    const {taskList} = this.state
    const findisActiveThere = taskList.find(each => each.isActive === true)
    console.log(findisActiveThere)
    if (findisActiveThere !== undefined) {
      this.setState({displayText: ''})
    }
  }

  render() {
    const {inputValue, tagName, taskList, tagsList, displayText} = this.state

    // const {tagsList} = this.props
    const updateListOfItem = taskList.filter(each =>
      each.tagName.includes(displayText),
    )
    return (
      <div className="tasks-view-background-container">
        <form className="create-task-view-container" onSubmit={this.submitForm}>
          <h1 className="heading-create-task">Create a task!</h1>
          <div className="input-container">
            <label className="label-text" htmlFor="inputTask">
              Task
            </label>
            <input
              type="text"
              className="input-element"
              id="inputTask"
              placeholder="Enter the task here"
              value={inputValue}
              onChange={this.changeInput}
            />
          </div>

          <br />
          <label className="label-text" htmlFor="tag">
            Tags
          </label>
          <select
            className="input-element"
            id="tag"
            onChange={this.changeTagOption}
            value={tagName}
          >
            {tagsList.map(each => (
              <option value={each.optionId} key={each.optionId}>
                {each.displayText}
              </option>
            ))}
          </select>
          <div className="button-container">
            <button type="submit" className="buttn">
              Add Task
            </button>
          </div>
        </form>

        <div className="task-list-items-container">
          <h1 className="para-text-task-items">Tags</h1>
          <ul className="list-tags-un-ordered-list">
            {tagsList.map(each => (
              <TagItems
                tagsList={each}
                key={each.optionId}
                changedsuccessfull={this.changedsuccessfull}
              />
            ))}
          </ul>
          <h1 className="para-text-task-items">Tasks</h1>
          {updateListOfItem.length > 0 ? (
            <ul className="un-ordered-list-display-list-items">
              {updateListOfItem.map(each => (
                <DisplayListItems taskList={each} key={each.id} />
              ))}
            </ul>
          ) : (
            <div className="container-not-list">
              <p className="no-task-para">No Tasks Added Yet!</p>
            </div>
          )}
        </div>
      </div>
    )
  }
}
export default TasksView
