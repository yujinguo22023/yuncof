
import React from "react";
import { Link } from "react-router-dom";
import { ShieldAlert } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";

const Unauthorized = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 flex flex-col items-center text-center">
        <div className="w-20 h-20 rounded-full bg-destructive/20 flex items-center justify-center mb-6">
          <ShieldAlert className="h-10 w-10 text-destructive" />
        </div>
        
        <h1 className="text-4xl font-bold mb-4">Access Denied</h1>
        
        <p className="text-lg text-muted-foreground mb-8 max-w-md">
          You don't have permission to access this page. Please contact an administrator if you believe this is an error.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild>
            <Link to="/">Return to Home</Link>
          </Button>
          
          <Button variant="outline" asChild>
            <Link to="/login">Sign in with a different account</Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Unauthorized;
