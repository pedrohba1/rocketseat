import React, { Component } from "react";
import Post from "./Post";

class PostList extends Component {
  state = {
    posts: [
      {
        id: 1,
        author: {
          name: "Julio Alcantara",
          avatar: "https://imgur.com/gallery/6z2f1c7"
        },
        date: "04 Jun 2019",
        content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.`,
        comments: [
          {
            id: 1,
            author: {
              name: "Diego Fernandes",
              avatar: "http://url-da-imagem.com/imagem.jpg"
            },
            content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.`
          }
        ]
      },
      {
        id: 1,
        author: {
          name: "Julio Alcantara",
          avatar: "https://imgur.com/gallery/6z2f1c7"
        },
        date: "04 Jun 2019",
        content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.`,
        comments: [
          {
            id: 1,
            author: {
              name: "Diego Fernandes",
              avatar: "http://url-da-imagem.com/imagem.jpg"
            },
            content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.`
          }
        ]
      }
    ]
  };

  render() {
    return (
      <React.Fragment>
        {this.state.posts.map(post => (
          <div className="container mt-5">
            <Post key={post.id} post={post}></Post>
          </div>
        ))}
      </React.Fragment>
    );
  }
}

export default PostList;
