"use client"

import Link from "next/link"
import { toast } from "sonner"
import { ArrowDownUp, Coins, Settings } from "lucide-react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const formSchema = z.object({
  tokenTicker1: z
    .string()
    .min(2, {
      message: "Token ticker must be at least 2 characters",
    })
    .max(5, {
      message: "Token ticker must be at most 5 characters",
    }),
  tokenTicker2: z
    .string()
    .min(2, {
      message: "Token ticker must be at least 2 characters",
    })
    .max(5, {
      message: "Token ticker must be at most 5 characters",
    }),

  tokenAmount1: z.coerce.number().min(0.000000000000000001, {
    message: "Token amount must be greater than 0",
  }),
  tokenAmount2: z.coerce.number().min(0.000000000000000001, {
    message: "Token amount must be greater than 0",
  }),
  slippageTolerance: z.coerce.number().min(0.000000000001, {
    message: "Slippage tolerance must be greater than 0",
  }),
})

export default function HomePage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tokenTicker1: "",
      tokenTicker2: "",
      tokenAmount1: 0,
      tokenAmount2: 0,
      slippageTolerance: 0.5,
    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data)
    toast.success("Swap initiated", {
      description: `Swapping ${data.tokenAmount1} ${data.tokenTicker1} for ${data.tokenAmount2} ${data.tokenTicker2}`,
    })
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-purple-900 to-black text-white p-4">
      <div className="container max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-purple-400 mb-2">SwapEx</h1>
          <p className="text-gray-400">Trade tokens with confidence</p>
        </div>

        <Card className="bg-gray-900 border border-purple-800 shadow-lg shadow-purple-900/20">
          <CardHeader className="border-b border-purple-900/50 pb-4">
            <div className="flex justify-between items-center">
              <CardTitle className="text-purple-400 text-xl">Swap Tokens</CardTitle>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-purple-400 hover:text-purple-300 hover:bg-purple-900/50"
                    >
                      <Settings className="h-5 w-5" />
                      <span className="sr-only">Settings</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="left">
                    <p>Swap Settings</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <CardDescription className="text-gray-400">Swap any token pair with low fees</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4">
                  {/* First Token Section */}
                  <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                    <div className="flex justify-between mb-2">
                      <FormLabel className="text-gray-300">You Pay</FormLabel>
                    </div>
                    <div className="flex space-x-3">
                      <div className="w-1/3">
                        <FormField
                          control={form.control}
                          name="tokenTicker1"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  placeholder="ETH"
                                  {...field}
                                  className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-500 focus:border-purple-500"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="w-2/3">
                        <FormField
                          control={form.control}
                          name="tokenAmount1"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  type="number"
                                  placeholder="0.0"
                                  {...field}
                                  className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-500 focus:border-purple-500"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Swap Direction Button */}
                  <div className="flex justify-center -my-2 relative z-10">
                    <Button
                      type="button"
                      size="icon"
                      variant="outline"
                      className="rounded-full h-10 w-10 bg-gray-800 border-purple-700 text-purple-400 hover:bg-purple-900 hover:text-purple-300"
                      onClick={() => {
                        const ticker1 = form.getValues("tokenTicker1")
                        const ticker2 = form.getValues("tokenTicker2")
                        const amount1 = form.getValues("tokenAmount1")
                        const amount2 = form.getValues("tokenAmount2")

                        form.setValue("tokenTicker1", ticker2)
                        form.setValue("tokenTicker2", ticker1)
                        form.setValue("tokenAmount1", amount2)
                        form.setValue("tokenAmount2", amount1)
                      }}
                    >
                      <ArrowDownUp className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Second Token Section */}
                  <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                    <div className="flex justify-between mb-2">
                      <FormLabel className="text-gray-300">You Receive</FormLabel>
                    </div>
                    <div className="flex space-x-3">
                      <div className="w-1/3">
                        <FormField
                          control={form.control}
                          name="tokenTicker2"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  placeholder="USDC"
                                  {...field}
                                  className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-500 focus:border-purple-500"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="w-2/3">
                        <FormField
                          control={form.control}
                          name="tokenAmount2"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  type="number"
                                  placeholder="0.0"
                                  {...field}
                                  className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-500 focus:border-purple-500"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Slippage Tolerance */}
                  <div className="pt-2">
                    <FormField
                      control={form.control}
                      name="slippageTolerance"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex items-center justify-between">
                            <FormLabel className="text-gray-300 text-sm">Slippage Tolerance</FormLabel>
                            <div className="flex items-center space-x-2">
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className="h-6 px-2 text-xs bg-gray-800 border-gray-700 text-gray-300 hover:bg-purple-900 hover:text-purple-300"
                                onClick={() => form.setValue("slippageTolerance", 0.1)}
                              >
                                0.1%
                              </Button>
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className="h-6 px-2 text-xs bg-gray-800 border-gray-700 text-gray-300 hover:bg-purple-900 hover:text-purple-300"
                                onClick={() => form.setValue("slippageTolerance", 0.5)}
                              >
                                0.5%
                              </Button>
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className="h-6 px-2 text-xs bg-gray-800 border-gray-700 text-gray-300 hover:bg-purple-900 hover:text-purple-300"
                                onClick={() => form.setValue("slippageTolerance", 1.0)}
                              >
                                1.0%
                              </Button>
                            </div>
                          </div>
                          <FormControl>
                            <div className="relative">
                              <Input
                                type="number"
                                {...field}
                                className="bg-gray-800 border-gray-700 text-white pr-8 focus:border-purple-500"
                              />
                              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">%</span>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-6">
                  <Coins className="mr-2 h-5 w-5" />
                  Swap Tokens
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="border-t border-purple-900/50 pt-4 text-xs text-gray-500 flex justify-between">
            <span>On the ETH Chain</span>
            <Link href="/" className="text-purple-400 hover:text-purple-300">
              View Transactions
            </Link>
          </CardFooter>
        </Card>
      </div>
    </main>
  )
}
