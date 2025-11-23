import React from 'react';

export default function HighlightsCarousel({ items = [] }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold text-gray-800">Highlights</h3>
      </div>
      <div className="flex space-x-4 overflow-x-auto pb-2">
        {items.map((item) => (
          <div key={item.id} className="min-w-[220px] bg-white border border-gray-100 rounded-lg p-4 shadow-sm">
            <div className="font-semibold text-gray-800">{item.title}</div>
            <div className="text-sm text-gray-600 mt-2">{item.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
