"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, CreditCard, Lock, Star, Wallet } from "lucide-react"
import { useContractId } from "@/store/contractId"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function HomePage() {
  const router = useRouter();
  const { contractId } = useContractId();
  
  // If we have a contractId, redirect to dashboard
  useEffect(() => {
    if (contractId) {
      router.push('/dashboard');
    }
  }, [contractId, router]);
  
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Wallet className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Project Stellar</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="#features" className="text-sm font-medium hover:text-primary">
              Features
            </Link>
            <Link href="#testimonials" className="text-sm font-medium hover:text-primary">
              Testimonials
            </Link>
            <Link href="#pricing" className="text-sm font-medium hover:text-primary">
              Pricing
            </Link>
            <Link href="#contact" className="text-sm font-medium hover:text-primary">
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <Link href="/signin">
              <Button variant="outline" size="sm">
                Sign In
              </Button>
            </Link>
            <Link href="/register">
              <Button size="sm">Register</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-28 xl:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Your Digital Identity in the Stellar Network
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Project Stellar creates a secure digital wallet that works as your decentralized ID, with real-world
                    asset verification and loyalty programs.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/register">
                    <Button size="lg" className="px-8">
                      Register Now
                    </Button>
                  </Link>
                  <Link href="#features">
                    <Button size="lg" variant="outline" className="px-8">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative h-[350px] w-[162px] md:h-[450px] md:w-[208px] lg:h-[500px] lg:w-[232px]">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/40 rounded-3xl transform rotate-3 scale-95"></div>
                  <div className="absolute inset-0 bg-card rounded-3xl shadow-xl flex items-center justify-center overflow-hidden">
                    <Image
                      src="/wallet.png"
                      width={828}
                      height={1792}
                      alt="Stellar Card Wallet"
                      className="object-contain w-full h-full"
                      style={{ maxHeight: '100%' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  Key Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Everything You Need in One Card</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                Project Stellar combines the power of blockchain with everyday utility, giving you a secure digital
                  identity that works everywhere.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-4">
              <Card className="border-none shadow-md">
                <CardHeader className="pb-2">
                  <Wallet className="h-12 w-12 text-primary mb-2" />
                  <CardTitle>Stellar Wallet</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Securely store and manage your Stellar assets with our intuitive wallet interface.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-none shadow-md">
                <CardHeader className="pb-2">
                  <CreditCard className="h-12 w-12 text-primary mb-2" />
                  <CardTitle>Digital ID</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Your decentralized identity that integrates with Apple and Google wallets.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-none shadow-md">
                <CardHeader className="pb-2">
                  <Lock className="h-12 w-12 text-primary mb-2" />
                  <CardTitle>RWA Proof</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Verify and prove ownership of real-world assets through secure blockchain validation.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-none shadow-md">
                <CardHeader className="pb-2">
                  <Star className="h-12 w-12 text-primary mb-2" />
                  <CardTitle>Loyalty Programs</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Earn and redeem rewards across multiple platforms with our integrated loyalty system.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">What Our Users Say</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                  Join thousands of satisfied users who have transformed their digital identity with Project Stellar Card.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <Card className="border-none shadow-md">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="font-semibold text-primary">JD</span>
                    </div>
                    <div>
                      <CardTitle className="text-base">John Doe</CardTitle>
                      <CardDescription>Crypto Investor</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    "Project Stellar Card has simplified how I manage my crypto assets. The integration with my Apple Wallet
                    is seamless!"
                  </p>
                </CardContent>
                <CardFooter>
                  <div className="flex text-primary">
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                  </div>
                </CardFooter>
              </Card>
              <Card className="border-none shadow-md">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="font-semibold text-primary">JS</span>
                    </div>
                    <div>
                      <CardTitle className="text-base">Jane Smith</CardTitle>
                      <CardDescription>Business Owner</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    "The loyalty program integration has helped my business attract and retain customers. A game-changer
                    for small businesses!"
                  </p>
                </CardContent>
                <CardFooter>
                  <div className="flex text-primary">
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                  </div>
                </CardFooter>
              </Card>
              <Card className="border-none shadow-md">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="font-semibold text-primary">RJ</span>
                    </div>
                    <div>
                      <CardTitle className="text-base">Robert Johnson</CardTitle>
                      <CardDescription>Tech Enthusiast</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    "The decentralized ID feature gives me peace of mind. I can verify my identity without sharing
                    sensitive personal data."
                  </p>
                </CardContent>
                <CardFooter>
                  <div className="flex text-primary">
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Choose Your Plan</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                  Select the perfect plan that fits your needs and budget.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-3">
              <Card className="border-none shadow-md">
                <CardHeader>
                  <CardTitle>Basic</CardTitle>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold">$0</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  <CardDescription>Perfect for beginners</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>Basic Stellar wallet</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>Digital ID integration</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>Up to 3 assets</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>Community support</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link href="/register" className="w-full">
                    <Button className="w-full">Get Started</Button>
                  </Link>
                </CardFooter>
              </Card>
              <Card className="border-2 border-primary shadow-lg">
                <CardHeader>
                  <div className="inline-block rounded-lg bg-primary px-3 py-1 text-xs text-primary-foreground mb-2">
                    Most Popular
                  </div>
                  <CardTitle>Pro</CardTitle>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold">$9.99</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  <CardDescription>For active crypto users</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>Advanced Stellar wallet</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>Digital ID with RWA proof</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>Unlimited assets</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>Priority support</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>Loyalty program integration</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link href="/register" className="w-full">
                    <Button className="w-full">Get Started</Button>
                  </Link>
                </CardFooter>
              </Card>
              <Card className="border-none shadow-md">
                <CardHeader>
                  <CardTitle>Enterprise</CardTitle>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold">$29.99</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  <CardDescription>For businesses and institutions</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>Enterprise Stellar wallet</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>Advanced Digital ID system</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>Custom RWA verification</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>Dedicated account manager</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>White-label solutions</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>API access</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link href="/contact" className="w-full">
                    <Button variant="outline" className="w-full">
                      Contact Sales
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        <section id="cta" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Ready to Transform Your Digital Identity?
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                  Join thousands of users who have already discovered the power of Project Stellar Card. Get started today!
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/register">
                  <Button size="lg" className="px-8">
                    Register Now
                  </Button>
                </Link>
                <Link href="/signin">
                  <Button size="lg" variant="outline" className="px-8">
                    Sign In
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer id="contact" className="w-full border-t bg-background py-6 md:py-12">
        <div className="container flex flex-col items-center justify-center gap-4 px-4 md:px-6 md:flex-row md:justify-between">
          <div className="flex items-center gap-2">
            <Wallet className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold">Project Stellar</span>
          </div>
          <div className="flex flex-col items-center gap-4 md:flex-row">
            <nav className="flex gap-4 sm:gap-6">
              <Link href="#" className="text-sm font-medium hover:underline underline-offset-4">
                About
              </Link>
              <Link href="#" className="text-sm font-medium hover:underline underline-offset-4">
                Features
              </Link>
              <Link href="#" className="text-sm font-medium hover:underline underline-offset-4">
                Pricing
              </Link>
              <Link href="#" className="text-sm font-medium hover:underline underline-offset-4">
                Support
              </Link>
            </nav>
            <div className="flex items-center gap-4">
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <span className="sr-only">Twitter</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <span className="sr-only">GitHub</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <span className="sr-only">LinkedIn</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
        <div className="container mt-6 flex flex-col items-center justify-center gap-2 md:flex-row md:justify-between">
          <p className="text-center text-sm text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} Project Stellar. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="text-xs text-muted-foreground hover:underline underline-offset-4">
              Privacy Policy
            </Link>
            <Link href="#" className="text-xs text-muted-foreground hover:underline underline-offset-4">
              Terms of Service
            </Link>
            <Link href="#" className="text-xs text-muted-foreground hover:underline underline-offset-4">
              Cookie Policy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Dashboard page component moved to /dashboard/page.tsx
