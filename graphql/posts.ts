
import { gql} from '@apollo/client';

const post = {
  getItems: function(){
    return gql`
    query {
      posts{ 
        edges { 
          node { 
            postId 
            title 
            link 
            date
            content 
          }
        }
      } 
    } 
   `   
  },   
  getItem : function(id: number){
    return gql`
    query {
      postBy(postId: ${id}){
        title
        date
        link
        content
      }
    }      
   `   
  },  
}
export default post;

