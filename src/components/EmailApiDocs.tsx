import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

const CodeBlock = ({ children }: { children: React.ReactNode }) => (
  <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm font-mono my-2">
    <code>{children}</code>
  </pre>
);

export default function EmailApiDocs() {
  const exampleJsonRequest = `{
  "from": "sender@example.com",
  "to": "recipient@example.com",
  "subject": "Hello from EmailJet!",
  "body": "<h1>Email Title</h1><p>This is the HTML body of the email.</p>"
}`;

  const exampleCurlRequest = `curl -X POST https://yourdomain.com/api/sendemail \\
-H "Content-Type: application/json" \\
-d '${exampleJsonRequest}'`;

  const successResponse = `{
  "message": "Email sent successfully"
}`;

  const errorResponse400 = `{
  "message": "Missing required fields: from, to, subject, body"
}`;

  const errorResponse503 = `{
  "message": "Email service is not configured on the server."
}`;


  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="text-3xl text-primary">API Documentation</CardTitle>
        <CardDescription>
          How to use the EmailJet API to send emails.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-2">Endpoint</h2>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary">POST</Badge>
            <code className="text-sm bg-muted px-2 py-1 rounded-md">/api/sendemail</code>
          </div>
        </section>

        <Separator />

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-2">Request Body</h2>
          <p className="text-sm text-muted-foreground mb-1">
            Content-Type: <code className="bg-muted px-1.5 py-0.5 rounded-sm">application/json</code>
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm text-foreground mb-2 pl-4">
            <li><code className="font-semibold">from</code> (string, required): The sender's email address.</li>
            <li><code className="font-semibold">to</code> (string, required): The recipient's email address.</li>
            <li><code className="font-semibold">subject</code> (string, required): The subject line of the email.</li>
            <li><code className="font-semibold">body</code> (string, required): The HTML content of the email.</li>
          </ul>
          <h3 className="text-md font-medium text-foreground mt-3 mb-1">Example JSON:</h3>
          <CodeBlock>{exampleJsonRequest}</CodeBlock>
        </section>

        <Separator />

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-2">Example Usage (cURL)</h2>
          <CodeBlock>{exampleCurlRequest}</CodeBlock>
          <p className="text-xs text-muted-foreground">
            Replace <code className="bg-muted px-1 py-0.5 rounded-sm">https://yourdomain.com</code> with your actual application URL.
          </p>
        </section>

        <Separator />

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-2">Responses</h2>
          <h3 className="text-md font-medium text-foreground mt-3 mb-1">Success (200 OK):</h3>
          <CodeBlock>{successResponse}</CodeBlock>

          <h3 className="text-md font-medium text-foreground mt-3 mb-1">Error - Bad Request (400):</h3>
          <CodeBlock>{errorResponse400}</CodeBlock>
          
          <h3 className="text-md font-medium text-foreground mt-3 mb-1">Error - Service Unavailable (503):</h3>
           <CodeBlock>{errorResponse503}</CodeBlock>

          <h3 className="text-md font-medium text-foreground mt-3 mb-1">Error - Internal Server Error (500):</h3>
          <CodeBlock>{`{
  "message": "Failed to send email.",
  "error": "An unexpected error occurred." // or more details in development
}`}</CodeBlock>
        </section>

        <Separator />
        
        <Alert>
          <Terminal className="h-4 w-4" />
          <AlertTitle className="font-semibold">Important Configuration Note!</AlertTitle>
          <AlertDescription>
            Ensure your SMTP server details (<code>EMAIL_HOST</code>, <code>EMAIL_PORT</code>, <code>EMAIL_USER</code>, <code>EMAIL_PASS</code>) are correctly set up in your environment variables. Refer to the <code>.env.example</code> file for guidance. Without these, the email service will not function.
          </AlertDescription>
        </Alert>

      </CardContent>
    </Card>
  );
}
