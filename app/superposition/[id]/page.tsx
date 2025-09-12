import { notFound } from "next/navigation";
import { Metadata } from "next";
import dynamic from "next/dynamic";

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `superposition (${params.id}) (2025)`,
  };
}

export default async function SuperpositionTestPage({ params }: Props) {
  const { id } = params;

  try {
    const TestComponent = dynamic(() => import(`@/components/superposition/${id}`), {
      ssr: false,
      loading: () => <p>Loading...</p>,
    });
    return <TestComponent />;
  } catch (error) {
    console.error(error);
    notFound();
  }
} 