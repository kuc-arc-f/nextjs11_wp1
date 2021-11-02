
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
            categories {
              edges { 
                node {
                  id
                  name 
                } 
              }            
            }            
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
        categories {
          edges { 
            node {
              id
              name 
            } 
          }            
        }        
      }
    }
   `   
  },  
}
export default post;

