import bgImage from "./duality.jpg";

export default function Home() {
  return (
    <div
      className="flex-1 min-h-screen w-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bgImage.src})` }}
    />
  );
}
