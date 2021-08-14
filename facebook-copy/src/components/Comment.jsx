import React, { Component } from "react";
import "../styles/comment.css";
import testImg from "../assets/images/a.png";

class Comment extends Component {
  state = {};
  render() {
    const { comment } = this.props;
    return (
      <div className="p-2">
        <img className="avatar mr-2" src={testImg} alt="" />

        <div className="comment">
          <p>
            <span className="author">{comment.author.name}</span>{" "}
            {comment.content}
          </p>
        </div>
      </div>
    );
  }
}

export default Comment;
