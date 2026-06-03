import { Header } from "@/components/safar/Header";
import { Footer } from "@/components/safar/Footer";
import { ListingCard } from "@/components/safar/ListingCard";
import { mockTours, mockHotels, mockRestaurants } from "@/mocks/listings";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

export default function ExplorePage() {
  return (
    <>
      <Header />
      <main className="flex-1 pt-32 pb-20 px-6">
        <div className="container max-w-6xl mx-auto">
          <p className="text-cyan text-xs uppercase tracking-[0.3em] mb-3">
            Premium Experience
          </p>
          <h1 className="font-heading text-4xl md:text-5xl font-semibold mb-3">
            Experience the Silk Road
          </h1>
          <p className="text-muted-foreground max-w-2xl mb-10">
            Unlock the mysteries of ancient Uzbekistan with curated tours,
            heritage hotels, and authentic dining experiences.
          </p>

          <Tabs defaultValue="tours" className="w-full">
            <TabsList className="h-auto p-0 bg-transparent border-b border-border rounded-none gap-2 w-full justify-start mb-8">
              <TabsTrigger
                value="tours"
                className="text-base data-[state=active]:bg-transparent data-[state=active]:text-cyan data-[state=active]:border-b-2 data-[state=active]:border-cyan rounded-none px-4 py-3"
              >
                Tour Packages
              </TabsTrigger>
              <TabsTrigger
                value="hotels"
                className="text-base data-[state=active]:bg-transparent data-[state=active]:text-cyan data-[state=active]:border-b-2 data-[state=active]:border-cyan rounded-none px-4 py-3"
              >
                Hotels
              </TabsTrigger>
              <TabsTrigger
                value="restaurants"
                className="text-base data-[state=active]:bg-transparent data-[state=active]:text-cyan data-[state=active]:border-b-2 data-[state=active]:border-cyan rounded-none px-4 py-3"
              >
                Restaurants
              </TabsTrigger>
            </TabsList>

            <TabsContent value="tours">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockTours.map((tour) => (
                  <ListingCard
                    key={tour.uuid}
                    href={`/tours/${tour.slug}`}
                    image={tour.image}
                    title={tour.name}
                    description={tour.description}
                    badge={tour.badge}
                    category={tour.category}
                    rating={tour.rating}
                    price={{ label: "Starts From", value: `$${tour.priceUsd}` }}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="hotels">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockHotels.map((hotel) => (
                  <ListingCard
                    key={hotel.uuid}
                    href={`/hotels/${hotel.slug}`}
                    image={hotel.image}
                    title={hotel.name}
                    description={hotel.description}
                    category={hotel.category}
                    rating={hotel.rating}
                    price={{
                      label: "Nightly",
                      value: `$${hotel.pricePerNight}`,
                    }}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="restaurants">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockRestaurants.map((rest) => (
                  <ListingCard
                    key={rest.uuid}
                    href={`/restaurants/${rest.slug}`}
                    image={rest.image}
                    title={rest.name}
                    description={rest.description}
                    category={rest.category}
                    rating={rest.rating}
                    price={{
                      label: "Average Meal",
                      value: `$${rest.averageMeal}`,
                    }}
                    cta="Reserve"
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </>
  );
}
