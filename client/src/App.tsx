import { Switch, Route, Redirect, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Layout } from "@/components/Layout";
import { ScrollToTop } from "@/components/ScrollToTop";
import { PageTransition } from "@/components/PageTransition";
import { BootScreen } from "@/components/BootScreen";

import Home from "@/pages/Home";
import Disha from "@/pages/Disha";
import Solutions from "@/pages/Solutions";
import Netra from "@/pages/solutions/Netra";
import Nexus from "@/pages/solutions/Nexus";
import OnboardOptical from "@/pages/solutions/OnboardOptical";
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
          <Route path="/disha" component={Disha} />
          {/* Solutions: an index, and one page per capability. Listed before
              the index route for readability — wouter matches these paths
              exactly, so /solutions never swallows /solutions/netra. */}
          <Route path="/solutions/netra" component={Netra} />
          <Route path="/solutions/nexus" component={Nexus} />
          <Route path="/solutions/onboard-optical" component={OnboardOptical} />
          <Route path="/solutions" component={Solutions} />
          <Route path="/team" component={Team} />
          <Route path="/news" component={News} />
          <Route path="/news/:slug" component={NewsPost} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route path="/legal">{() => <Policy kind="legal" />}</Route>
          <Route path="/privacy">{() => <Policy kind="privacy" />}</Route>

          {/* ---- Legacy redirects ----
              The single /product page split into the platform page and
              /solutions (onboard + ground); the platform page was briefly
              /lokah, and is now /disha. Old links land on the closest home
              rather than 404-ing. */}
          <Route path="/product">{() => <Redirect to="/disha" replace />}</Route>
          <Route path="/products">{() => <Redirect to="/disha" replace />}</Route>
          <Route path="/products/disha">{() => <Redirect to="/disha" replace />}</Route>
          <Route path="/lokah">{() => <Redirect to="/disha" replace />}</Route>
          <Route path="/products/rigel-os">{() => <Redirect to="/solutions#rigel-os" replace />}</Route>
          <Route path="/rigel-os">{() => <Redirect to="/solutions#rigel-os" replace />}</Route>
          {/* Nexus, Netra and optical processing were sections on /solutions
              before each became its own page. */}
          <Route path="/netra">{() => <Redirect to="/solutions/netra" replace />}</Route>
          <Route path="/nexus">{() => <Redirect to="/solutions/nexus" replace />}</Route>
          <Route path="/solutions/optical">{() => <Redirect to="/solutions/onboard-optical" replace />}</Route>
          {/* Mission #1 was removed from the site. These three URLs were live,
              so they redirect rather than 404 — /disha is where the autonomy
              argument now lives. */}
          <Route path="/mission-1">{() => <Redirect to="/disha" replace />}</Route>
          <Route path="/mission">{() => <Redirect to="/disha" replace />}</Route>
          <Route path="/mission1">{() => <Redirect to="/disha" replace />}</Route>

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
        <BootScreen />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
