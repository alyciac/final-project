import React from 'react'
import { Route } from 'react-router-dom'

// Helpers
import * as users from '../../api/users'

// Components
import List from './List/List'
import PostsContainer from '../posts/Container'


export default class Container extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      users: [],
      loading: true
    }

    this.refreshUsers = this.refreshUsers.bind(this)
  }

  async componentDidMount () {
    this.refreshUsers().then(() => this.setState({ loading: false }))
  }

  // Internal
  async refreshUsers () {
    const { response } = await users.fetchStudents()
    this.setState({ users: response })
  }

  render () {
    const { currentUserId } = this.props
    const { users, loading } = this.state
    if (loading) return <span/>

    return (
      <main className='container'>
        <Route path='/students' exact component={() => <List users={users} />} />
        <PostsContainer
          currentUserId={currentUserId}
          refreshUsers={this.refreshUsers}
          users={users} />
      </main>
    )
  }
}
