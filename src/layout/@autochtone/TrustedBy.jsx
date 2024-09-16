import Image from "next/image";

export default function TrustedBy() {
  const trustedByClients = [
    { src: "/bbros.svg", href: "https://www.example.com/bbros" },
    { src: "/bbros.svg", href: "https://www.example.com/client2" },
    { src: "/bbros.svg", href: "https://www.example.com/client3" },
    { src: "/bbros.svg", href: "https://www.example.com/bbros" },
    { src: "/bbros.svg", href: "https://www.example.com/client2" },
    { src: "/bbros.svg", href: "https://www.example.com/client3" },
  ];

  return (
    <div className="flex flex-col gap-20">
      <h1 className="text-2xl	font-bold	text-center">Trusted by</h1>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-20 overflow-scroll">
        {trustedByClients.map((client, index) => (
          <Image
            src={"./bbros.svg"}
            alt="logo"
            width={100}
            height={100}
            key={`trusted-by-${index}`}
          />
        ))}
      </div>
    </div>
  );
}
