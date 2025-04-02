"use client"

import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { CardContent, CardFooter } from "./ui/card"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { useTransition } from "react"
import { Button } from "./ui/button"
import { Loader2 } from "lucide-react"
import Link from "next/link"
type props = {
    type: "login" | "signUp"
}
function AuthForm({ type }: props) {
    const isLogin = type === "login"
    const router = useRouter()

    const handleSubmit = (formData: FormData) => {
        console.log("submited")
    }

    const [isPending, startTransition] = useTransition()

    return (
        <form action={handleSubmit}>
            <CardContent className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        name="email"
                        placeholder="enter your email"
                        type="email"
                        required
                        disabled={isPending}
                    />
                </div>

                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="password">Password</Label>
                    <Input
                        id="password"
                        name="password"
                        placeholder="Enter your Password "
                        type="password"
                        required
                        disabled={isPending}
                    />
                </div>
            </CardContent>
            <CardFooter className="mt-4 flex flex-col gap-6">
                <Button className="w-full">
                    {isPending ? <Loader2 className="animate-spn" /> : isLogin ? "Login" : "Sign-Up"}
                </Button>

                <p className="text-xs">
                    {isLogin ? "Dont have an account yet" : "Already have an account ? "}{"  "}
                    <Link 
                    className={`text-blue-500 underline ${isPending ? "pointer-events-none opacity-50":""}`}
                    href={isLogin ? "/sign-up" : "/login"}>
                    {isLogin ? "sign-up" : "login"}
                    </Link>
                </p>
            </CardFooter>
        </form>
    )
}

export default AuthForm