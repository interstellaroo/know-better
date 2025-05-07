import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { signUpSchema } from "@/lib/validation";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";

interface SignUpProps {
  heading?: string,
  subheading?: string,
  logo?: {
    url: string,
    alt: string,
    title: string
  };
  signupText?: string,
  googleText?: string,
  signinText?: string,
  signinUrl?: string,
}

const SignUpPage = ({
  heading = "Signup",
  subheading = "Create new knowBetter account",
  logo = {
    url: "/",
    alt: "Logo",
    title: "knowBetter",
  },
  signupText = "Create an account",
  googleText = "Sign up with Google",
  signinText = "Already have an account?",
  signinUrl = "/signin",
}: SignUpProps) => {
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  function onSubmit(values: z.infer<typeof signUpSchema>) {
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
                          <Input placeholder="Email" { ...field } />
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
                          <Input placeholder="Password" type="password" { ...field } />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex flex-col gap-4">
                    <Button type="submit" className="mt-4 w-full">
                      {signupText}
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
            <p>{signinText}</p>
            <Link to={signinUrl} className="font-medium text-primary hover:underline">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SignUpPage
