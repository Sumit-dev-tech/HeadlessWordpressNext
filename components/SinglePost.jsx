import React from 'react';
import { getSinglePost, getPostSlugs } from '@/lib/post.';
import Head from 'next/head';
export async function getStaticProps({params}){
   const postData = await getSinglePost(params.postSlug);
   console.log(postData);

   return{
     props: {
        postData
     }
   }
}
 export async function getStaticPaths() {
   const postSlugs  = await getPostSlugs();

   return{
     paths:postSlugs.map((s) => (
        {
            params: {
                postSlug: s.slug
            }
        }
     )),
     fallback: flase
   }
   
 }

export default function SinglePost ({postData}) {
  return (
    <> 
     <Head>
        <title key={postData.slug}>{postData.title}</title>
        <meta name='description' content={postData.excerpt} key="metadescription"/>
     </Head>
    </>
  )
}