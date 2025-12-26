import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import MerchantDetail from "@/pages/merchant-detail";
import Insight from "@/pages/insight";
import InsightDetail from "@/pages/insight-detail";
import Login from "@/pages/login";
import Register from "@/pages/register";
import Merchants from "@/pages/merchants";
import BecomeMerchant from "@/pages/become-merchant";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/insight" component={Insight} />
      <Route path="/insight/:id" component={InsightDetail} />
      <Route path="/merchants" component={Merchants} />
      <Route path="/become-merchant" component={BecomeMerchant} />
      <Route path="/merchant/:id" component={MerchantDetail} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route component={NotFound} />
    </Switch>
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
