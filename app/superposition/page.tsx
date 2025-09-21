import { notFound } from "next/navigation";
import { Metadata } from "next";
import dynamic from "next/dynamic";

type Props = {
  params: { id: string };
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Superposition (2025)`,
  };
}

export default async function SuperpositionTestPage() {


  try {
    const TestComponent = dynamic(() => import(`@/components/superposition/5`), {
      ssr: false,
      loading: () => <p>Loading...</p>,
    });
    return <TestComponent />;
  } catch (error) {
    console.error(error);
    notFound();
  }
} 