import React from 'react';
import { getSinglePost, getPostSlugs } from '@/lib/post.';
import Navbar from './Navbar';
// import Head from 'next/head';
export async function getStaticProps({params}){
   const postData = await getSinglePost(params.postSlug);
   let featureImageUrl = "https://wp.procohat.com/wp-content/uploads/2024/04/NewsletterApril2024Img4.jpg";

   if(postData.featureImage.node.mediaDetails.size[0].sourceUrl){
    featureImageUrl = postData.featuredImage.node.mediaDetails.sizes[0].sourceUrl;
   }

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
     fallback: false,
   }
   
 }

export default function SinglePost ({postData, featureImageUrl}) {
  return (
    <> 
     <section className='bg-slate-700 w-full z-20 bg-opacity-70 py-2 absolute' >
         <Navbar className="header-single-post z-10 relative"/>
     </section>
     <article>
        <section className='hero-area h-[60vh] min-h-[30rem]' style={{backgroundImage: featureImageUrl}}>

        </section>
     </article>
    </>
  )
}