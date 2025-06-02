"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { TabsContent } from "@radix-ui/react-tabs";

const Analysis = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] w-full flex items-center justify-center overflow-hidden border-b border-accent">
      <Tabs defaultValue="text" className="max-w-6xl w-full">
        {/* Text tab */}
        <TabsContent value="text">
          <Card className="max-w-6xl w-full">
            <CardHeader>
              <CardTitle>Provide an article for analysis</CardTitle>
              <CardDescription>
                Text cannot be longer than 512 words.
              </CardDescription>
              <CardAction className="flex items-center gap-2 mt-4">
                <TabsList>
                  <TabsTrigger value="text">Text</TabsTrigger>
                  <TabsTrigger value="link">Link</TabsTrigger>
                </TabsList>
              </CardAction>
            </CardHeader>
            <Separator />
            <CardContent>
              <div className="flex justify-between h-5 space-x-4 min-h-80">
                <div className="flex justify-center flex-col gap-4 text-sm text-muted-foreground max-w-[200px]">
                  <div>
                    <h3 className="text-base font-semibold text-foreground mb-2">
                      What can you analyze?
                    </h3>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>News articles</li>
                      <li>Blog posts</li>
                      <li>Social media excerpts</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-foreground mb-2">
                      Tips
                    </h3>
                    <p>
                      Make sure the text is original and not overly short. For
                      links, ensure it points to a full article.
                    </p>
                  </div>
                </div>
                <Separator orientation="vertical" />
                <div className="flex flex-1 space-y-2">
                  <Textarea
                    placeholder="Paste your article text here..."
                    maxLength={512 * 6}
                    rows={10}
                    className="w-full p-3 border border-input bg-background rounded-md text-sm resize-none"
                  />
                </div>
              </div>
            </CardContent>
            <Separator />
            <CardFooter>
              <Button className="w-full cursor-pointer" type="submit">
                Submit
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Link tab */}
        <TabsContent value="link">
          <Card className="max-w-6xl w-full">
            <CardHeader>
              <CardTitle>Provide an article for analysis</CardTitle>
              <CardDescription>Paste a valid article link.</CardDescription>
              <CardAction className="flex items-center gap-2 mt-4">
                <TabsList>
                  <TabsTrigger value="text">Text</TabsTrigger>
                  <TabsTrigger value="link">Link</TabsTrigger>
                </TabsList>
              </CardAction>
            </CardHeader>
            <Separator />
            <CardContent>
              <div className="flex justify-between h-5 space-x-4 min-h-80">
                <div className="flex justify-center flex-col gap-4 text-sm text-muted-foreground max-w-[200px]">
                  <div>
                    <h3 className="text-base font-semibold text-foreground mb-2">
                      What can you analyze?
                    </h3>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>News articles</li>
                      <li>Blog posts</li>
                      <li>Social media excerpts</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-foreground mb-2">
                      Tips
                    </h3>
                    <p>
                      Make sure the text is original and not overly short. For
                      links, ensure it points to a full article.
                    </p>
                  </div>
                </div>
                <Separator orientation="vertical" />
                <div className="flex flex-1 space-y-2">
                  <Textarea
                    placeholder="Paste your article text here..."
                    maxLength={512 * 6}
                    rows={10}
                    className="w-full p-3 border border-input bg-background rounded-md text-sm resize-none"
                  />
                </div>
              </div>
            </CardContent>
            <Separator />
            <CardFooter>
              <Button className="w-full cursor-pointer" type="submit">
                Submit
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analysis;
