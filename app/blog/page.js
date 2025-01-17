"use client";
import React from "react";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { getAllPosts } from "@/lib/post";
import Head from "next/head";
import Link from "next/link";
// import Image from "next/image";
import FeaturedImage from "@/components/FeaturedImage";
import Date from "@/components/Date";

export default function BlogPost(){
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    async function fetchPosts() {
      const allPosts = await getAllPosts();
      // console.log(allPosts);
      setPosts(allPosts.nodes);
    }
    fetchPosts();
  }, []);
  function removeLastWord(excerpt) {
    const word = excerpt.split(' ');

    word.pop();

    return word.join(' ');
  }

  return (
    <>
      <Head>
        <title>Blog</title>
      </Head>
      <section className="min-h-[500px] relative  w-full bg-[url('/blog-bg.jpg')] bg-no-repeat bg-cover bg-center">
        <div className="absolute bg-slate-900 inset-0 z-0 opacity-40"></div>
        <div className="w-full py-3 bg-slate-700 relative z-10 bg-opacity-70">
        <Navbar />
        </div>
        <div>
          <div className="min-h-[50vh] flex flex-col items-center z-10 justify-center relative ">
            <h1 className="text-6xl font-medium text-slate-100">
              Blo<span className="text-yellow-400">G</span>
            </h1>
          </div>
        </div>
      </section>
      <main className="w-full flex justify-center items-center pt-5 pb-5">
        <div className="post-list mt-4 w-full flex justify-center max-w-[1200px] items-center flex-row flex-wrap flex-shrink-0">
          <ul className="gap-10 w-full grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 px-5">
            {posts.map((post) => (
              <li key={post.slug} className="shadow-lg rounded-[20px]">
                <div className="w-full relative rounded-[20px]">
                  <FeaturedImage post={post} />
                  <p className="absolute top-2 left-2 bg-white px-5 py-1 rounded-[20px] shadow">
                    {post.categories.nodes.map((category, index) => (
                      <React.Fragment key={category.slug}>
                        {index > 0 && ', '}
                        <Link href={`/category/${category.slug}`}>{category.name}</Link>
                      </React.Fragment>
                    ))}
                  </p>
                </div>
                <div className="p-5">
                  <h1 className="text-blue text-[21px] font-bold text-slate-500">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h1>
                  <div
                    className="text-[13px]"
                    dangerouslySetInnerHTML={{
                      __html: removeLastWord(post.excerpt),
                    }}
                  ></div>
                  <p className="text-[13px]">Date: <Date dateString={post.date} /> </p>
                  <button className="text-[#1a2ec7]"><Link href={`/blog/${post.slug}`}>Read More</Link></button>
                </div>

              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  );
}
