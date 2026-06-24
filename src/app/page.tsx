import BuyerHeader from "@/components/buyers/Header";
import BuyerHero from "@/components/buyers/Hero";
import BuyerHowItWorks from "@/components/buyers/HowItWorks";
import AIFeatures from "@/components/buyers/AIFeatures";
import ProductCategories from "@/components/buyers/ProductCategories";
import ExportRankings from "@/components/buyers/ExportRankings";
import MarketsReach from "@/components/buyers/MarketsReach";
import ServicePackages from "@/components/buyers/ServicePackages";
import WhyZerixa from "@/components/buyers/WhyZerixa";
import BuyerTrust from "@/components/buyers/Trust";
import ContainerPlannerPromo from "@/components/buyers/ContainerPlannerPromo";
import RFQForm from "@/components/buyers/RFQForm";
import BuyerFooter from "@/components/buyers/Footer";

export default function Home() {
  return (
    <>
      <BuyerHeader />
      <main>
        <BuyerHero />
        <BuyerHowItWorks />
        <AIFeatures />
        <ProductCategories />
        <ExportRankings />
        <MarketsReach />
        <ServicePackages />
        <WhyZerixa />
        <BuyerTrust />
        <ContainerPlannerPromo />
        <RFQForm />
      </main>
      <BuyerFooter />
    </>
  );
}
