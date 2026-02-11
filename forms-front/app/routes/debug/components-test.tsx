import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { ThemeSwitcher } from "@/components/ui/theme-switcher"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useTranslation } from "react-i18next"

function createFormSchema() {
  const { t } = useTranslation("validation");

  return z.object({
    username: z.string().min(2, {
      message: t("minLength", { count: 2 }),
    }),
    email: z.string().email({
      message: t("email"),
    }),
    message: z.string().min(10, {
      message: t("minLength", { count: 10 }),
    }),
    agree: z.boolean().refine(val => val === true, {
      message: t("required"),
    }),
    priority: z.enum(["low", "medium", "high"]),
  });
}

export default function ComponentsTest() {
  const { t } = useTranslation("common");
  const formSchema = createFormSchema();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      message: "",
      agree: false,
      priority: undefined,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">UI Components Test</h1>
            <p className="text-muted-foreground">Testing all shadcn/ui components with IFV blue theme</p>
          </div>
          <ThemeSwitcher />
        </div>

        {/* Buttons */}
        <Card>
          <CardHeader>
            <CardTitle>Buttons</CardTitle>
            <CardDescription>Different button variants and sizes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <Button>Default</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
              <Button size="icon">🔍</Button>
            </div>
          </CardContent>
        </Card>

        {/* Badges */}
        <Card>
          <CardHeader>
            <CardTitle>Badges</CardTitle>
            <CardDescription>Status indicators and tags</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="destructive">Destructive</Badge>
              <Badge variant="outline">Outline</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Radio Groups */}
        <Card>
          <CardHeader>
            <CardTitle>Radio Groups</CardTitle>
            <CardDescription>Exclusive selection components with different layouts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h4 className="text-sm font-medium mb-3">Basic Radio Group</h4>
              <RadioGroup defaultValue="comfortable" className="flex flex-col space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="default" id="r1" />
                  <Label htmlFor="r1">Default</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="comfortable" id="r2" />
                  <Label htmlFor="r2">Comfortable</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="compact" id="r3" />
                  <Label htmlFor="r3">Compact</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-3">Horizontal Layout</h4>
              <RadioGroup defaultValue="option2" className="flex space-x-6">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option1" id="h1" />
                  <Label htmlFor="h1">Option 1</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option2" id="h2" />
                  <Label htmlFor="h2">Option 2</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option3" id="h3" />
                  <Label htmlFor="h3">Option 3</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-3">Disabled States</h4>
              <RadioGroup defaultValue="enabled" className="flex flex-col space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="enabled" id="d1" />
                  <Label htmlFor="d1">Enabled Option</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="disabled" id="d2" disabled />
                  <Label htmlFor="d2" className="text-muted-foreground">Disabled Option</Label>
                </div>
              </RadioGroup>
            </div>
          </CardContent>
        </Card>

        {/* Form */}
        <Card>
          <CardHeader>
            <CardTitle>Form Components</CardTitle>
            <CardDescription>Input fields, textarea, and validation</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your username" {...field} />
                      </FormControl>
                      <FormDescription>This is your public display name.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="Enter your email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Enter your message" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="agree"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Agree to terms and conditions</FormLabel>
                        <FormDescription>You must agree to continue.</FormDescription>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="priority"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Priority Level</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="low" id="low" />
                            <Label htmlFor="low">Low Priority</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="medium" id="medium" />
                            <Label htmlFor="medium">Medium Priority</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="high" id="high" />
                            <Label htmlFor="high">High Priority</Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormDescription>Select the priority level for your request.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Submit</Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Color Palette Test */}
        <Card>
          <CardHeader>
            <CardTitle>IFV Color Palette</CardTitle>
            <CardDescription>Primary: #1a6e7c, Secondary: #5da5b3, Accent: #a0d9e5</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div className="h-20 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-semibold">#1a6e7c</div>
              <div className="h-20 bg-secondary rounded-lg flex items-center justify-center text-secondary-foreground font-semibold">#5da5b3</div>
              <div className="h-20 bg-accent rounded-lg flex items-center justify-center text-accent-foreground font-semibold">#a0d9e5</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}