import H1 from '@/components/h1';
import Image from 'next/image';

type EventPageProps = {
  params: {
    slug: string;
  };
};

export default async function EventPage({ params }: EventPageProps) {
  const slug = params.slug;
  const response = await fetch(
    `https://bytegrad.com/course-assets/projects/evento/api/events/${slug}`
  );
  const event = await response.json();

  return (
    <main>
      <section className="relative flex justify-center items-center  overflow-hidden py-14 md:py-20">
        <Image
          src={event.imageUrl}
          alt="Event background image"
          className="object-fit z-0 blur-3xl"
          fill
          quality={50}
          sizes="(max-width: 1280px) 100vw, 1280px"
          priority
        />

        <div className="z-1 flex flex-col gap-6 lg:gap-16 lg:flex-row relative">
          <Image
            src={event.imageUrl}
            alt={event.name}
            width={300}
            height={200}
            className="rounded-xl border-2 border-white/50 object-cover"
          />

          <div className="flex flex-col">
            <p className="text-white/75">
              {new Date(event.date).toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
              })}
            </p>

            <H1 className="mb-2 mt-1 whitespace-nowrap lg:text-5xl">
              {event.name}
            </H1>

            <p className="whitespace-nowrap text-xl text-white/75">
              Organized by <span className="italic">{event.organizerName}</span>
            </p>

            <button className="bg-white/20 text-lg capitalize mt-5 lg:mt-auto w-[95vw] rounded-md border-white/10 border-2 bg-blur sm:w-full py-2 state-effects">
              Get tickets
            </button>
          </div>
        </div>
      </section>

      <div className="min-h-[75vh] text-center px-5 py-16">
        <Section>
          <SectionHeading>About this event</SectionHeading>
          <SectionContent>{event.description}</SectionContent>
        </Section>

        <Section>
          <SectionHeading>Location</SectionHeading>
          <SectionContent>{event.location}</SectionContent>
        </Section>
      </div>
    </main>
  );
}

function Section({ children }: { children: React.ReactNode }) {
  return <section className="mb-12">{children}</section>;
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return <section className="text-2xl mb-8">{children}</section>;
}

function SectionContent({ children }: { children: React.ReactNode }) {
  return (
    <section className="text-lg leading-8 text-white/75 max-w-4xl mx-auto">
      {children}
    </section>
  );
}
