
import Image from "next/image";
import Link from "next/link";

export default function  FeaturedImage({post}){
  let img = '';

  const defaultFeaturedImage = "/placeholder.png";
  const defaultHeight = "300";
  const defaultWidth = "300";

  if(post.featuredImage){
    let size = post.featuredImage.node.mediaDetails.sizes[0];
    img ={
        src: size. sourceUrl,
        width: size.width,
        height: size.height,
    }
  }
  else{
    img ={
        src: defaultFeaturedImage,
        width: defaultWidth,
        height: defaultHeight
    }
  }

  return(
    <Link href={`/blog/${post.slug}`}>
        <Image src={img.src} width={img.width} height={img.height} alt={post.title} className="w-full h-[250px] object-cover rounded-t-[20px]"/>
    </Link>
  )
}