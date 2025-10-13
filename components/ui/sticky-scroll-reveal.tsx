"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const StickyScroll = ({ content }: { content: any[] }) => {
  const [firstItem, ...restItems] = content;
  
  return (
    <div className="relative">
      {/* Mobile Title - visible only on mobile */}
      <div className="lg:hidden mb-8">
        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent leading-tight">
          {firstItem?.title}
        </h2>
      </div>

      {/* Desktop Background Title - hidden on mobile */}
      <div className="hidden lg:block absolute top-0 left-0 w-1/3 h-auto p-8 z-0">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent leading-tight">
          {firstItem?.title}
        </h2>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full relative z-10">
      {/* Empty spacer for top-left position */}
      <div className="hidden lg:block" />

      {/* First content card */}
      <Card className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-200 hover:-translate-y-1">
        <CardHeader>
          {firstItem?.subtitle && (
            <CardTitle className="text-xl font-semibold text-gray-900 flex items-center gap-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center">
                <span className="text-orange-600 font-bold text-lg">1</span>
              </div>
              {firstItem.subtitle}
            </CardTitle>
          )}
        </CardHeader>
        <CardContent>
          <p className="text-base text-gray-600 leading-relaxed whitespace-pre-line">
            {firstItem?.description}
          </p>
        </CardContent>
      </Card>

      {/* Remaining 4 content cards */}
      {restItems.map((item, index) => (
        <Card
          key={item.subtitle + index}
          className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-200 hover:-translate-y-1"
        >
          <CardHeader>
            {item.subtitle && (
              <CardTitle className="text-xl font-semibold text-gray-900 flex items-center gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center">
                  <span className="text-orange-600 font-bold text-lg">{index + 2}</span>
                </div>
                {item.subtitle}
              </CardTitle>
            )}
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-base text-gray-600 leading-relaxed whitespace-pre-line">
              {item.description}
            </p>

            {item.quote && (
              <blockquote className="border-l-4 border-orange-500 pl-4 py-3 italic text-gray-700 text-base bg-gradient-to-r from-orange-50 to-red-50 rounded-r-lg">
                &quot;{item.quote}&quot;
              </blockquote>
            )}

            {item.additionalContent && (
              <p className="text-base text-gray-600 leading-relaxed whitespace-pre-line pt-4 border-t border-gray-200">
                {item.additionalContent}
              </p>
            )}
          </CardContent>
        </Card>
      ))}
      </div>
    </div>
  );
};