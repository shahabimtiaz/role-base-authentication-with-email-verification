import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-[89vh] flex-col   px-5 justify-center items-center">
   
   <div className="lg:w-[600px] md:w-[500px] border border-black p-2 rounded">
   <h1 className="text-4xl uppercase bg-rose-500 p-3 rounded text-white text-center ">Full stack role base authentication</h1>
    <p className="text-center">Creating a robust role-based authentication system with email verification using Next.js, TypeScript, MongoDB, and Mongoose. Empowering secure access control for your application with modern tech stack.</p>
   </div>
    
    </main>
  );
}
