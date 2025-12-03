import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function GalleryPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Gallery Management
        </h1>
        <p className="text-muted-foreground">
          Manage portfolio images and nail art gallery
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Gallery Images</CardTitle>
          <CardDescription>
            Upload and organize your nail art portfolio
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex min-h-[400px] items-center justify-center rounded-md border border-dashed">
            <p className="text-sm text-muted-foreground">
              Gallery CRUD functionality coming soon...
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
