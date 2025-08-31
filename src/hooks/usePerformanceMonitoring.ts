import { useEffect } from 'react';

// Performance metrics types
interface PerformanceMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
}

// Core Web Vitals thresholds
const THRESHOLDS = {
  LCP: { good: 2500, poor: 4000 },
  FID: { good: 100, poor: 300 },
  CLS: { good: 0.1, poor: 0.25 },
  FCP: { good: 1800, poor: 3000 },
  TTFB: { good: 800, poor: 1800 },
};

const getRating = (value: number, metric: keyof typeof THRESHOLDS): 'good' | 'needs-improvement' | 'poor' => {
  const threshold = THRESHOLDS[metric];
  if (value <= threshold.good) return 'good';
  if (value <= threshold.poor) return 'needs-improvement';
  return 'poor';
};

export const usePerformanceMonitoring = (enableLogging = false) => {
  useEffect(() => {
    // Only monitor in production or when explicitly enabled
    if (import.meta.env.DEV && !enableLogging) return;

    const metrics: PerformanceMetric[] = [];

    // Measure First Contentful Paint (FCP)
    const measureFCP = () => {
      const fcpEntry = performance.getEntriesByName('first-contentful-paint')[0] as PerformanceEntry;
      if (fcpEntry) {
        const metric: PerformanceMetric = {
          name: 'FCP',
          value: Math.round(fcpEntry.startTime),
          rating: getRating(fcpEntry.startTime, 'FCP'),
        };
        metrics.push(metric);
        if (enableLogging) {
          console.log(`FCP: ${metric.value}ms (${metric.rating})`);
        }
      }
    };

    // Measure Largest Contentful Paint (LCP)
    const measureLCP = () => {
      if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          if (lastEntry) {
            const metric: PerformanceMetric = {
              name: 'LCP',
              value: Math.round(lastEntry.startTime),
              rating: getRating(lastEntry.startTime, 'LCP'),
            };
            metrics.push(metric);
            if (enableLogging) {
              console.log(`LCP: ${metric.value}ms (${metric.rating})`);
            }
          }
        });
        try {
          observer.observe({ entryTypes: ['largest-contentful-paint'] });
        } catch (e) {
          // LCP not supported
        }
      }
    };

    // Measure First Input Delay (FID)
    const measureFID = () => {
      if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry: any) => {
            const metric: PerformanceMetric = {
              name: 'FID',
              value: Math.round(entry.processingStart - entry.startTime),
              rating: getRating(entry.processingStart - entry.startTime, 'FID'),
            };
            metrics.push(metric);
            if (enableLogging) {
              console.log(`FID: ${metric.value}ms (${metric.rating})`);
            }
          });
        });
        try {
          observer.observe({ entryTypes: ['first-input'] });
        } catch (e) {
          // FID not supported
        }
      }
    };

    // Measure Cumulative Layout Shift (CLS)
    const measureCLS = () => {
      if ('PerformanceObserver' in window) {
        let clsValue = 0;
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry: any) => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          });
          const metric: PerformanceMetric = {
            name: 'CLS',
            value: Math.round(clsValue * 1000) / 1000,
            rating: getRating(clsValue, 'CLS'),
          };
          // Update existing CLS metric or add new one
          const existingIndex = metrics.findIndex(m => m.name === 'CLS');
          if (existingIndex >= 0) {
            metrics[existingIndex] = metric;
          } else {
            metrics.push(metric);
          }
          if (enableLogging) {
            console.log(`CLS: ${metric.value} (${metric.rating})`);
          }
        });
        try {
          observer.observe({ entryTypes: ['layout-shift'] });
        } catch (e) {
          // CLS not supported
        }
      }
    };

    // Measure Time to First Byte (TTFB)
    const measureTTFB = () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigation) {
        const ttfb = navigation.responseStart - navigation.requestStart;
        const metric: PerformanceMetric = {
          name: 'TTFB',
          value: Math.round(ttfb),
          rating: getRating(ttfb, 'TTFB'),
        };
        metrics.push(metric);
        if (enableLogging) {
          console.log(`TTFB: ${metric.value}ms (${metric.rating})`);
        }
      }
    };

    // Initialize measurements
    const initMeasurements = () => {
      measureFCP();
      measureLCP();
      measureFID();
      measureCLS();
      measureTTFB();
    };

    // Start measuring when DOM is loaded
    if (document.readyState === 'complete') {
      initMeasurements();
    } else {
      window.addEventListener('load', initMeasurements);
    }

    // Send metrics to analytics (in production)
    const sendMetrics = () => {
      if (import.meta.env.PROD && metrics.length > 0) {
        // Here you would send metrics to your analytics service
        // Example: gtag('event', 'web-vitals', { custom_map: { metric_value: 'value' } });
      }
    };

    // Send metrics when page is about to unload
    window.addEventListener('beforeunload', sendMetrics);

    return () => {
      window.removeEventListener('load', initMeasurements);
      window.removeEventListener('beforeunload', sendMetrics);
    };
  }, [enableLogging]);
};