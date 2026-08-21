import { Switch, Route, Redirect, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Layout } from "@/components/Layout";
import { ScrollToTop } from "@/components/ScrollToTop";
import { PageTransition } from "@/components/PageTransition";

import Home from "@/pages/Home";
import Products from "@/pages/Products";
import Solutions from "@/pages/Solutions";
import Team from "@/pages/Team";
import News from "@/pages/News";
import NewsPost from "@/pages/NewsPost";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Policy from "@/pages/Policy";
import NotFound from "@/pages/not-found";

function Router() {
  const [location] = useLocation();

  return (
    <Layout>
      <ScrollToTop />
      {/* Keyed on the route so PageTransition replays its enter animation. */}
      <PageTransition key={location}>
        <Switch location={location}>
          <Route path="/" component={Home} />
          <Route path="/products" component={Products} />
          <Route path="/solutions" component={Solutions} />
          <Route path="/team" component={Team} />
          <Route path="/news" component={News} />
          <Route path="/news/:slug" component={NewsPost} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route path="/legal">{() => <Policy kind="legal" />}</Route>
          <Route path="/privacy">{() => <Policy kind="privacy" />}</Route>

          {/* ---- Legacy redirects ----
              The single /product page split into /products (the platform) and
              /solutions (onboard + ground). Old links land on the closest home:
              onboard/ground → /solutions#..., platform pages → /products. */}
          <Route path="/product">{() => <Redirect to="/products" replace />}</Route>
          <Route path="/products/disha">{() => <Redirect to="/products" replace />}</Route>
          <Route path="/disha">{() => <Redirect to="/products" replace />}</Route>
          <Route path="/products/rigel-os">{() => <Redirect to="/solutions#rigel-os" replace />}</Route>
          <Route path="/rigel-os">{() => <Redirect to="/solutions#rigel-os" replace />}</Route>
          {/* Orphaned page with no live route, redirected in case an external
              link points at it. */}
          <Route path="/mission">{() => <Redirect to="/" replace />}</Route>

          <Route component={NotFound} />
        </Switch>
      </PageTransition>
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
