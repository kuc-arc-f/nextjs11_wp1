import React from 'react'
import Link from 'next/link';
import Head from 'next/head';
import marked from  'marked'
import client from "../../apollo-client";
//import { gql} from '@apollo/client';
import Layout from '../../components/layout'
//import LibCms from '../../libs/LibCms'
import Posts from '../../graphql/posts';

//
export default function Page({ blog, category_name }) {
//console.log(blog)
  const content = marked(blog.content)
//  const content = ""
  return (
    <Layout>
    <Head><title key="title">{blog.title}</title></Head>      
    <div className="container">
      <Link href="/" >
        <a className="btn btn-outline-primary mt-2">Back</a>
      </Link>
      <hr className="mt-2 mb-2" />
      <div className="show_head_wrap">
          <i className="fas fa-home"></i> ＞
          {blog.title}
      </div>
      <hr /> 
      <h1>{blog.title}</h1>
      Date: {blog.date}<br />
      <hr />
      <div id="post_item" dangerouslySetInnerHTML={{__html: `${content}`}}></div>
      <hr />                 
    </div>
    <style>{`
      div#post_item img{
        max-width : 100%;
        height : auto;
      }
      div#post_item > hr {
        height: 1px;
        background-color: #000;
        border: none;
      }
      .show_head_wrap{ font-size: 1.4rem; }
      `}</style>      
  </Layout>
  )
}
//
export const getStaticPaths = async () => {
  const data:any = await client.query({
    query: Posts.getItems(),
    fetchPolicy: "network-only"
  });  
  const posts = data.data.posts.edges;
//console.log(data);
  const paths = []
  posts.map((item, index) => {
//    console.log(item.node.postId);
    let row = { params: 
      { id: String(item.node.postId) } 
    }
    paths.push(row)
  })
  return {
    paths: paths,
    fallback: false
  } 
};
export const getStaticProps = async context => {
  const postId = context.params.id
  const data:any = await client.query({
    query: Posts.getItem (Number(postId)),
    fetchPolicy: "network-only"
  });
//console.log(data.data.postBy);
  return {
    props: { 
      blog: data.data.postBy,
      category_name: ""
    },
  }
  
};


