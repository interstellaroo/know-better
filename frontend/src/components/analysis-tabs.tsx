"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Separator } from "./ui/separator";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

const AnalysisTabs = () => {
  const [textInput, setTextInput] = useState("");
  const [activeTab, setActiveTab] = useState("text");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function submitTextAnalysis(text: string) {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/analytics/text`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text }),
        }
      );

      const data = await res.json();
      if (data.id) {
        router.push(`/results/${data.id}`);
      }
    } catch (err) {
      console.error("Text analysis failed:", err);
    } finally {
      setLoading(false);
    }
  }

  async function submitUrlAnalysis(url: string) {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/analytics/url`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url }),
        }
      );

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Server error: ${res.status} - ${text}`);
      }

      const data = await res.json();
      console.log(data);
      if (data.id) {
        router.push(`/results/${data.id}`);
      }
    } catch (err) {
      console.error("URL analysis failed:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Tabs
      value={activeTab}
      onValueChange={(val) => !loading && setActiveTab(val)}
      className="max-w-6xl w-full"
    >
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
                <TabsTrigger value="text" disabled={loading}>
                  Text
                </TabsTrigger>
                <TabsTrigger value="link" disabled={loading}>
                  Link
                </TabsTrigger>
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
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
          <Separator />
          <CardFooter>
            <Button
              className="w-full cursor-pointer"
              onClick={() => submitTextAnalysis(textInput)}
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="animate-spin w-4 h-4" />
              ) : (
                "Submit"
              )}
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>

      {/* Link tab ------------------------------------------------------------------------------------*/}
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
                  placeholder="Paste your URL here..."
                  maxLength={512 * 6}
                  rows={10}
                  className="w-full p-3 border border-input bg-background rounded-md text-sm resize-none"
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
          <Separator />
          <CardFooter>
            <Button
              className="w-full"
              onClick={() => submitUrlAnalysis(textInput)}
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="animate-spin w-4 h-4" />
              ) : (
                "Submit"
              )}
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default AnalysisTabs;
