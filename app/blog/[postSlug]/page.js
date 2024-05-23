import React from 'react';
import { getSinglePost, getPostSlugs } from '@/lib/post.';
import Navbar from '@/components/Navbar';
// import Head from 'next/head';

export default async function SinglePost ({params}) {
  const postData = await getSinglePost(params.postSlug);
  console.log(postData);

  const featuredImageUrl = postData.featuredImage?.node?.mediaDetails?.sizes?.[0]?.sourceUrl || '';
  return (
    <>
      <section className='bg-slate-700 w-full z-20 bg-opacity-70 py-2 absolute' >
         <Navbar className="header-single-post z-10 relative"/>
     </section>
     <article>
        <section className='hero-area h-[60vh] min-h-[30rem] flex relative justify-center items-center bg-cover bg-center bg-no-repeat' style={{backgroundImage: featuredImageUrl ? `url(${featuredImageUrl})` : 'none'}}>
          <div className='bg-black opacity-5 absolute top-0 left-0 h-full w-full z-1'></div>
            <h1 className='text-slate-100' >{postData.title}</h1>   
        </section>
     </article>
    </>
  );
  
}