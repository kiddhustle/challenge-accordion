class Question extends React.Component {

  render () {
    let classes = ['faqs__item__question']
    if (this.props.selected) {
      classes.push('faqs__item__question--selected')
    }
    let classesStr = classes.join(' ')

    return (<div class={classesStr} id={this.props.id} onClick={(e) => {this.props.onClickAnswer(e.target.id)}}>Q: {this.props.question}</div>)
  }
}

class Answer extends React.Component {

  render () {
    let classes = ['faqs__item__answer']
    if (this.props.selected) {
      classes.push('faqs__item__answer--selected')
    }
    let classesStr = classes.join(' ')

    return (<div class={classesStr}>{this.props.answer}</div>)
  }
}

class Item extends React.Component {
  render () {
    return (<div class="faqs__item">
      <Question question={this.props.question} id={this.props.id} selected={this.props.selected} onClickAnswer={this.props.onClickAnswer.bind(this)} />
      <Answer answer={this.props.answer} id={this.props.id} selected={this.props.selected} />
    </div>)
  }
}

class Accordion extends React.Component {
  constructor (props) {
    super(props)

    this.onClickAnswer.bind(this)

    this.state = {
      faqs: []
    }
  }


  onClickAnswer(id) {
    let updateFaqs = this.state.faqs.map((item) => {
      let clickedId = parseInt(id)
      if (item.id === clickedId) {
        item.selected = Boolean(!item.selected)
      }
      return item
    })

    let nextState = {
      faqs: updateFaqs
    }
    this.setState(nextState)
  }

  resetFaqs(faqs) {
    let resetFaqs = faqs.map((item) => {
      item.selected = false
      return item
    })
    return resetFaqs
  }
  async componentDidMount() {
    console.log('component did mount')
      const response = await fetch(this.props.api)
      const data = await response.json()
      data.faqs = this.resetFaqs(data.faqs)
      this.setState(data)
  }

  render() {
    // console.log(this.state)
    if (this.state.faqs.length < 1) {
      return (<p>No questions at the moment..</p>)
    }
    return (
      <div class="faqs">
        {this.state.faqs.map(item => <Item {...item} onClickAnswer={this.onClickAnswer.bind(this)} />

        )}
      </div>
    )
  }
}
