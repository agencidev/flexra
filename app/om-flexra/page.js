"use client";

import { PageLayout } from "../../components/PageLayout";

export default function OmFlexraPage() {
  return (
    <PageLayout 
      title="Vi tror på teknik som förenklar, inte komplicerar"
      subtitle="Om Flexra"
    >
      <section className="px-[5%] py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Vår historia
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Flexra grundades med en enkel vision: att göra avancerad teknologi 
              tillgänglig för alla företag, oavsett storlek. Vi såg hur många 
              organisationer kämpade med ineffektiva processer och missade möjligheter 
              att utnyttja AI och automation.
            </p>
            <p className="text-gray-600 leading-relaxed mb-12">
              Idag hjälper vi företag över hela Sverige att transformera sina 
              arbetsflöden och frigöra tid för det som verkligen spelar roll – 
              att skapa värde för sina kunder.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center p-8">
              <p className="text-5xl font-bold text-gray-900 mb-2">50+</p>
              <p className="text-gray-600">Genomförda projekt</p>
            </div>
            <div className="text-center p-8">
              <p className="text-5xl font-bold text-gray-900 mb-2">1000+</p>
              <p className="text-gray-600">Timmar sparade per månad</p>
            </div>
            <div className="text-center p-8">
              <p className="text-5xl font-bold text-gray-900 mb-2">98%</p>
              <p className="text-gray-600">Nöjda kunder</p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-[5%] py-16 md:py-24 bg-gray-50">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Vårt team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-32 h-32 rounded-full bg-gray-200 mx-auto mb-4 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face" 
                  alt="Team member"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-semibold text-lg">Erik Lindqvist</h3>
              <p className="text-gray-600 text-sm">VD & Grundare</p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 rounded-full bg-gray-200 mx-auto mb-4 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face" 
                  alt="Team member"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-semibold text-lg">Anna Bergström</h3>
              <p className="text-gray-600 text-sm">Tech Lead</p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 rounded-full bg-gray-200 mx-auto mb-4 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face" 
                  alt="Team member"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-semibold text-lg">Marcus Holm</h3>
              <p className="text-gray-600 text-sm">AI Specialist</p>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
