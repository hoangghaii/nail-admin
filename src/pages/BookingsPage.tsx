import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function BookingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Bookings Management
        </h1>
        <p className="text-muted-foreground">
          View and manage customer bookings
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Bookings</CardTitle>
          <CardDescription>
            Update booking status and view customer details
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex min-h-[400px] items-center justify-center rounded-md border border-dashed">
            <p className="text-sm text-muted-foreground">
              Bookings management functionality coming soon...
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
