
import { useParams } from "react-router-dom";
import Layout from "@/components/Layout";
import PropertyDetails from "@/components/PropertyDetails";

const PropertyPage = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <Layout>
      <PropertyDetails />
    </Layout>
  );
};

export default PropertyPage;
