import React, { Component } from "react";
import "../styles/post.css";
import testImg from "../assets/images/a.png";
import Comment from "./Comment";

class Post extends Component {
  render() {
    const { post } = this.props;
    console.log(post);
    return (
      <React.Fragment>
        <div className="container post">
          <div className="p-2 pb-3 ">
            <img className="avatar mr-2" src={testImg} alt="" />
            <div className="details">
              <span className="bolded">{post.author.name}</span>
              <span className="soft">{post.date}</span>
            </div>
          </div>

          <p className="p-2 border-bottom">{post.content}</p>
          {post.comments.map(comment => (
            <Comment comment={comment}></Comment>
          ))}
        </div>
      </React.Fragment>
    );
  }
}

export default Post;
