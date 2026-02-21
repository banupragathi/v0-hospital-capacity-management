"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Shield, Clock, Users } from "lucide-react"

export function HeroVideo() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
        poster=""
      >
        <source src="/videos/hero-banner.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-foreground/70 via-foreground/50 to-foreground/80" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <div className="animate-fade-in-up">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary-foreground/70">
            Hospital Capacity & Patient Flow Management
          </p>
          <h1 className="text-balance text-4xl font-bold leading-tight tracking-tight text-primary-foreground sm:text-5xl md:text-6xl lg:text-7xl">
            Smarter Patient Flow.
            <br />
            <span className="text-primary">Better Care.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-primary-foreground/80 md:text-xl">
            Optimize hospital capacity and streamline patient journeys with real-time queue management,
            intelligent bed allocation, and role-based dashboards.
          </p>
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row" style={{ animationDelay: "0.3s", animation: "fade-in-up 0.6s ease-out 0.3s forwards", opacity: 0 }}>
          <Button size="lg" asChild className="gap-2 text-base px-8 py-6">
            <Link href="/auth/register">
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild className="gap-2 text-base px-8 py-6 border-primary-foreground/30 text-primary-foreground bg-transparent hover:bg-primary-foreground/10 hover:text-primary-foreground">
            <Link href="/auth/login">Sign In</Link>
          </Button>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3" style={{ animationDelay: "0.6s", animation: "fade-in-up 0.6s ease-out 0.6s forwards", opacity: 0 }}>
          {[
            { icon: Clock, label: "Avg Wait Reduced", value: "40%" },
            { icon: Users, label: "Patients Managed", value: "10,000+" },
            { icon: Shield, label: "Uptime", value: "99.9%" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-2 rounded-xl border border-primary-foreground/10 bg-primary-foreground/5 p-6 backdrop-blur-sm">
              <stat.icon className="h-6 w-6 text-primary" />
              <span className="text-3xl font-bold text-primary-foreground">{stat.value}</span>
              <span className="text-sm text-primary-foreground/60">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="h-8 w-5 rounded-full border-2 border-primary-foreground/30 p-1">
          <div className="h-2 w-1.5 mx-auto rounded-full bg-primary-foreground/50 animate-pulse-soft" />
        </div>
      </div>
    </section>
  )
}
