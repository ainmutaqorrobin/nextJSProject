import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1 style={{ color: "white", textAlign: "center" }}>
        Time to get started!
      </h1>
      <p>
        <Link href="/meals">Meal page</Link>
      </p>
      <p>
        <Link href="/meals/share">Meal page</Link>
      </p>
      <p>
        <Link href="/community">Community page</Link>
      </p>
    </main>
  );
}
