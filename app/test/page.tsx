"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Loader2, Sparkles, CheckCircle2, TrendingUp } from "lucide-react"

export default function TestPage() {
  const [loading, setLoading] = useState(false)
  const [prediction, setPrediction] = useState<any>(null)
  const [features, setFeatures] = useState({
    feature1: "5.1",
    feature2: "3.5",
    feature3: "1.4",
    feature4: "0.2",
  })

  const handlePredict = async () => {
    setLoading(true)
    setPrediction(null)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const response = await fetch("/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          modelId: "customer-churn",
          features: Object.values(features).map(Number),
        }),
      })

      const data = await response.json()
      setPrediction(data)
    } catch (error) {
      console.error("[v0] Prediction error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-4xl space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="font-sans text-4xl font-bold text-balance">Test MLOps Pipeline</h1>
          <p className="font-sans text-lg text-muted-foreground text-pretty">
            Try out the prediction API with sample data
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="font-sans text-sm font-medium">Model Status</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="font-sans text-2xl font-bold">Active</div>
              <p className="font-sans text-xs text-muted-foreground">Random Forest v2.1.0</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="font-sans text-sm font-medium">Accuracy</CardTitle>
              <TrendingUp className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="font-sans text-2xl font-bold">96.4%</div>
              <p className="font-sans text-xs text-muted-foreground">+2.3% from last version</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="font-sans text-sm font-medium">Avg Latency</CardTitle>
              <Sparkles className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="font-sans text-2xl font-bold">45ms</div>
              <p className="font-sans text-xs text-muted-foreground">Sub-100ms target met</p>
            </CardContent>
          </Card>
        </div>

        {/* Prediction Form */}
        <Card>
          <CardHeader>
            <CardTitle className="font-sans">Make a Prediction</CardTitle>
            <CardDescription className="font-sans">
              Enter feature values to get a prediction from the model
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="feature1" className="font-sans">
                  Feature 1
                </Label>
                <Input
                  id="feature1"
                  type="number"
                  step="0.1"
                  value={features.feature1}
                  onChange={(e) => setFeatures({ ...features, feature1: e.target.value })}
                  className="font-mono"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="feature2" className="font-sans">
                  Feature 2
                </Label>
                <Input
                  id="feature2"
                  type="number"
                  step="0.1"
                  value={features.feature2}
                  onChange={(e) => setFeatures({ ...features, feature2: e.target.value })}
                  className="font-mono"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="feature3" className="font-sans">
                  Feature 3
                </Label>
                <Input
                  id="feature3"
                  type="number"
                  step="0.1"
                  value={features.feature3}
                  onChange={(e) => setFeatures({ ...features, feature3: e.target.value })}
                  className="font-mono"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="feature4" className="font-sans">
                  Feature 4
                </Label>
                <Input
                  id="feature4"
                  type="number"
                  step="0.1"
                  value={features.feature4}
                  onChange={(e) => setFeatures({ ...features, feature4: e.target.value })}
                  className="font-mono"
                />
              </div>
            </div>

            <Button onClick={handlePredict} disabled={loading} className="w-full font-sans">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Predicting...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Get Prediction
                </>
              )}
            </Button>

            {/* Prediction Result */}
            {prediction && (
              <div className="rounded-lg border bg-muted/50 p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-sans text-lg font-semibold">Prediction Result</h3>
                  <Badge variant="default" className="font-sans">
                    Success
                  </Badge>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <p className="font-sans text-sm text-muted-foreground">Prediction</p>
                    <p className="font-mono text-2xl font-bold">{prediction.prediction}</p>
                  </div>
                  <div>
                    <p className="font-sans text-sm text-muted-foreground">Confidence</p>
                    <p className="font-mono text-2xl font-bold">{(prediction.confidence * 100).toFixed(1)}%</p>
                  </div>
                  <div>
                    <p className="font-sans text-sm text-muted-foreground">Model Version</p>
                    <p className="font-mono text-sm">{prediction.modelVersion}</p>
                  </div>
                  <div>
                    <p className="font-sans text-sm text-muted-foreground">Timestamp</p>
                    <p className="font-mono text-sm">{new Date(prediction.timestamp).toLocaleTimeString()}</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Sample Data Examples */}
        <Card>
          <CardHeader>
            <CardTitle className="font-sans">Sample Data</CardTitle>
            <CardDescription className="font-sans">Try these pre-configured examples</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button
              variant="outline"
              className="w-full justify-start font-mono text-left bg-transparent"
              onClick={() => setFeatures({ feature1: "5.1", feature2: "3.5", feature3: "1.4", feature4: "0.2" })}
            >
              Example 1: [5.1, 3.5, 1.4, 0.2]
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start font-mono text-left bg-transparent"
              onClick={() => setFeatures({ feature1: "6.7", feature2: "3.0", feature3: "5.2", feature4: "2.3" })}
            >
              Example 2: [6.7, 3.0, 5.2, 2.3]
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start font-mono text-left bg-transparent"
              onClick={() => setFeatures({ feature1: "5.9", feature2: "3.0", feature3: "4.2", feature4: "1.5" })}
            >
              Example 3: [5.9, 3.0, 4.2, 1.5]
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
