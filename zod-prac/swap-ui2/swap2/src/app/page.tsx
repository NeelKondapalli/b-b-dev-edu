import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-black to-gray-900 text-white">
      <div className = "container flex flex-col items-center mx-auto max-w-md">
        <div className = "flex flex-col items-center mb-6">
          <div className = "text-3xl text-amber-700">
            SwapEXP
          </div>
          <div className = "text-sm text-gray-500 mt-1">
            Trade with confidence
          </div>
        </div>
        <Card className = "w-full bg-gray-900">
          <CardHeader>
              <CardTitle className = "flex justify-between">
                <div className = "text-amber-700">
                  Card Title
                </div>
                <div>
                  Set
                </div>
              </CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>

      </div>
    </main>
  );
}
