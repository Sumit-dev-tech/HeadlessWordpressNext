import React from 'react';
import { getSinglePost, getPostSlugs } from '@/lib/post';
import Navbar from '@/components/Navbar';
// import { empty } from '@apollo/client';
import Date from '@/components/Date';
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
  try{
  const postData = await getSinglePost(params.postSlug);
  // console.log(postData);

  const featuredImageUrl =
  postData.featuredImage &&
  postData.featuredImage.node &&
  postData.featuredImage.node.mediaDetails &&
  postData.featuredImage.node.mediaDetails.sizes &&
  postData.featuredImage.node.mediaDetails.sizes[0] &&
  postData.featuredImage.node.mediaDetails.sizes[0].sourceUrl
    ? postData.featuredImage.node.mediaDetails.sizes[0].sourceUrl
    : null;


  function removeLastWord(excerpt) {
    const word = excerpt.split(' ');

    word.pop();

    return word.join(' ');
  }
}
catch (error){
  console.log("error from catch",error);
}
  return (
    <>
      <section className='bg-slate-700 w-full z-20 bg-opacity-70 py-2 absolute' >
         <Navbar className="header-single-post z-10 relative"/>
     </section>
     <article>
        <section className='hero-area h-[70vh] min-h-[35rem] bg-cover bg-center bg-no-repeat bg-blend-overlay relative' style={{
          backgroundImage: featuredImageUrl ? `url(${featuredImageUrl})` : 'none',
          }}>
          <div className='absolute inset-0 bg-slate-900 opacity-40 h-full'></div>
          <div className='container mx-auto h-full flex flex-col justify-center items-center lg:max-w-4xl gap-3'>
            <h1 className='text-white text-[35px] z-10 mt-10' >{postData.title}</h1>  
            <div className="text-[15px] text-slate-200 pl-4 border-l-4 border-lime-200 z-10" dangerouslySetInnerHTML={{__html: removeLastWord(postData.excerpt)}}/>
         </div>
        </section>
        <section className='blog-content w-full py-10 px-20 flex justify-center'>
          <div className='container w-full'>
            <div className='flex gap-1'>
              <h5 className='flex gap-1'>
              Posted By <img src={postData.author.node.avatar.url} alt={postData.author.node.name} width={30} height={10} className='rounded-[50%]'/>  <span>{postData.author.node.name}</span>
              </h5>
             <h5>last update on <Date dateString={postData.modified}/></h5>
            </div>
            <div dangerouslySetInnerHTML={{__html: postData.content}} />
          </div>
        </section>
     </article>
    </>
  );
}
// export async function PostSlugs (postData){
//   const postSlugs = await getPostSlugs(postData.postSlug);
//   console.log(postSlugs);
// }