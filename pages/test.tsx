import React, {Component} from 'react';
import client from "../apollo-client";
import { gql} from '@apollo/client';

//
export default class Test extends Component {
  static async getInitialProps(ctx) {
    const data:any = await client.query({
      query: gql`
      query {
        posts{ 
          edges { 
            node { 
              postId 
              title 
              link 
              date 
            }
          }
        } 
      }      
      `,
      fetchPolicy: "network-only"
    });
//console.log(data.data);   
    return {
      items: data.data.posts.edges,
    }
  }  
  constructor(props){
    super(props)
console.log(props);
  }
  componentDidMount(){
  }   
  render() {
    return (
    <div className="container">
      <h1>test</h1>
    </div>
    )    
  } 
}
