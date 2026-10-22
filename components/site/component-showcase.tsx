import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Parallax, Stagger, StaggerItem } from '@/components/site/motion'
import { PlaceholderImage } from '@/components/site/placeholder-image'
import { SampleBadge } from '@/components/site/sample-badge'
import { site } from '@/src/content/site'

export function ComponentShowcase({ id, tone }: { id: string; tone: string }) {
  const [apartment] = site.apartments
  return (
    <div className="flex flex-col gap-12">
      <header className="flex flex-col gap-2">
        <p className="text-sm font-semibold uppercase tracking-widest text-accent-strong">{tone}</p>
        <h2 id={id} className="text-3xl md:text-4xl">
          Component kit
        </h2>
        <p className="max-w-prose text-muted-foreground">Every themed component on this surface.</p>
      </header>

      <Block title="Typography">
        <div className="flex flex-col gap-2">
          <p className="font-heading text-5xl">Heading XL</p>
          <p className="font-heading text-3xl">Heading L</p>
          <p className="text-lg">Body large — Inter</p>
          <p className="text-muted-foreground">Muted body text</p>
        </div>
      </Block>

      <Block title="Buttons">
        <div className="flex flex-wrap gap-3">
          <Button size="lg">Request a booking</Button>
          <Button variant="outline" size="lg">
            View apartments
          </Button>
          <Button variant="ghost" size="lg">
            Ghost action
          </Button>
          <Button size="lg" disabled>
            Disabled
          </Button>
        </div>
      </Block>

      <Block title="Badges">
        <div className="flex flex-wrap items-center gap-3">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="accent">In writing</Badge>
          <SampleBadge />
        </div>
      </Block>

      <Block title="Cards (stagger)">
        <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Object.values(site.trust).map((pillar) => (
            <StaggerItem key={pillar.fear}>
              <Card className="h-full">
                <CardHeader>
                  <CardDescription>{pillar.fear}</CardDescription>
                  <CardTitle className="font-heading text-xl">{pillar.title.value}</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">{pillar.body.value}</CardContent>
                <CardFooter>
                  <SampleBadge show={pillar.body.demo} />
                </CardFooter>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </Block>

      <Block title="Form fields">
        <form className="grid max-w-xl gap-4" aria-label={`${tone} sample form`}>
          <div className="grid gap-2">
            <Label htmlFor={`${id}-name`}>Full name</Label>
            <Input id={`${id}-name`} placeholder="Your name" autoComplete="name" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor={`${id}-apt`}>Apartment</Label>
            <Select>
              <SelectTrigger id={`${id}-apt`} className="w-full">
                <SelectValue placeholder="Choose an apartment" />
              </SelectTrigger>
              <SelectContent>
                {site.apartments.map((a) => (
                  <SelectItem key={a.slug} value={a.slug}>
                    {a.name.value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor={`${id}-msg`}>Message</Label>
            <Textarea id={`${id}-msg`} placeholder="Dates, guests, questions..." />
          </div>
        </form>
      </Block>

      <Block title="Accordion">
        <Accordion className="max-w-xl">
          <AccordionItem value="refund">
            <AccordionTrigger>When is my caution deposit refunded?</AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground">
                {site.refund.rule.value} <SampleBadge show={site.refund.rule.demo} />
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="power">
            <AccordionTrigger>What backup power is available?</AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground">
                {site.power.backup.value} <SampleBadge show={site.power.backup.demo} />
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Block>

      <Block title="Dialog">
        <Dialog>
          <DialogTrigger render={<Button variant="outline" size="lg" />}>Open dialog</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="font-heading text-2xl">Payment safety</DialogTitle>
              <DialogDescription>
                Pay only to the account name on our Fees page: {site.payment.accountName.value}{' '}
                <SampleBadge show={site.payment.accountName.demo} />
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose render={<Button size="lg" />}>Got it</DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Block>

      <Block title="Placeholder image (parallax)">
        <div className="max-w-xl overflow-hidden rounded-3xl">
          <Parallax range={16}>
            <PlaceholderImage image={apartment.image} />
          </Parallax>
        </div>
      </Block>
    </div>
  )
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="font-sans text-sm font-semibold uppercase tracking-widest text-muted-foreground">{title}</h3>
      {children}
    </div>
  )
}
