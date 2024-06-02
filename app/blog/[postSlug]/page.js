import React from 'react';
import { getSinglePost, getPostSlugs } from '@/lib/post';
import Navbar from '@/components/Navbar';
// import Head from 'next/head';
export async function generateMetadata({ params }) {
  const postData = await getSinglePost(params.postSlug);
  return {
    title: `${postData.title} - Headless WordPress`,
    description: postData.excerpt || postData.metaDescription || "Default meta description if none is provided.",
    openGraph: {
      title: postData.title,
      description: postData.excerpt || postData.metaDescription || "Default meta description if none is provided.",
      images: [
        {
          url: postData.featuredImage?.node?.mediaDetails?.sizes[0]?.sourceUrl || "/placeholder.png",
        },
      ],
      type: 'article',
    },
  };
}

export default async function SinglePost ({params}) {
  const postData = await getSinglePost(params.postSlug);
  console.log(postData);

  const featuredImageUrl = postData.featuredImage?.node?.mediaDetails?.sizes[0]?.sourceUrl || "/placeholder.png";
  return (
    <>
      <section className='bg-slate-700 w-full z-20 bg-opacity-70 py-2 absolute' >
         <Navbar className="header-single-post z-10 relative"/>
     </section>
     <article>
        <section className='hero-area h-[60vh] min-h-[30rem] flex relative justify-center items-center bg-cover bg-center bg-no-repeat bg-blend-overlay' style={{backgroundImage: featuredImageUrl ? `url(${featuredImageUrl})` : '/placeholder.png'}}>
          <div className=''></div>
            <h1 className='text-white text-[35px] z-1' >{postData.title}</h1>   
        </section>
     </article>
    </>
  );
}
// export async function PostSlugs (postData){
//   const postSlugs = await getPostSlugs(postData.postSlug);
//   console.log(postSlugs);
// }