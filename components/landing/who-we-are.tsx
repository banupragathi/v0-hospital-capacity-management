"use client"

import { useEffect, useRef, useState } from "react"
import { Heart, Stethoscope, Building2 } from "lucide-react"
import { cn } from "@/lib/utils"

const features = [
  {
    icon: Heart,
    title: "Patient-Centered",
    description:
      "Every feature is designed to reduce patient wait times, improve transparency, and deliver a seamless healthcare experience from arrival to discharge.",
  },
  {
    icon: Stethoscope,
    title: "Clinician-Empowered",
    description:
      "Role-based dashboards give doctors and nurses instant access to patient data, priority management, and emergency controls when seconds matter.",
  },
  {
    icon: Building2,
    title: "Infrastructure-Optimized",
    description:
      "We maximize existing hospital resources through intelligent bed management, smart queue routing, and real-time capacity analytics without adding physical infrastructure.",
  },
]

export function WhoWeAre() {
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
    <section id="about" ref={sectionRef} className="relative overflow-hidden py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className={cn("text-center transition-all duration-700", isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Who We Are</p>
          <h2 className="mt-3 text-balance text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            Transforming Hospital Operations
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-lg text-muted-foreground">
            MediFlow is a comprehensive hospital management platform built to optimize patient flow
            and capacity utilization using technology that works with your existing setup.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className={cn(
                "group rounded-2xl border border-border bg-card p-8 transition-all duration-700 hover:shadow-lg hover:border-primary/20",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
              style={{ transitionDelay: isVisible ? `${(i + 1) * 150}ms` : "0ms" }}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-foreground">{feature.title}</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
