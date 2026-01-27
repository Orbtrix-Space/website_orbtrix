import { PRODUCTS } from "@/data/content";
import { SectionHeader } from "@/components/SectionHeader";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";

export default function Products() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <SectionHeader
        title="Products"
        subtitle="Mission-critical software systems designed to reduce operational complexity and enable autonomous spacecraft operations."
        align="left"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-16">
        {PRODUCTS.map((product) => (
          <Card
            key={product.id}
            className="bg-neutral-900/20 border border-white/10 hover:border-white/30 transition-colors duration-300"
          >
            <CardContent className="p-8 md:p-10 flex flex-col h-full">
              {/* Header */}
              <div className="flex items-start justify-between mb-8">
                <div className="bg-white/5 p-3 rounded-lg">
                  {product.icon && (
                    <product.icon className="w-8 h-8 text-white" />
                  )}
                </div>

                <Badge
                  variant="outline"
                  className="font-mono uppercase tracking-wider border-yellow-500/40 text-yellow-400"
                >
                  {product.status}
                </Badge>
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold mb-2 tracking-tight">
                {product.name}
              </h3>

              {/* DISHA expansion */}
              {product.name === "DISHA" && (
                <p className="text-sm text-neutral-500 mb-4 font-mono">
                  Digital Infrastructure for Spacecraft Handling & Analytics
                </p>
              )}

              {/* Description */}
              <p className="text-neutral-400 mb-10 leading-relaxed flex-grow">
                {product.description}
              </p>

              {/* Capabilities */}
              <div className="space-y-3 pt-6 border-t border-white/10">
                {product.features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 text-sm text-neutral-300"
                  >
                    <Check className="w-4 h-4 mt-0.5 text-white/70" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
