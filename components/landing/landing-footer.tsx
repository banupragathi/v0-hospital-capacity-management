import Link from "next/link"
import { Activity } from "lucide-react"

export function LandingFooter() {
  return (
    <footer className="border-t border-border bg-muted/30 py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Activity className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold text-foreground">MediFlow</span>
            </Link>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Optimizing hospital capacity and patient flow with intelligent technology.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground">Product</h4>
            <ul className="mt-3 flex flex-col gap-2">
              {["Patient Portal", "Nurse Dashboard", "Doctor Dashboard", "Admin Panel"].map((item) => (
                <li key={item}>
                  <span className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground">Resources</h4>
            <ul className="mt-3 flex flex-col gap-2">
              {["Documentation", "API Reference", "Support", "Contact"].map((item) => (
                <li key={item}>
                  <span className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground">Legal</h4>
            <ul className="mt-3 flex flex-col gap-2">
              {["Privacy Policy", "Terms of Service", "HIPAA Compliance", "Data Security"].map((item) => (
                <li key={item}>
                  <span className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-sm text-muted-foreground">2026 MediFlow. All rights reserved.</p>
          <p className="text-sm text-muted-foreground">Built for better healthcare.</p>
        </div>
      </div>
    </footer>
  )
}
