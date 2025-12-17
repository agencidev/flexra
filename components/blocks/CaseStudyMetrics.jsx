"use client";

/**
 * CaseStudyMetrics
 *
 * Visar nyckeltal i pastellfärgade kort.
 * Används på case study-sidor för att visa resultat.
 */

const pastelColors = [
  "bg-pink-100",
  "bg-yellow-100",
  "bg-lime-100",
  "bg-indigo-100"
];

export function CaseStudyMetrics({ metrics = [] }) {
  if (!metrics || metrics.length === 0) return null;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {metrics.map((metric, index) => (
        <div
          key={index}
          className={`${pastelColors[index % pastelColors.length]} rounded-2xl p-6 text-center`}
        >
          <span className="text-3xl md:text-4xl font-medium text-gray-900 block">
            {metric.value}
          </span>
          <p className="text-gray-600 text-sm mt-2">
            {metric.label}
          </p>
        </div>
      ))}
    </div>
  );
}

export default CaseStudyMetrics;
