import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function ContactsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Contacts Management
        </h1>
        <p className="text-muted-foreground">
          View and respond to customer inquiries
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Customer Inquiries</CardTitle>
          <CardDescription>
            Manage contact requests and add admin notes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex min-h-[400px] items-center justify-center rounded-md border border-dashed">
            <p className="text-sm text-muted-foreground">
              Contacts management functionality coming soon...
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
