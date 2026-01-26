import { auth, signIn } from "@/auth"
import { SubmitButton } from "@/components/ui/submit-button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Chrome } from "lucide-react"
import { redirect } from "next/navigation"

export default async function LoginPage() {
  const session = await auth()

  if (session?.user) {
    redirect('/dashboard')
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Sign in</CardTitle>
          <CardDescription className="text-center">
            Choose your preferred sign in method
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <form
            action={async () => {
              "use server"
              await signIn("google")
            }}
          >
            <SubmitButton variant="outline" className="w-full" loadingText="Connecting...">
              <Chrome className="mr-2 h-4 w-4" />
              Google
            </SubmitButton>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          <form
            action={async (formData) => {
              "use server"
              try {
                await signIn("credentials", formData)
              } catch (error) {
                // Log the error to server console to see details
                console.error("Sign in error:", error);

                if (error instanceof Error && error.message.includes("NEXT_REDIRECT")) {
                  throw error;
                }
                throw error;
              }
            }}
          >
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="m@example.com" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" required />
              </div>
              <SubmitButton className="w-full" loadingText="Signing In...">
                Sign In
              </SubmitButton>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <p className="text-xs text-center text-muted-foreground mt-2">
            By clicking continue, you agree to our Terms of Service and Privacy Policy.
          </p>
        </CardFooter >
      </Card >
    </div >
  )
}
