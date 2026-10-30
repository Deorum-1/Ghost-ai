import { Button, Card, Dialog, DialogContent, DialogTrigger, Input, ScrollArea, Tabs, TabsContent, TabsList, TabsTrigger, Textarea } from "@/components/ui"
import { cn } from "@/lib/utils"
import React from "react"

export default function Home() {
  // Force dark mode for verification
  React.useEffect(() => {
    document.documentElement.classList.add('dark');
    console.log('Dark theme forced for verification');
  }, []);

  return (
  // Force dark theme for verification
  React.useEffect(() => {
    document.documentElement.classList.add('dark');
    console.log('Dark theme forced for verification');
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-6">
        <Card className="p-6">
          <h1 className="text-2xl font-bold text-copy-primary">Ghost AI Design System</h1>
          <p className="text-copy-secondary">Basic components working with dark theme</p>
        </Card>

        <div className="space-y-4">
          <Button>Primary Button</Button>
          <Button variant="outline">Outline Button</Button>
          <Button variant="secondary">Secondary Button</Button>
        </div>

        <div className="space-y-4">
          <Input placeholder="Type something..." />
          <Textarea placeholder="Type a longer message..." rows={4} />
        </div>

        <div className="space-y-4">
          <Tabs defaultValue="design" className="w-full">
            <TabsList>
              <TabsTrigger value="design">Design</TabsTrigger>
              <TabsTrigger value="code">Code</TabsTrigger>
            </TabsList>
            <TabsContent value="design">
              <ScrollArea className="h-40 rounded-xl border">
                <div className="p-4">
                  <p className="text-copy-secondary">Design content goes here</p>
                </div>
              </ScrollArea>
            </TabsContent>
            <TabsContent value="code">
              <ScrollArea className="h-40 rounded-xl border">
                <div className="p-4">
                  <p className="text-copy-secondary">Code content goes here</p>
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button>Open Dialog</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <h2 className="text-lg font-semibold">Dialog Title</h2>
              <p className="text-sm text-copy-secondary">Dialog description</p>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-3 items-center gap-4">
                <Label className="text-right pr-4">Username</Label>
                <Input className="col-span-2" placeholder="john.doe" />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label className="text-right pr-4">Password</Label>
                <Input className="col-span-2" placeholder="••••••••" type="password" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Sign In</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}