"use client"

import { useEffect, useRef, useState } from "react"
import { QrCode, ClipboardList, MonitorDot, BedDouble } from "lucide-react"
import { cn } from "@/lib/utils"

const steps = [
  {
    number: "01",
    icon: QrCode,
    title: "Scan & Arrive",
    description: "Patients scan a QR code on arrival to register as General or Emergency, instantly entering the digital queue.",
  },
  {
    number: "02",
    icon: ClipboardList,
    title: "Digital Intake",
    description: "Complete a digital survey with symptoms, severity self-assessment, and ward preference. A unique token is generated immediately.",
  },
  {
    number: "03",
    icon: MonitorDot,
    title: "Smart Queue & Triage",
    description: "Our system routes patients by priority. Nurses update statuses, doctors see structured summaries, and emergency overrides work in real time.",
  },
  {
    number: "04",
    icon: BedDouble,
    title: "Bed Assignment & Care",
    description: "Admins manage bed allocation across wards with a visual grid. Analytics track occupancy, wait times, and patient flow continuously.",
  },
]

export function HowWeWork() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="how-it-works" ref={sectionRef} className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className={cn("text-center transition-all duration-700", isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">How It Works</p>
          <h2 className="mt-3 text-balance text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            From Arrival to Care in 4 Steps
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-lg text-muted-foreground">
            Our streamlined process ensures every patient receives timely, organized care.
          </p>
        </div>

        <div className="relative mt-16">
          {/* Connecting line */}
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-border lg:block" />

          <div className="flex flex-col gap-12 lg:gap-0">
            {steps.map((step, i) => (
              <div
                key={step.number}
                className={cn(
                  "relative transition-all duration-700",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
                  i % 2 === 0 ? "lg:pr-[55%]" : "lg:pl-[55%]"
                )}
                style={{ transitionDelay: isVisible ? `${(i + 1) * 200}ms` : "0ms" }}
              >
                {/* Node on the timeline */}
                <div className="absolute left-1/2 top-6 hidden h-4 w-4 -translate-x-1/2 rounded-full border-4 border-primary bg-background lg:block" />

                <div className="group rounded-2xl border border-border bg-card p-8 transition-all hover:shadow-lg hover:border-primary/20 lg:mb-12">
                  <div className="flex items-start gap-5">
                    <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <step.icon className="h-7 w-7" />
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-primary">Step {step.number}</span>
                      <h3 className="mt-1 text-xl font-semibold text-foreground">{step.title}</h3>
                      <p className="mt-2 text-muted-foreground leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
