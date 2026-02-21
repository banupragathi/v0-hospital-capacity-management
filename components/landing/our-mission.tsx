"use client"

import { useEffect, useRef, useState } from "react"
import { Target, TrendingDown, Zap, BarChart3 } from "lucide-react"
import { cn } from "@/lib/utils"

const missions = [
  {
    icon: TrendingDown,
    title: "Reduce Wait Times",
    description: "Intelligent queue management and priority-based routing cut average patient wait times by up to 40%.",
  },
  {
    icon: Zap,
    title: "Maximize Capacity",
    description: "Real-time bed management and occupancy tracking ensure every available resource is efficiently utilized.",
  },
  {
    icon: Target,
    title: "Improve Outcomes",
    description: "Faster triage, emergency overrides, and structured patient summaries help clinicians deliver timely care.",
  },
  {
    icon: BarChart3,
    title: "Data-Driven Decisions",
    description: "Comprehensive analytics on patient flow, peak hours, and bed occupancy empower administrators with actionable insights.",
  },
]

export function OurMission() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.2 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="mission" ref={sectionRef} className="relative bg-muted/50 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <div className={cn("transition-all duration-700", isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8")}>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">Our Mission</p>
            <h2 className="mt-3 text-balance text-3xl font-bold text-foreground sm:text-4xl">
              Better Healthcare Through Smarter Systems
            </h2>
            <p className="mt-4 text-pretty text-lg text-muted-foreground leading-relaxed">
              Hospitals worldwide face capacity challenges that lead to overcrowding, long wait times,
              and strained staff. Our mission is to solve these problems not by building more infrastructure,
              but by making existing systems work smarter.
            </p>
            <p className="mt-4 text-pretty text-muted-foreground leading-relaxed">
              MediFlow empowers every stakeholder in the hospital ecosystem, from patients checking
              their queue position to administrators managing beds across wards, with the tools they
              need to contribute to better patient outcomes.
            </p>
          </div>

          <div className={cn("grid grid-cols-1 gap-4 sm:grid-cols-2 transition-all duration-700", isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8")}>
            {missions.map((item, i) => (
              <div
                key={item.title}
                className="rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:shadow-md hover:border-primary/20"
                style={{ transitionDelay: isVisible ? `${(i + 1) * 100}ms` : "0ms" }}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <item.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-3 text-base font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
