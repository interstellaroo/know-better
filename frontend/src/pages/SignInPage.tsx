import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { signInSchema } from '@/lib/validation'
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { Checkbox } from "@/components/ui/checkbox";

interface SignInProps {
  heading?: string,
  subheading?: string,
  logo?: {
    url: string,
    src?: string,
    alt: string,
    title: string
  };
  signinText?: string,
  googleText?: string,
  signupText?: string,
  signupUrl?: string,
}

const SignInPage = ({
  heading = "Sign In",
  subheading = "Login to your knowBetter account",
  logo = {
    url: "/",
    alt: "Logo",
    title: "knowBetter",
  },
  signinText = "Sign In",
  googleText = "Sign in with Google",
  signupText = "Don't have an account?",
  signupUrl = "/signup",
}: SignInProps) => {
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  function onSubmit(values: z.infer<typeof signInSchema>) {
    console.log(values);
  }

  return (
    <section className="h-screen bg-muted">
      <div className="flex h-full items-center justify-center">
        <div className="flex w-full max-w-sm flex-col items-center gap-y-8 rounded-md border border-muted bg-white px-6 py-10 shadow-md">
          <div className="flex flex-col items-center gap-y-2">
            <div className="flex items-center gap-1 lg:justify-start">
              <Link to={logo.url}>
                {logo.title}
              </Link>
            </div>
            <h1 className="text-3xl font-semibold">
              {heading}
            </h1>
            {subheading && (
              <p className="text-sm text-muted-foreground">
                {subheading}
              </p>
            )}
          </div>
          <div className="flex w-full flex-col gap-4">
            <div className="flex flex-col gap-4">
              <Form { ...form }>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Enter your email" { ...field } />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Enter your password" type="password" { ...field } />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="remember" className="border-muted-foreground"/>
                      <label
                        htmlFor="remember"
                        className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Remember me
                      </label>
                    </div>
                    <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                      Forgot password
                    </Link>
                  </div>
                  <div className="flex flex-col gap-4">
                    <Button type="submit" className="mt-3 w-full">
                      {signinText}
                  </Button>
                  </div>
                </form>
              </Form>
            </div>
            <div>
              <Button variant="outline" className="w-full">
                <FcGoogle className="mr-2 size-5" />
                {googleText}
              </Button>
            </div>
          </div>
          <div className="flex justify-center gap-1 text-sm text-muted-foreground">
            <p>{signupText}</p>
            <Link to={signupUrl} className="font-medium text-primary hover:underline">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SignInPage
