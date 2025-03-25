
import { useParams } from "react-router-dom";
import Layout from "@/components/Layout";
import PropertyDetails from "@/components/PropertyDetails";

const PropertyPage = () => {
  const { id } = useParams<{ id: string }>();
  
  // Make sure id is not undefined, with a fallback
  const propertyId = id || "1";

  return (
    <Layout>
      <PropertyDetails id={propertyId} />
    </Layout>
  );
};

export default PropertyPage;
