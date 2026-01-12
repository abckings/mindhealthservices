import { auth, signIn } from "@/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Github, Chrome } from "lucide-react"

export default async function LoginPage() {
  const session = await auth()

  // If already logged in, we might want to redirect.
  // For now, let's just show the user status.
  // But typically a login page should redirect to dashboard if logged in.
  // We'll leave that logic for middleware or client-side for now.

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
            <Button variant="outline" className="w-full" type="submit">
              <Chrome className="mr-2 h-4 w-4" />
              Google
            </Button>
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
              await signIn("credentials", formData)
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
              <Button className="w-full" type="submit">
                Sign In
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
            <p className="text-xs text-center text-muted-foreground mt-2">
            By clicking continue, you agree to our Terms of Service and Privacy Policy.
            </p>
        </CardFooter>
      </Card>
    </div>
  )
}
