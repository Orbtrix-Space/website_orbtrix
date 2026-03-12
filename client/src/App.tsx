import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Layout } from "@/components/Layout";
import { ScrollToTop } from "@/components/ScrollToTop";
import { PageTransition } from "@/components/PageTransition";
import { AnimatePresence } from "framer-motion";

import Home from "@/pages/Home";
import Products from "@/pages/Products";
import Disha from "@/pages/Disha";
import RigelOS from "@/pages/RigelOS";
import SuperSat from "@/pages/SuperSat";
import Mission from "@/pages/Mission";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/not-found";

function Router() {
  const [location] = useLocation();

  return (
    <Layout>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <PageTransition key={location}>
          <Switch location={location}>
            <Route path="/" component={Home} />
            <Route path="/products" component={Products} />
            <Route path="/products/disha" component={Disha} />
            <Route path="/products/rigel-os" component={RigelOS} />
            <Route path="/products/supersat" component={SuperSat} />
            <Route path="/mission" component={Mission} />
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
            <Route component={NotFound} />
          </Switch>
        </PageTransition>
      </AnimatePresence>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
