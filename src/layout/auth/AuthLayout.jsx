import Image from "next/image";

export default function AuthLayout({ children }) {
 return (
  <div className="container">
   <div className="w-full md:w-[80%] m-auto">
    <div className="grid grid-cols-1 md:grid-cols-2 h-full gap-20">
     {children}
     <div className="hidden md:flex relative overflow-hidden	flex items-center justify-center rounded-md h-full">
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50	z-10"></div>
      <Image src="/assets/icons/key.svg" width={120} height={100} className="absolute top-[30px] z-10" alt="key" />
      <div className="absolute flex flex-col gap-5 z-30 text-white text-center w-3/4	">
       <h1 className="text-4xl	font-bold	">WIN YOUR DREAM CAR WITH US</h1>
       <p className="text-2xl	">Prizes that blow your mind</p>
      </div>
      <Image src="/assets/car.jpeg" alt="car" fill className="rounded-md object-cover	" />
     </div>
    </div>
   </div>
  </div>
 );
}
