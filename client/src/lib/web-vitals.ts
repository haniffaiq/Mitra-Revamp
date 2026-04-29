import { onCLS, onINP, onLCP, onFCP, onTTFB, type Metric } from "web-vitals";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function sendToGA(metric: Metric) {
  if (typeof window === "undefined") return;
  const value = metric.name === "CLS" ? Math.round(metric.value * 1000) : Math.round(metric.value);
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "web_vitals",
    metric_name: metric.name,
    metric_id: metric.id,
    metric_value: value,
    metric_rating: metric.rating,
  });
  if (typeof window.gtag === "function") {
    window.gtag("event", metric.name, {
      value,
      metric_id: metric.id,
      metric_rating: metric.rating,
      event_category: "Web Vitals",
      non_interaction: true,
    });
  }
}

export function reportWebVitals() {
  onCLS(sendToGA);
  onINP(sendToGA);
  onLCP(sendToGA);
  onFCP(sendToGA);
  onTTFB(sendToGA);
}
