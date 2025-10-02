"use client"

import type React from "react"

import { DashboardHeader } from "@/components/dashboard-header"
import { ModelRegistry } from "@/components/model-registry"
import { ModelVersions } from "@/components/model-versions"
import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

export default function ModelsPage() {
  const [open, setOpen] = useState(false)
  const [uploading, setUploading] = useState(false)
  const { toast } = useToast()

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setUploading(true)

    const formData = new FormData(e.currentTarget)
    const modelData = {
      name: formData.get("name"),
      type: formData.get("type"),
      version: formData.get("version"),
      description: formData.get("description"),
    }

    try {
      const response = await fetch("/api/models", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(modelData),
      })

      const result = await response.json()

      if (result.success) {
        toast({
          title: "Model Registered!",
          description: `${modelData.name} has been added to the registry.`,
        })
        setOpen(false)
        // Refresh the page to show new model
        window.location.reload()
      } else {
        throw new Error(result.error)
      }
    } catch (error) {
      toast({
        title: "Upload Failed",
        description: error instanceof Error ? error.message : "Failed to register model",
        variant: "destructive",
      })
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Model Registry</h1>
            <p className="text-muted-foreground text-lg">Manage and version your trained models</p>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>
                <Upload className="h-4 w-4 mr-2" />
                Upload Model
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Register New Model</DialogTitle>
                <DialogDescription>
                  Add a new model to the registry. For best results, use the training scripts to automatically register
                  models.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleUpload} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Model Name</Label>
                  <Input id="name" name="name" placeholder="customer-churn-predictor" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">Model Type</Label>
                  <Select name="type" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select model type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Random Forest">Random Forest</SelectItem>
                      <SelectItem value="XGBoost">XGBoost</SelectItem>
                      <SelectItem value="LightGBM">LightGBM</SelectItem>
                      <SelectItem value="Gradient Boosting">Gradient Boosting</SelectItem>
                      <SelectItem value="Neural Network">Neural Network</SelectItem>
                      <SelectItem value="BERT">BERT</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="version">Version</Label>
                  <Input id="version" name="version" placeholder="v1.0.0" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Input id="description" name="description" placeholder="Model description..." />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button type="button" variant="outline" onClick={() => setOpen(false)} className="flex-1">
                    Cancel
                  </Button>
                  <Button type="submit" disabled={uploading} className="flex-1">
                    {uploading ? "Registering..." : "Register Model"}
                  </Button>
                </div>
              </form>

              <div className="mt-4 p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong>💡 Pro Tip:</strong> Use{" "}
                  <code className="text-xs bg-background px-1 py-0.5 rounded">python scripts/train_model.py</code> to
                  train and automatically register models with full metrics tracking!
                </p>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ModelRegistry />
          </div>
          <div>
            <ModelVersions />
          </div>
        </div>
      </main>
    </div>
  )
}
