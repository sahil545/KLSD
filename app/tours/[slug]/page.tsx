import { TourData } from '../../../app/snorkeling-tours-template/data';
import SnorkelingToursTemplate from '../../../app/snorkeling-tours-template/SnorkelingToursTemplate';
import { notFound } from 'next/navigation';

// 🎯 Define all 20 tours at build time
export async function generateStaticParams() {
  const tours = [
    'christ-of-the-abyss',
    'molasses-reef-snorkel', 
    'coral-gardens-adventure',
    'spiegel-grove-wreck',
    'french-reef-exploration',
    'john-pennekamp-discovery',
    'key-largo-reef-tour',
    'sunset-snorkel-cruise',
    'half-day-snorkel-trip',
    'full-day-snorkel-adventure',
    'private-snorkel-charter',
    'family-snorkel-experience',
    'beginner-snorkel-lesson',
    'advanced-reef-exploration',
    'photography-snorkel-tour',
    'night-snorkel-adventure',
    'eco-snorkel-experience',
    'glass-bottom-boat-snorkel',
    'dolphin-encounter-snorkel',
    'turtle-watching-tour'
  ];

  return tours.map((slug) => ({
    slug,
  }));
}

// 📦 Get tour data (static at build time)
async function getTourData(slug: string): Promise<TourData | null> {
  // Import tour data from individual files
  try {
    const tourModule = await import(`../../../data/tours/${slug}.ts`);
    return tourModule.tourData;
  } catch (error) {
    console.warn(`Tour data not found for: ${slug}`);
    return null;
  }
}

// 🚀 Static page generation
export default async function TourPage({ 
  params 
}: { 
  params: { slug: string } 
}) {
  const tourData = await getTourData(params.slug);

  if (!tourData) {
    notFound();
  }

  return <SnorkelingToursTemplate data={tourData} />;
}

// 🔍 SEO metadata (generated at build time)
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const tourData = await getTourData(params.slug);

  if (!tourData) {
    return {
      title: 'Tour Not Found | Key Largo Scuba Diving',
    };
  }

  return {
    title: `${tourData.name} | Key Largo Scuba Diving`,
    description: tourData.description,
    keywords: [
      tourData.name,
      'Key Largo',
      'snorkeling tour',
      'diving',
      ...tourData.categories,
    ].join(', '),
    openGraph: {
      title: tourData.name,
      description: tourData.description,
      images: [
        {
          url: tourData.images.hero,
          alt: tourData.name,
        },
      ],
      type: 'website',
    },
  };
}
