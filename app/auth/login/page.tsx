"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Activity, Phone, KeyRound, ArrowRight, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { useAuth } from "@/lib/context/auth-context"
import { toast } from "sonner"

export default function LoginPage() {
  const router = useRouter()
  const { loginWithPhone, loginWithCredentials, loginAsRole, state } = useAuth()

  const [phone, setPhone] = useState("")
  const [otp, setOtp] = useState("")
  const [otpSent, setOtpSent] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")

  const handleSendOtp = () => {
    if (phone.length < 10) {
      setError("Please enter a valid 10-digit phone number")
      return
    }
    setError("")
    setOtpSent(true)
    toast.success("OTP sent to your phone (demo: use any 6 digits)")
  }

  const handleVerifyOtp = async () => {
    if (otp.length < 6) {
      setError("Please enter the complete OTP")
      return
    }
    setError("")
    const success = await loginWithPhone(phone)
    if (success) {
      toast.success("Login successful!")
      router.push("/dashboard")
    } else {
      setError("Phone number not found. Try a demo account or register.")
    }
  }

  const handleCredentialLogin = async () => {
    if (!username || !password) {
      setError("Please fill in all fields")
      return
    }
    setError("")
    const success = await loginWithCredentials(username, password)
    if (success) {
      toast.success("Login successful!")
      router.push("/dashboard")
    } else {
      setError("Invalid credentials. Try a demo account below.")
    }
  }

  const handleQuickLogin = (role: "patient" | "nurse" | "doctor" | "admin") => {
    loginAsRole(role)
    toast.success(`Logged in as ${role}`)
    router.push("/dashboard")
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link href="/" className="mb-8 flex items-center justify-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
            <Activity className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-2xl font-bold text-foreground">MediFlow</span>
        </Link>

        <Card className="border-border shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-foreground">Welcome Back</CardTitle>
            <CardDescription className="text-muted-foreground">
              Sign in to access your dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="phone" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="phone" className="gap-1.5">
                  <Phone className="h-3.5 w-3.5" />
                  Phone + OTP
                </TabsTrigger>
                <TabsTrigger value="credentials" className="gap-1.5">
                  <KeyRound className="h-3.5 w-3.5" />
                  Credentials
                </TabsTrigger>
              </TabsList>

              <TabsContent value="phone" className="mt-4">
                <div className="flex flex-col gap-4">
                  {!otpSent ? (
                    <>
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="Enter 10-digit phone number"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                          className="text-base"
                        />
                      </div>
                      <Button onClick={handleSendOtp} className="w-full gap-2" disabled={state.isLoading}>
                        Send OTP
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </>
                  ) : (
                    <>
                      <div className="flex flex-col items-center gap-3">
                        <Label>Enter OTP sent to {phone}</Label>
                        <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                        <button
                          onClick={() => { setOtpSent(false); setOtp("") }}
                          className="text-sm text-primary hover:underline"
                        >
                          Change phone number
                        </button>
                      </div>
                      <Button onClick={handleVerifyOtp} className="w-full gap-2" disabled={state.isLoading}>
                        {state.isLoading ? "Verifying..." : "Verify & Sign In"}
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="credentials" className="mt-4">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="username">Email or Username</Label>
                    <Input
                      id="username"
                      type="text"
                      placeholder="Enter your email or username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="text-base"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pr-10 text-base"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  <Button onClick={handleCredentialLogin} className="w-full gap-2" disabled={state.isLoading}>
                    {state.isLoading ? "Signing in..." : "Sign In"}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </TabsContent>
            </Tabs>

            {error && (
              <p className="mt-3 text-sm text-destructive text-center">{error}</p>
            )}

            {/* Quick Demo Login */}
            <div className="mt-6 border-t border-border pt-6">
              <p className="mb-3 text-center text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Quick Demo Access
              </p>
              <div className="grid grid-cols-2 gap-2">
                {([
                  { role: "patient" as const, label: "Patient", color: "bg-priority-mild/10 text-priority-mild hover:bg-priority-mild/20 border border-priority-mild/20" },
                  { role: "nurse" as const, label: "Nurse", color: "bg-priority-moderate/10 text-priority-moderate hover:bg-priority-moderate/20 border border-priority-moderate/20" },
                  { role: "doctor" as const, label: "Doctor", color: "bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20" },
                  { role: "admin" as const, label: "Admin", color: "bg-priority-severe/10 text-priority-severe hover:bg-priority-severe/20 border border-priority-severe/20" },
                ]).map((item) => (
                  <Button
                    key={item.role}
                    variant="ghost"
                    onClick={() => handleQuickLogin(item.role)}
                    className={`text-sm font-medium ${item.color}`}
                  >
                    {item.label}
                  </Button>
                ))}
              </div>
            </div>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              {"Don't have an account? "}
              <Link href="/auth/register" className="font-medium text-primary hover:underline">
                Register here
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
