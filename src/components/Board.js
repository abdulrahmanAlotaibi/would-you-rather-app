import React, { Component } from "react";
import { connect } from "react-redux";
import { List, Image, Container } from "semantic-ui-react";
import { Redirect } from "react-router-dom";
import User from "./User";

class Board extends Component {
  constructor(props) {
    super(props);
    this.sortUsers = this.sortUsers.bind(this);
  }
  sortUsers() {
      const usersScore = this.props.usersIds.map(id => {
      const user = this.props.users[id];
      const { name, avatarURL, answers, questions } = user;
      const questionsScore = Object.keys(questions).length;
      const answersScore = Object.keys(answers).length;
      const totalScore = questionsScore + answersScore;

      return {
        id,
        totalScore
      };
    });
    const sortedUsers = usersScore.sort((a, b) =>
      a.totalScore > b.totalScore ? -1 : 1
    );

    return sortedUsers;
  }
  render() {
    const { usersIds } = this.props;

    return (
      <Container>
        {this.props.authedUser ? (
          this.sortUsers().map(({id, totalScore}) => {
            return <User id={id} key={id} />;
          })
        ) : (
          <Redirect to="/login" />
        )}
      </Container>
    );
  }
}
function mapStateToProps({ authedUser, users }) {
  return {
    authedUser,
    users,
    usersIds: Object.keys(users)
  };
}
export default connect(mapStateToProps)(Board);
