"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Activity, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/lib/context/auth-context"
import { toast } from "sonner"
import type { UserRole } from "@/lib/types"

export default function RegisterPage() {
  const router = useRouter()
  const { register, state } = useAuth()

  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [role, setRole] = useState<UserRole | "">("")
  const [error, setError] = useState("")

  const handleRegister = async () => {
    if (!name || !phone || !role) {
      setError("Please fill in all fields")
      return
    }
    if (phone.length < 10) {
      setError("Please enter a valid 10-digit phone number")
      return
    }
    setError("")
    const success = await register(name, phone, role as UserRole)
    if (success) {
      toast.success("Registration successful!")
      router.push("/dashboard")
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4 py-12">
      <div className="w-full max-w-md">
        <Link href="/" className="mb-8 flex items-center justify-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
            <Activity className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-2xl font-bold text-foreground">MediFlow</span>
        </Link>

        <Card className="border-border shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-foreground">Create Account</CardTitle>
            <CardDescription className="text-muted-foreground">
              Register to start using MediFlow
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="text-base"
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="reg-phone">Phone Number</Label>
                <Input
                  id="reg-phone"
                  type="tel"
                  placeholder="Enter 10-digit phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                  className="text-base"
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="role">Role</Label>
                <Select value={role} onValueChange={(v) => setRole(v as UserRole)}>
                  <SelectTrigger id="role" className="text-base">
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="patient">Patient</SelectItem>
                    <SelectItem value="nurse">Nurse</SelectItem>
                    <SelectItem value="doctor">Doctor</SelectItem>
                    <SelectItem value="admin">Admin / Receptionist</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {error && <p className="text-sm text-destructive">{error}</p>}

              <Button onClick={handleRegister} className="w-full gap-2 mt-2" disabled={state.isLoading}>
                {state.isLoading ? "Creating account..." : "Create Account"}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/auth/login" className="font-medium text-primary hover:underline">
                Sign in here
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
